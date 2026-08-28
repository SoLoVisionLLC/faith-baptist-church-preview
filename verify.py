#!/usr/bin/env python3
"""Verify the complete local static preview build without network access."""

from __future__ import annotations

import hashlib
import itertools
import json
import re
import struct
import subprocess
import sys
from html import unescape
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "variants"
VARIANTS = ("a", "b", "c", "d", "e")
ACCEPTED_BASE = "ee3623e41b6647b7380c987421f4a2ecb2057749"
C_ISOLATION_BASE = "4788760d42fddf11e47ea26510b142848e71a959"
CURRENT_MAIN_BASE = "0c90f9f7199542aa1668b98b406cb69c51f9ffd6"
B_SOURCE_COMMIT = "8bf4043e0a36d0ac5feda0fb1c1a17d3326ea97b"
RECEIPT_PATH = ROOT / "variant-a-receipt.json"
C_RECEIPT_PATH = ROOT / "qa" / "variant-c" / "verification-receipt.json"
E_RECEIPT_PATH = ROOT / "variant-e-receipt.json"
E_FONT_FILE = "LiberationSansNarrow-Bold.ttf"
E_FONT_LICENSE = "LiberationSansNarrow-LICENSE.txt"
E_FONT_SHA256 = "4cd16b98cea43a9ce4471df068634fce71ab279dfc9b303b6b188bd96b35226a"
E_BODY_FONT_FILE = "SourceSans3-Latin.woff2"
E_BODY_FONT_LICENSE = "SourceSans3-OFL.txt"
E_BODY_FONT_PROVENANCE = "SourceSans3-PROVENANCE.md"
E_BODY_FONT_SHA256 = "59fbf777295755670788ca809b72d082721afbbdfcac37c5c987c1a7e0c74f4d"
E_BODY_FONT_LICENSE_SHA256 = "7fac2f6c6bc47144e2c35e8f41147b3c8c895490d44b46266a5312fe93364d2e"
ROUTES = {
    "/": Path("index.html"),
    "/visit/": Path("visit/index.html"),
    "/beliefs/": Path("beliefs/index.html"),
    "/ministries/": Path("ministries/index.html"),
    "/events/": Path("events/index.html"),
    "/contact/": Path("contact/index.html"),
}

NAME = "Faith Baptist Church"
ADDRESS = "11275 W. Township Rd. 116, Fostoria, OH 44830"
B_ADDRESS = "11275 W. Twp. Rd. 116, Fostoria, OH 44830"
D_ADDRESS = B_ADDRESS
PHONE_DISPLAY = "(419) 348-2171"
PHONE_TEL = "+14193482171"
A_ADDRESS = "11275 W. Twp. Rd. 116, Fostoria, OH 44830"
A_PHONE_DISPLAY = "419-348-2171"
A_MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=11275+W.+Twp.+Rd.+116%2C+Fostoria%2C+OH+44830"
A_IDENTITY = "Bible believing. Gospel driven. Growing together in God's Word."
A_SERVICE_TIMES_PATHWAY_COPY = (
    "Sunday School for adults and teens begins at 9:00 AM. The main service and young "
    "children's Sunday School begin at 10:00 AM. Sunday evening service begins at 6:00 PM. "
    "Wednesday prayer and Bible study begins at 7:00 PM."
)
A_CHILDREN_NURSERY_PATHWAY_COPY = (
    "Young children's Sunday School begins at 10:00 AM. A nursery for tots is available "
    "during Sunday programming."
)
SUPERSEDED_CHURCH_WORD = "Cha" + "pel"
SUPERSEDED_STREET_NAME = "Syca" + "more"
FORBIDDEN_TEXT = (
    f"Faith {SUPERSEDED_CHURCH_WORD}",
    f"220 {SUPERSEDED_STREET_NAME}",
)
ASSETS = ("front.png", "church1.jpg", "church2.jpg", "church3.jpg")
B_ALTS = (
    "Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.",
    "Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.",
    "Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.",
    "Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.",
)
D_ALT_TEXT = B_ALTS
D_PUBLIC_COPY_BANNED = (
    "preview",
    "concept",
    "mockup",
    "demo",
    "sample",
    "placeholder",
    "revision",
    "redesign",
    "template",
    "source-backed",
    "design direction",
    "design system",
    "pilot",
    "skill",
    "regime",
    "solovision",
    "faith chapel",
    "dillon road",
    "grace",
    "qwery",
    "ancorthemes",
    "yoga",
    "islamic",
    "agency",
    "donation",
    "fake counter",
    "fake event",
    "stock-testimonial",
)
D_SCHEDULE_FACTS = (
    ("Sunday", "Sunday School — adults and teens", "9:00 AM"),
    ("Sunday", "Main Service", "10:00 AM"),
    ("Sunday", "Young Children’s Sunday School", "10:00 AM"),
    ("Sunday", "Nursery for tots", "During Sunday programming"),
    ("Sunday", "Sunday Evening Service", "6:00 PM"),
    ("Wednesday", "Prayer & Bible Study", "7:00 PM"),
)

A_MEDIA = [
    {
        "file": "front.png",
        "source_url": "https://appwrite.sololink.cloud/v1/storage/buckets/posts/files/f_03bb9f01ae214a5fab9b14226879ee59/view?project=solosocialstudio",
        "bundled_path": "variants/a/assets/front.png",
        "original_dimensions": {"width": 277, "height": 600},
        "placements": ["/visit/ exterior portrait"],
        "alt": "Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.",
        "sha256": "7b0bce3499ed9df95327af8a9693b70a2876a36be53810d91edf4685ffaa0f3f",
    },
    {
        "file": "church1.jpg",
        "source_url": "https://appwrite.sololink.cloud/v1/storage/buckets/posts/files/f_a1df2d0ef4c3455cb97d6c24734c16bf/view?project=solosocialstudio",
        "bundled_path": "variants/a/assets/church1.jpg",
        "original_dimensions": {"width": 600, "height": 450},
        "placements": ["/ exterior landscape hero", "/contact/ exterior reference"],
        "alt": "Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.",
        "sha256": "9abdb0fd06c69aa12ef11f4954afb50131ad133c5a3314a675c1a136577977f6",
    },
    {
        "file": "church2.jpg",
        "source_url": "https://appwrite.sololink.cloud/v1/storage/buckets/posts/files/f_01e265a73d32472384612eda393c8ebb/view?project=solosocialstudio",
        "bundled_path": "variants/a/assets/church2.jpg",
        "original_dimensions": {"width": 450, "height": 600},
        "placements": ["/ confirmed beliefs", "/beliefs/ sanctuary close"],
        "alt": "Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.",
        "sha256": "6725c18ecea252cd3ad842fae16844a0c1ff1a8f2a4a2a011853bc0a8b68bb92",
    },
    {
        "file": "church3.jpg",
        "source_url": "https://appwrite.sololink.cloud/v1/storage/buckets/posts/files/f_a357ae8b004b4d0f816a9037f18bffae/view?project=solosocialstudio",
        "bundled_path": "variants/a/assets/church3.jpg",
        "original_dimensions": {"width": 450, "height": 600},
        "placements": ["/ full-width sanctuary", "/ministries/ full-width sanctuary"],
        "alt": "Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.",
        "sha256": "75c7128197dd074613eec92fe233e04dff3539c5394f56696b4196a969969b3c",
    },
]
A_MEDIA_BY_FILE = {item["file"]: item for item in A_MEDIA}
A_EXPECTED_IMAGES = {
    "/": ("church1.jpg", "church2.jpg", "church3.jpg"),
    "/visit/": ("front.png",),
    "/beliefs/": ("church2.jpg",),
    "/ministries/": ("church3.jpg",),
    "/events/": (),
    "/contact/": ("church1.jpg",),
}
A_REQUIRED_MAIN_TEXT = {
    "/": (
        A_IDENTITY,
        "Sunday School 9:00 AM Adults and teens",
        "Main service 10:00 AM",
        "Young children's Sunday School 10:00 AM",
        "Sunday evening service 6:00 PM",
        "Prayer and Bible study 7:00 PM",
        A_ADDRESS,
        A_PHONE_DISPLAY,
        "Service Times",
        A_SERVICE_TIMES_PATHWAY_COPY,
        "Children and Nursery",
        A_CHILDREN_NURSERY_PATHWAY_COPY,
        "Directions",
    ),
    "/visit/": (
        "Plan Your Visit",
        "Sunday School 9:00 AM Adults and teens",
        "Main service 10:00 AM",
        "Young children's Sunday School 10:00 AM",
        "Sunday evening service 6:00 PM",
        "Prayer and Bible study 7:00 PM",
        A_ADDRESS,
        "nursery for tots is available during Sunday programming",
        "Call the Church",
    ),
    "/beliefs/": ("Bible believing.", "Gospel driven.", "KJV Bible."),
    "/ministries/": (
        "Adults and teens Sunday School Sunday at 9:00 AM.",
        "Sunday main service Sunday at 10:00 AM.",
        "Young children's Sunday School Sunday at 10:00 AM.",
        "Nursery for tots During Sunday programming.",
        "Sunday evening service Sunday at 6:00 PM.",
        "Prayer and Bible study Wednesday at 7:00 PM.",
    ),
    "/events/": (
        "Sunday School 9:00 AM Adults and teens",
        "Main service 10:00 AM",
        "Young children's Sunday School 10:00 AM",
        "Sunday evening service 6:00 PM",
        "Prayer and Bible study 7:00 PM",
        "Current announcements will appear here when supplied.",
    ),
    "/contact/": ("Call the Church: 419-348-2171", A_ADDRESS, "Get Directions"),
}
A_PUBLIC_FORBIDDEN = (
    "rooted in the word",
    "centered on the gospel",
    "sunday starts here",
    "the open door",
    "variant",
    "quill",
    "design brief",
    "build process",
    "workflow",
    "template",
    "placeholder",
    "pastor",
    "staff",
    "history",
    "testimonial",
    "email",
    "giving",
    "livestream",
    "live stream",
    "parking",
    "accessibility",
    "accessible",
    "dress",
    "music",
    "doctrine",
    "special event",
    "upcoming event",
)

C_MEDIA_PLACEMENTS = {
    "front.png": ["/ Real Place gallery", "/visit/ tall organic anchor"],
    "church1.jpg": ["/ hero organic mask", "/contact/ exterior photo"],
    "church2.jpg": ["/ Real Place gallery", "/beliefs/ centered soft mask"],
    "church3.jpg": ["/ Real Place gallery", "/ministries/ gathering photo"],
}
C_MEDIA = [
    {
        **item,
        "bundled_path": f"variants/c/assets/{item['file']}",
        "placements": C_MEDIA_PLACEMENTS[item["file"]],
    }
    for item in A_MEDIA
]
C_MEDIA_BY_FILE = {item["file"]: item for item in C_MEDIA}
C_EXPECTED_IMAGES = {
    "/": ("church1.jpg", "front.png", "church2.jpg", "church3.jpg"),
    "/visit/": ("front.png",),
    "/beliefs/": ("church2.jpg",),
    "/ministries/": ("church3.jpg",),
    "/events/": (),
    "/contact/": ("church1.jpg",),
}
C_REQUIRED_MAIN_TEXT = {
    "/": (
        "Faith Baptist Church",
        A_IDENTITY,
        "Sunday 9:00 AM Sunday School for adults and teens.",
        "Sunday 10:00 AM Main service. Young children's Sunday School begins at 10:00 AM. A nursery for tots is available during Sunday programming.",
        "Sunday 6:00 PM Sunday evening service.",
        "Wednesday 7:00 PM Prayer and Bible study.",
        "Adults and Teens Sunday School at 9:00 AM.",
        "Young Children Sunday School at 10:00 AM.",
        "Nursery Available for tots during Sunday programming.",
        "Bible believing.",
        "Gospel driven.",
        "We teach from the KJV Bible.",
        A_ADDRESS,
        A_PHONE_DISPLAY,
    ),
    "/visit/": (
        "Plan Your Visit",
        "Find the complete weekly schedule, location, children and nursery information, and church phone below.",
        "Sunday School 9:00 AM Adults and teens.",
        "Main service 10:00 AM",
        "Young children's Sunday School 10:00 AM",
        "Sunday evening service 6:00 PM",
        "Prayer and Bible study Wednesday at 7:00 PM.",
        "A nursery for tots is available during Sunday programming.",
        A_ADDRESS,
        "Call the Church",
    ),
    "/beliefs/": (
        "What We Believe",
        "These are the confirmed convictions of Faith Baptist Church.",
        "Bible believing.",
        "Gospel driven.",
        "We teach from the KJV Bible.",
    ),
    "/ministries/": (
        "Ministries",
        "These recurring gatherings are available each week at Faith Baptist Church.",
        "Adults and teens Sunday School Sunday at 9:00 AM.",
        "Main service Sunday at 10:00 AM.",
        "Young children's Sunday School Sunday at 10:00 AM.",
        "Nursery for tots Available during Sunday programming.",
        "Sunday evening service Sunday at 6:00 PM.",
        "Prayer and Bible study Wednesday at 7:00 PM.",
    ),
    "/events/": (
        "Events & Announcements",
        "The recurring weekly schedule is listed below.",
        "Current announcements will appear here when supplied.",
        "Sunday School 9:00 AM Adults and teens.",
        "Main service 10:00 AM",
        "Young children's Sunday School 10:00 AM",
        "Sunday evening service 6:00 PM",
        "Prayer and Bible study Wednesday at 7:00 PM.",
    ),
    "/contact/": (
        "Contact Faith Baptist Church",
        "Call the church or open directions to the exact address.",
        "Call the Church",
        A_ADDRESS,
        "Get Directions",
    ),
}
C_PUBLIC_FORBIDDEN = (
    "rooted in the word",
    "centered on the gospel",
    "one visit and you will know you are home",
    "the whole family is cared for",
    "christ crucified",
    "no one grows alone",
    "lord's day",
    "announcements are made in each service",
    "bloom",
    "design inspired by nature",
    "naturally beautiful",
    "nature's inspiration",
    "ready to go organic",
    "fluid shapes",
    "earthy palette",
    "gentle motion",
    "soft edges",
    "nature types",
    "handcrafted",
    "11275 w. township rd. 116",
    "(419) 348-2171",
)
C_FONT_FILES = (
    "Fraunces-Latin.woff2",
    "Karla-Latin.woff2",
    "Fraunces-OFL.txt",
    "Karla-OFL.txt",
    "Fraunces-Karla-PROVENANCE.md",
)


class DocumentParser(HTMLParser):
    """Collect local references, structure, and visible copy for verification."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.references: list[tuple[str, str]] = []
        self.robots: list[str] = []
        self.tag_counts: Counter[str] = Counter()
        self.class_counts: Counter[str] = Counter()
        self.element_attrs: dict[str, list[dict[str, str | None]]] = defaultdict(list)
        self.anchors: list[dict[str, str | None]] = []
        self.images: list[dict[str, str | None]] = []
        self.title_parts: list[str] = []
        self.main_text_parts: list[str] = []
        self.html_lang = ""
        self._main_depth = 0
        self._title_depth = 0
        self._nav_classes: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = dict(attrs)
        self.tag_counts[tag] += 1
        self.element_attrs[tag].append(attributes)

        classes = (attributes.get("class") or "").split()
        self.class_counts.update(classes)
        element_id = attributes.get("id")
        if element_id:
            self.ids.add(element_id)

        if tag == "html":
            self.html_lang = attributes.get("lang") or ""
        if tag == "main":
            self._main_depth += 1
        if tag == "title":
            self._title_depth += 1
        if tag == "nav":
            self._nav_classes.append(attributes.get("class") or "")

        if tag == "a" and attributes.get("href"):
            anchor = dict(attributes)
            anchor["_nav_class"] = self._nav_classes[-1] if self._nav_classes else ""
            self.anchors.append(anchor)
            self.references.append(("href", attributes["href"]))
        if tag == "img" and attributes.get("src"):
            self.images.append(attributes)
            self.references.append(("src", attributes["src"]))
        if tag == "script" and attributes.get("src"):
            self.references.append(("src", attributes["src"]))
        if tag == "link" and attributes.get("href"):
            self.references.append(("href", attributes["href"]))

        if tag == "meta" and (attributes.get("name") or "").lower() == "robots":
            self.robots.append((attributes.get("content") or "").lower())

    def handle_endtag(self, tag: str) -> None:
        if tag == "main" and self._main_depth:
            self._main_depth -= 1
        if tag == "title" and self._title_depth:
            self._title_depth -= 1
        if tag == "nav" and self._nav_classes:
            self._nav_classes.pop()

    def handle_data(self, data: str) -> None:
        if self._title_depth:
            self.title_parts.append(data)
        if self._main_depth:
            self.main_text_parts.append(data)

    @property
    def title(self) -> str:
        return " ".join(" ".join(self.title_parts).split())

    @property
    def main_text(self) -> str:
        return " ".join(" ".join(self.main_text_parts).split())


def parse_document(path: Path) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def local_target(variant_root: Path, page: Path, reference: str) -> tuple[Path, str]:
    parsed = urlsplit(reference)
    fragment = unquote(parsed.fragment)
    raw_path = unquote(parsed.path)

    if raw_path.startswith("/"):
        target = variant_root / raw_path.lstrip("/")
    elif raw_path:
        target = page.parent / raw_path
    else:
        target = page

    if raw_path.endswith("/") or (raw_path and not Path(raw_path).suffix):
        target /= "index.html"

    return target.resolve(), fragment


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def image_size(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    if data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        return struct.unpack(">II", data[16:24])
    if not data.startswith(b"\xff\xd8"):
        raise ValueError("unsupported image format")

    sof_markers = {
        0xC0,
        0xC1,
        0xC2,
        0xC3,
        0xC5,
        0xC6,
        0xC7,
        0xC9,
        0xCA,
        0xCB,
        0xCD,
        0xCE,
        0xCF,
    }
    offset = 2
    while offset + 8 < len(data):
        if data[offset] != 0xFF:
            offset += 1
            continue
        while offset < len(data) and data[offset] == 0xFF:
            offset += 1
        marker = data[offset]
        offset += 1
        if marker in {0x01, 0xD8, 0xD9} or 0xD0 <= marker <= 0xD7:
            continue
        segment_length = int.from_bytes(data[offset : offset + 2], "big")
        if segment_length < 2 or offset + segment_length > len(data):
            break
        if marker in sof_markers:
            height = int.from_bytes(data[offset + 3 : offset + 5], "big")
            width = int.from_bytes(data[offset + 5 : offset + 7], "big")
            return width, height
        offset += segment_length
    raise ValueError("JPEG dimensions not found")


def git_output(args: list[str]) -> subprocess.CompletedProcess[bytes]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )


def verify_b_source_bytes(errors: list[str]) -> None:
    listing = git_output(
        ["ls-tree", "-r", "--name-only", B_SOURCE_COMMIT, "--", "variants/b"]
    )
    if listing.returncode:
        errors.append(
            f"cannot read Variant B source tree {B_SOURCE_COMMIT}: "
            f"{listing.stderr.decode(errors='replace').strip()}"
        )
        return

    expected = set(listing.stdout.decode().splitlines())
    actual = {
        path.relative_to(ROOT).as_posix()
        for path in (SITE / "b").rglob("*")
        if path.is_file()
    }
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        if missing:
            errors.append(f"B files missing relative to source commit: {', '.join(missing)}")
        if extra:
            errors.append(f"B files added relative to source commit: {', '.join(extra)}")

    for relative in sorted(expected & actual):
        base_blob = git_output(["show", f"{B_SOURCE_COMMIT}:{relative}"])
        if base_blob.returncode:
            errors.append(f"cannot read Variant B source blob: {relative}")
        elif (ROOT / relative).read_bytes() != base_blob.stdout:
            errors.append(f"generated B bytes differ from source commit: {relative}")


def verify_preserved_main_bytes(errors: list[str]) -> None:
    """Variant B work must leave generated A/C/E trees byte-for-byte at current main."""
    preserved_roots = ("variants/a", "variants/c", "variants/e")
    listing = git_output(
        ["ls-tree", "-r", "--name-only", CURRENT_MAIN_BASE, "--", *preserved_roots]
    )
    if listing.returncode:
        errors.append(
            f"cannot read current main base {CURRENT_MAIN_BASE}: "
            f"{listing.stderr.decode(errors='replace').strip()}"
        )
        return

    expected = set(listing.stdout.decode().splitlines())
    actual = {
        path.relative_to(ROOT).as_posix()
        for variant in ("a", "c", "e")
        for path in (SITE / variant).rglob("*")
        if path.is_file()
    }
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        if missing:
            errors.append(f"preserved A/C/E files are missing: {', '.join(missing)}")
        if extra:
            errors.append(f"preserved A/C/E files were added: {', '.join(extra)}")

    for relative in sorted(expected & actual):
        base_blob = git_output(["show", f"{CURRENT_MAIN_BASE}:{relative}"])
        if base_blob.returncode:
            errors.append(f"cannot read current main blob: {relative}")
        elif (ROOT / relative).read_bytes() != base_blob.stdout:
            errors.append(f"preserved A/C/E bytes changed: {relative}")


def verify_receipt(errors: list[str]) -> None:
    try:
        receipt = json.loads(RECEIPT_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"cannot read Variant A receipt: {exc}")
        return

    expected_regime = {
        "id": "A",
        "design_skill_used": False,
        "design_lookup_used": False,
        "design_generator_used": False,
        "design_token_system_imported": False,
        "forbidden_inputs_used": [],
    }
    expected_contract = {
        "noindex_nofollow_all_routes": True,
        "one_h1_per_route": True,
        "skip_link_and_semantic_landmarks": True,
        "keyboard_visible_focus": True,
        "native_disclosure_mobile_navigation": True,
        "mobile_breakpoint_max_px": 767,
        "mobile_minimum_control_px": 44,
        "mobile_body_px": 16,
        "mobile_hero_aspect_ratio": "4:3",
        "reduced_motion_handling": True,
        "factual_copy_gate": True,
        "exact_media_alts": True,
    }
    expected_isolation = {
        "changed_variant": "A",
        "generated_variants_b_c_policy": "byte-identical to accepted base commit",
        "deployment_performed": False,
    }

    checks = (
        (receipt.get("schema_version"), 1, "schema version"),
        (receipt.get("variant"), "A", "variant"),
        (receipt.get("scope"), "Plain Welcome", "scope"),
        (
            receipt.get("authority", {}).get("accepted_base_commit"),
            ACCEPTED_BASE,
            "accepted base",
        ),
        (
            receipt.get("authority", {}).get("brief"),
            "verified Quill five-regime pilot",
            "brief authority",
        ),
        (
            receipt.get("authority", {}).get("identity_line"),
            A_IDENTITY,
            "identity line",
        ),
        (receipt.get("design_regime"), expected_regime, "design regime"),
        (receipt.get("isolation"), expected_isolation, "isolation"),
        (receipt.get("routes"), list(ROUTES), "route manifest"),
        (receipt.get("media"), A_MEDIA, "media manifest"),
        (receipt.get("contract_assertions"), expected_contract, "contract assertions"),
    )
    for actual, expected, label in checks:
        if actual != expected:
            errors.append(f"Variant A receipt has incorrect {label}")


def verify_a_styles(errors: list[str]) -> None:
    css = (ROOT / "styles-a.css").read_text(encoding="utf-8")
    folded = css.casefold()
    required = (
        "--brick: #7a302b;",
        "--navy: #18324b;",
        "--white: #ffffff;",
        "--paper: #f5f3ee;",
        "--lawn: #426a43;",
        'font-family: georgia, "times new roman", serif;',
        "font-family: arial, helvetica, system-ui, sans-serif;",
        ".site-header {\n  height: 72px;",
        ":focus-visible",
        "min-height: 44px;",
        "border-radius: 0;",
        "border-radius: 4px;",
        "@media (max-width: 767px)",
        "font-size: 16px;",
        "aspect-ratio: 4 / 3;",
        "@media (prefers-reduced-motion: reduce)",
        "scroll-behavior: auto;",
    )
    for value in required:
        if value not in folded:
            errors.append(f"styles-a.css is missing contract evidence: {value}")

    allowed_colors = {"#7a302b", "#18324b", "#ffffff", "#f5f3ee", "#426a43"}
    colors = {color.casefold() for color in re.findall(r"#[0-9a-fA-F]{6}", css)}
    if colors != allowed_colors:
        errors.append(
            "styles-a.css palette differs from Plain Welcome contract: "
            f"{', '.join(sorted(colors))}"
        )

    forbidden = (
        "gradient",
        "box-shadow",
        "text-shadow",
        "backdrop-filter",
        "filter:",
        "@font-face",
        "@import",
        "url(",
        "@keyframes",
        "animation:",
        "transition:",
        ".callbar",
        "position: sticky",
        "border-radius: 999",
    )
    for value in forbidden:
        if value in folded:
            errors.append(f"styles-a.css contains forbidden visual mechanism: {value}")

    radii = set(re.findall(r"border-radius:\s*([^;]+);", folded))
    if not radii.issubset({"0", "4px"}):
        errors.append(f"styles-a.css contains a radius outside 0/4px: {sorted(radii)}")


def verify_a_pages(
    parsed_documents: dict[Path, DocumentParser], errors: list[str]
) -> None:
    titles: list[str] = []
    rendered_media: set[str] = set()
    variant_root = (SITE / "a").resolve()

    for route, route_file in ROUTES.items():
        page_path = (variant_root / route_file).resolve()
        parser = parsed_documents.get(page_path)
        if parser is None:
            continue
        relative = page_path.relative_to(ROOT)
        html = page_path.read_text(encoding="utf-8")
        main_text = parser.main_text
        titles.append(parser.title)

        for required in A_REQUIRED_MAIN_TEXT[route]:
            if required not in main_text:
                errors.append(f"{relative} is missing factual route copy: {required}")

        for required in (NAME, A_ADDRESS, A_PHONE_DISPLAY, f'href="tel:{PHONE_TEL}"'):
            if required not in html:
                errors.append(f"{relative} is missing exact Variant A public value: {required}")

        if parser.html_lang != "en":
            errors.append(f"{relative} does not declare html lang=en")
        for landmark in ("header", "main", "footer"):
            if parser.tag_counts[landmark] != 1:
                errors.append(f"{relative} must contain exactly one {landmark} landmark")
        if parser.tag_counts["h1"] != 1:
            errors.append(f"{relative} must contain exactly one h1")
        if parser.tag_counts["nav"] != 2:
            errors.append(f"{relative} must contain desktop and mobile primary navigation")
        if parser.tag_counts["details"] != 1 or parser.tag_counts["summary"] != 1:
            errors.append(f"{relative} is missing the native disclosure navigation")
        if parser.tag_counts["form"] or parser.tag_counts["script"]:
            errors.append(f"{relative} contains a form or script not allowed in Variant A")
        if parser.tag_counts["svg"] or parser.tag_counts["i"]:
            errors.append(f"{relative} contains a decorative icon mechanism")

        main_attrs = parser.element_attrs["main"]
        if len(main_attrs) != 1 or main_attrs[0].get("id") != "main" or main_attrs[0].get(
            "tabindex"
        ) != "-1":
            errors.append(f"{relative} has an invalid skip-link target")
        skip_links = [
            anchor
            for anchor in parser.anchors
            if "skip-link" in (anchor.get("class") or "").split()
        ]
        if len(skip_links) != 1 or skip_links[0].get("href") != "#main":
            errors.append(f"{relative} has an invalid skip link")

        expected_routes = list(ROUTES)
        for nav_class in ("desktop-navigation", "mobile-navigation"):
            nav_hrefs = [
                anchor.get("href")
                for anchor in parser.anchors
                if anchor.get("_nav_class") == nav_class
            ]
            if nav_hrefs != expected_routes:
                errors.append(f"{relative} {nav_class} does not contain the six canonical routes")
        header_ctas = [
            anchor
            for anchor in parser.anchors
            if "header-cta" in (anchor.get("class") or "").split()
        ]
        if len(header_ctas) != 1 or header_ctas[0].get("href") != "/visit/":
            errors.append(f"{relative} is missing the desktop Plan Your Visit button")
        current = [
            anchor
            for anchor in parser.anchors
            if anchor.get("aria-current") == "page"
        ]
        if len(current) != 2 or any(anchor.get("href") != route for anchor in current):
            errors.append(f"{relative} navigation does not identify the current route")

        actual_images: list[str] = []
        for image in parser.images:
            src = image.get("src") or ""
            filename = Path(src).name
            actual_images.append(filename)
            rendered_media.add(filename)
            manifest = A_MEDIA_BY_FILE.get(filename)
            if manifest is None:
                errors.append(f"{relative} renders an unmanifested image: {src}")
                continue
            dimensions = manifest["original_dimensions"]
            if image.get("alt") != manifest["alt"]:
                errors.append(f"{relative} has incorrect alt text for {filename}")
            if image.get("width") != str(dimensions["width"]) or image.get("height") != str(
                dimensions["height"]
            ):
                errors.append(f"{relative} has incorrect dimensions for {filename}")
        if tuple(actual_images) != A_EXPECTED_IMAGES[route]:
            errors.append(
                f"{relative} image placements differ: expected {A_EXPECTED_IMAGES[route]}, "
                f"found {tuple(actual_images)}"
            )

        folded_main = main_text.casefold()
        for value in (*FORBIDDEN_TEXT, *A_PUBLIC_FORBIDDEN):
            if re.search(rf"\b{re.escape(value.casefold())}\b", folded_main):
                errors.append(f"{relative} contains forbidden public copy: {value}")

    if len(titles) != len(set(titles)) or any(not title for title in titles):
        errors.append("Variant A route titles are missing or not unique")
    if rendered_media != set(ASSETS):
        errors.append(f"Variant A does not meaningfully render all four originals: {sorted(rendered_media)}")

    beliefs_path = (variant_root / ROUTES["/beliefs/"]).resolve()
    beliefs = parsed_documents.get(beliefs_path)
    expected_beliefs = "What We Believe Bible believing. Gospel driven. KJV Bible."
    if beliefs and beliefs.main_text != expected_beliefs:
        errors.append("Variant A beliefs route contains copy beyond the three confirmed beliefs")

    home_path = (variant_root / ROUTES["/"]).resolve()
    home = parsed_documents.get(home_path)
    if home:
        if home.main_text.count(A_IDENTITY) != 1:
            errors.append("Variant A home does not contain the exact identity line exactly once")
        if home.class_counts["schedule-row"] != 5:
            errors.append("Variant A home schedule does not contain exactly five rows")
        if home.class_counts["pathway"] != 3:
            errors.append("Variant A home does not contain exactly three ruled pathways")
        if home.class_counts["ministry-row"] != 4:
            errors.append("Variant A home does not contain exactly four ministry rows")
        home_html = home_path.read_text(encoding="utf-8")
        pathway_contract = re.findall(
            r'<div class="pathway"><h3>([^<]+)</h3>.*?'
            r'<a href="([^"]+)"(?: rel="([^"]+)")?>',
            home_html,
            flags=re.DOTALL,
        )
        expected_pathway_contract = [
            ("Service Times", "/events/", ""),
            ("Children and Nursery", "/visit/", ""),
            ("Directions", A_MAPS_DIR, "noopener"),
        ]
        if pathway_contract != expected_pathway_contract:
            errors.append(
                "Variant A home pathways must be Service Times -> /events/, "
                "Children and Nursery -> /visit/, and Directions -> exact Maps target "
                "with rel=noopener"
            )
        hero_start = home_html.find('<section class="home-hero"')
        hero_end = home_html.find("</section>", hero_start)
        after_hero = home_html[hero_end + len("</section>") :].lstrip()
        if not after_hero.startswith('<section class="weekly-schedule"'):
            errors.append("Variant A weekly schedule is not immediately below the hero")

    for route in ("/visit/", "/events/"):
        parser = parsed_documents.get((variant_root / ROUTES[route]).resolve())
        if parser and parser.class_counts["schedule-row"] != 5:
            errors.append(f"Variant A {route} schedule does not contain exactly five rows")
    ministries = parsed_documents.get((variant_root / ROUTES["/ministries/"]).resolve())
    if ministries and ministries.class_counts["ministry-row"] != 6:
        errors.append("Variant A ministries route does not contain all confirmed recurring gatherings")


def verify_c_styles(errors: list[str]) -> None:
    css_path = ROOT / "styles-c.css"
    try:
        css = css_path.read_text(encoding="utf-8")
    except OSError as exc:
        errors.append(f"cannot read styles-c.css: {exc}")
        return
    folded = css.casefold()

    required = (
        "--ground:#faf8f5",
        "--ground-alt:#f0ebe3",
        "--text:#2d2a26",
        "--text-muted:#6b6560",
        "--sage:#8fa68f",
        "--sage-light:#b8ccb8",
        "--terracotta:#c67d5a",
        "--terracotta-light:#e8a889",
        "--sand:#d4c4a8",
        "--cream:#f5f0e6",
        '@font-face{font-family:"fraunces"',
        'url("/assets/fonts/fraunces-latin.woff2") format("woff2")',
        '@font-face{font-family:"karla"',
        'url("/assets/fonts/karla-latin.woff2") format("woff2")',
        'font-family:"karla",sans-serif',
        'font-family:"fraunces",serif',
        "font-size:16px",
        "border-radius:60% 40% 50% 50% / 50% 50% 40% 60%",
        "box-shadow:0 20px 60px rgba(45,42,38,.10)",
        "@keyframes organic-morph",
        "animation:organic-morph 26s ease-in-out infinite",
        "@media(max-width:767px)",
        "min-height:44px",
        "border-radius:48px 28px 48px 28px",
        "@media(prefers-reduced-motion:reduce)",
        ".ambient-shape,.hero-image-mask,.visit-field::before{animation:none!important}",
        "transition-duration:.01ms!important",
        ":focus-visible",
    )
    for value in required:
        if value not in folded:
            errors.append(f"styles-c.css is missing Organic Biomorphic evidence: {value}")

    if (
        ".growing-panel{display:flex;min-height:220px;"
        "padding:clamp(1.8rem,4vw,3.25rem);flex-direction:column;"
        "justify-content:center;overflow:hidden}"
    ) not in folded:
        errors.append(
            "styles-c.css must center Growing Together card copy at 1440px, 390px, "
            "and 430px"
        )

    expected_colors = {
        "#faf8f5",
        "#f0ebe3",
        "#2d2a26",
        "#6b6560",
        "#8fa68f",
        "#b8ccb8",
        "#c67d5a",
        "#e8a889",
        "#d4c4a8",
        "#f5f0e6",
    }
    actual_colors = {color.casefold() for color in re.findall(r"#[0-9a-fA-F]{6}", css)}
    if actual_colors != expected_colors:
        errors.append(
            "styles-c.css palette differs from Direction 11: "
            f"{', '.join(sorted(actual_colors))}"
        )

    for forbidden in (
        "fonts.googleapis.com",
        "fonts.gstatic.com",
        "font-family:georgia",
        "font-family:inter",
        "font-family:playfair",
        "--charcoal:",
        "--accent:",
        ".rhythm-stop{animation:",
        ".rhythm-stop {animation:",
    ):
        if forbidden in folded:
            errors.append(f"styles-c.css contains non-Direction-11 mechanism: {forbidden}")


def verify_c_pages(
    parsed_documents: dict[Path, DocumentParser], errors: list[str]
) -> None:
    variant_root = (SITE / "c").resolve()
    titles: list[str] = []
    rendered_media: set[str] = set()

    for route, route_file in ROUTES.items():
        page_path = (variant_root / route_file).resolve()
        parser = parsed_documents.get(page_path)
        if parser is None:
            continue
        relative = page_path.relative_to(ROOT)
        html = page_path.read_text(encoding="utf-8")
        titles.append(parser.title)

        for required in C_REQUIRED_MAIN_TEXT[route]:
            if required not in parser.main_text:
                errors.append(f"{relative} is missing exact Variant C route copy: {required}")
        for required in (NAME, A_ADDRESS, A_PHONE_DISPLAY, f'href="tel:{PHONE_TEL}"'):
            if required not in html:
                errors.append(f"{relative} is missing exact Variant C public value: {required}")

        if parser.html_lang != "en":
            errors.append(f"{relative} does not declare html lang=en")
        for landmark in ("header", "main", "footer"):
            if parser.tag_counts[landmark] != 1:
                errors.append(f"{relative} must contain exactly one {landmark} landmark")
        if parser.tag_counts["h1"] != 1:
            errors.append(f"{relative} must contain exactly one h1")
        if parser.tag_counts["nav"] != 3:
            errors.append(f"{relative} must contain desktop, mobile, and footer navigation")
        if parser.tag_counts["details"] != 1 or parser.tag_counts["summary"] != 1:
            errors.append(f"{relative} is missing native mobile navigation")
        if parser.tag_counts["form"] or parser.tag_counts["script"]:
            errors.append(f"{relative} contains an unsupported form or script")
        if parser.tag_counts["svg"] or parser.tag_counts["i"]:
            errors.append(f"{relative} contains a fabricated icon mechanism")

        main_attrs = parser.element_attrs["main"]
        if len(main_attrs) != 1 or main_attrs[0].get("id") != "main" or main_attrs[0].get(
            "tabindex"
        ) != "-1":
            errors.append(f"{relative} has an invalid skip-link target")
        skip_links = [
            anchor for anchor in parser.anchors
            if "skip-link" in (anchor.get("class") or "").split()
        ]
        if len(skip_links) != 1 or skip_links[0].get("href") != "#main":
            errors.append(f"{relative} has an invalid skip link")

        for nav_class in ("c-desktop-navigation", "c-mobile-navigation"):
            nav_hrefs = [
                anchor.get("href") for anchor in parser.anchors
                if anchor.get("_nav_class") == nav_class
            ]
            if nav_hrefs != list(ROUTES):
                errors.append(f"{relative} {nav_class} does not contain six canonical routes")
        current = [anchor for anchor in parser.anchors if anchor.get("aria-current") == "page"]
        if len(current) != 2 or any(anchor.get("href") != route for anchor in current):
            errors.append(f"{relative} navigation does not identify the current route twice")
        wordmarks = [
            anchor for anchor in parser.anchors
            if "c-wordmark" in (anchor.get("class") or "").split()
        ]
        if len(wordmarks) != 1 or wordmarks[0].get("href") != "/":
            errors.append(f"{relative} is missing the text-only Faith Baptist Church wordmark")

        actual_images: list[str] = []
        for image in parser.images:
            src = image.get("src") or ""
            filename = Path(src).name
            actual_images.append(filename)
            rendered_media.add(filename)
            manifest = C_MEDIA_BY_FILE.get(filename)
            if manifest is None:
                errors.append(f"{relative} renders unmanifested media: {src}")
                continue
            dimensions = manifest["original_dimensions"]
            if image.get("alt") != manifest["alt"]:
                errors.append(f"{relative} has incorrect exact alt text for {filename}")
            if image.get("width") != str(dimensions["width"]) or image.get("height") != str(
                dimensions["height"]
            ):
                errors.append(f"{relative} has incorrect stable dimensions for {filename}")
        if tuple(actual_images) != C_EXPECTED_IMAGES[route]:
            errors.append(
                f"{relative} image placements differ: expected {C_EXPECTED_IMAGES[route]}, "
                f"found {tuple(actual_images)}"
            )

        folded_main = parser.main_text.casefold()
        for value in (*FORBIDDEN_TEXT, *A_PUBLIC_FORBIDDEN, *C_PUBLIC_FORBIDDEN):
            if re.search(rf"\b{re.escape(value.casefold())}\b", folded_main):
                errors.append(f"{relative} contains forbidden or invented public copy: {value}")

    if len(titles) != len(set(titles)) or any(not title for title in titles):
        errors.append("Variant C route titles are missing or not unique")
    if rendered_media != set(ASSETS):
        errors.append("Variant C does not meaningfully render all four real client rasters")

    home_path = (variant_root / ROUTES["/"]).resolve()
    home = parsed_documents.get(home_path)
    if home:
        if home.main_text.count(A_IDENTITY) != 1:
            errors.append("Variant C home must contain the exact identity line exactly once")
        expected_classes = {
            "c-home-hero": 1,
            "hero-image-mask": 1,
            "weekly-rhythm": 1,
            "rhythm-stop": 4,
            "growing-panel": 3,
            "real-place-gallery": 1,
            "place-photo": 3,
            "belief-field": 1,
            "visit-field": 1,
        }
        for class_name, count in expected_classes.items():
            if home.class_counts[class_name] != count:
                errors.append(
                    f"Variant C home requires {count} {class_name} element(s), "
                    f"found {home.class_counts[class_name]}"
                )
        if home.tag_counts["ol"] < 1:
            errors.append("Variant C Weekly Rhythm must remain a semantic ordered list")

    beliefs = parsed_documents.get((variant_root / ROUTES["/beliefs/"]).resolve())
    expected_beliefs = (
        "What We Believe These are the confirmed convictions of Faith Baptist Church. "
        "Bible believing. Gospel driven. We teach from the KJV Bible."
    )
    if beliefs and beliefs.main_text != expected_beliefs:
        errors.append("Variant C beliefs route contains copy beyond the three confirmed convictions")

    events = parsed_documents.get((variant_root / ROUTES["/events/"]).resolve())
    if events and (events.class_counts["weekly-rhythm"] != 1 or events.class_counts["rhythm-stop"] != 4):
        errors.append("Variant C events route must present four schedule stops as a vertical rhythm")

    contact_path = (variant_root / ROUTES["/contact/"]).resolve()
    if contact_path.is_file():
        contact_html = contact_path.read_text(encoding="utf-8")
        photo_index = contact_html.find('<figure class="contact-photo')
        if photo_index < 0:
            errors.append("Variant C contact route is missing its exterior photo")
        elif max(contact_html.find(f'href="tel:{PHONE_TEL}"'), contact_html.find(A_MAPS_DIR)) > photo_index:
            errors.append("Variant C contact route must put phone and directions before decorative media")


def verify_c_receipt(errors: list[str]) -> None:
    try:
        receipt = json.loads(C_RECEIPT_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"cannot read Variant C receipt: {exc}")
        return

    expected_regime = {
        "skill": "frontend-design-pro-demo",
        "version": "1.0.0",
        "direction": "11 Organic Biomorphic",
        "source": "/home/solo/.hermes/profiles/vector/skills/design-skills-pilot/frontend-design-pro-demo/demos-v02/11-organic-biomorphic.html",
        "receipt_text": "Direction 11 Organic Biomorphic, translated to Faith Baptist Church content and real media; no demo content copied.",
        "other_generators_used": [],
    }
    if receipt.get("schema_version") != 1 or receipt.get("task") != "t_ceaf5bba" or receipt.get("variant") != "C":
        errors.append("Variant C receipt has incorrect schema, task, or variant identity")
    if receipt.get("design_regime") != expected_regime:
        errors.append("Variant C receipt has an incorrect design regime")
    if receipt.get("routes") != list(ROUTES):
        errors.append("Variant C receipt has an incorrect route manifest")
    if receipt.get("media") != C_MEDIA:
        errors.append("Variant C receipt has an incorrect media manifest")

    route_checks = receipt.get("route_checks", {})
    expected_route_assertions = {
        "noindex_nofollow": True,
        "unique_title": True,
        "exact_copy": True,
        "canonical_internal_links": True,
        "one_h1": True,
    }
    for route in ROUTES:
        if route_checks.get(route) != expected_route_assertions:
            errors.append(f"Variant C receipt has incomplete route checks for {route}")

    expected_contract = {
        "all_four_real_rasters_bundled": True,
        "all_four_real_rasters_rendered": True,
        "exact_alt_text": True,
        "stable_image_dimensions": True,
        "exact_client_facts": True,
        "public_copy_forbidden_hits": [],
        "skip_link_semantic_landmarks_keyboard_focus": True,
        "minimum_control_px": 44,
        "mobile_body_px": 16,
        "desktop_1440x1000": True,
        "mobile_390x844_dpr2": True,
        "mobile_430x932_dpr2": True,
        "no_horizontal_overflow": True,
    }
    if receipt.get("contract_assertions") != expected_contract:
        errors.append("Variant C receipt has incomplete route/copy/media/accessibility assertions")

    expected_motion = {
        "prefers_reduced_motion_media_query": True,
        "morphing_disabled": True,
        "floating_disabled": True,
        "transitions_reduced_to_0_01ms": True,
        "schedule_rows_never_animated": True,
    }
    if receipt.get("reduced_motion") != expected_motion:
        errors.append("Variant C receipt has incomplete reduced-motion evidence")

    expected_isolation = {
        "base_commit": C_ISOLATION_BASE,
        "preserved_variants": ["A", "B", "E"],
        "generated_outputs_byte_identical": True,
        "worktree_created": False,
        "branch_switched": False,
    }
    if receipt.get("isolation") != expected_isolation:
        errors.append("Variant C receipt has incorrect isolation evidence")

    source_demo = Path(expected_regime["source"])
    expected_hashes = {
        "home_html_sha256": sha256(SITE / "c" / "index.html"),
        "primary_css_sha256": sha256(SITE / "c" / "styles.css"),
        "build_source_sha256": sha256(ROOT / "build.py"),
        "verification_source_sha256": sha256(ROOT / "verify.py"),
        "direction_source_sha256": sha256(source_demo),
    }
    if receipt.get("hashes") != expected_hashes:
        errors.append("Variant C receipt hashes do not match the current artifact")

    font_records = receipt.get("fonts", [])
    if [record.get("file") for record in font_records] != list(C_FONT_FILES):
        errors.append("Variant C receipt has an incomplete font manifest")
    else:
        for record in font_records:
            source_path = ROOT / "assets" / "fonts" / record["file"]
            built_path = SITE / "c" / "assets" / "fonts" / record["file"]
            if not source_path.is_file() or not built_path.is_file():
                errors.append(f"Variant C font artifact is missing: {record['file']}")
                continue
            if source_path.read_bytes() != built_path.read_bytes():
                errors.append(f"Variant C bundled font artifact differs: {record['file']}")
            if record.get("sha256") != sha256(source_path):
                errors.append(f"Variant C font receipt hash differs: {record['file']}")

    for check in ("python3 build.py", "python3 verify.py", "git diff --check", "focused isolation checks"):
        if receipt.get("verification", {}).get(check) != "pass":
            errors.append(f"Variant C receipt is missing verification result: {check}")


E_DIRECTION_CONTRACT = """<!--
THESIS: Service times are the interface. Refuse the conventional church hero followed by a generic card grid.
OWN-WORLD: Deep navy fields, cold white reading surfaces, brick action color, compressed sans display, sharp image plates, and a numbered weekly compass.
STORY: A visitor sees who Faith Baptist Church is, understands the complete weekly rhythm, confirms children and nursery options, and chooses Plan Your Visit.
FIRST VIEWPORT: church1.jpg occupies the left 58 percent. The right 42 percent is navy with the name, exact identity line, Plan Your Visit action, and a vertical Sunday/Wednesday time rail. The CTA is visible at 390x844 without scrolling.
FORM: Pinned Impeccable Persuade control. Build the brief's committed world, not a softened generic church layout.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->"""

E_REQUIRED_MAIN_TEXT = {
    "/": (
        A_IDENTITY,
        "9:00 AM Sunday School for adults and teens",
        "10:00 AM Sunday main service Young children's Sunday School and nursery for tots during Sunday programming",
        "6:00 PM Sunday evening service",
        "Wednesday 7:00 PM Prayer and Bible study",
        A_ADDRESS,
        A_PHONE_DISPLAY,
    ),
    "/visit/": (
        "Plan Your Visit",
        "Young children's Sunday School begins Sunday at 10:00 AM.",
        "A nursery for tots is available during Sunday programming.",
        A_ADDRESS,
        A_PHONE_DISPLAY,
    ),
    "/beliefs/": (
        "Bible believing.",
        "Gospel driven.",
        "We teach from the KJV Bible.",
    ),
    "/ministries/": (
        "Adults and teens Sunday School",
        "Main service",
        "Young children's Sunday School",
        "Nursery for tots",
        "Sunday evening service",
        "Prayer and Bible study",
    ),
    "/events/": (
        "The recurring weekly schedule is listed below.",
        "Current announcements will appear here when supplied.",
    ),
    "/contact/": ("Contact Faith Baptist Church", A_PHONE_DISPLAY, A_ADDRESS, "Get Directions"),
}


def verify_e_pages(
    parsed_documents: dict[Path, DocumentParser], errors: list[str]
) -> None:
    variant_root = (SITE / "e").resolve()
    titles: list[str] = []
    rendered_media: set[str] = set()
    for route, route_file in ROUTES.items():
        page_path = (variant_root / route_file).resolve()
        parser = parsed_documents.get(page_path)
        if parser is None:
            continue
        relative = page_path.relative_to(ROOT)
        html = page_path.read_text(encoding="utf-8")
        titles.append(parser.title)

        body_open = re.search(r"<body[^>]*>\n", html)
        if not body_open or not html[body_open.end() :].startswith(E_DIRECTION_CONTRACT):
            errors.append(f"{relative} does not embed the exact direction contract as body first child")
        for required in E_REQUIRED_MAIN_TEXT[route]:
            if required not in parser.main_text:
                errors.append(f"{relative} is missing Variant E route copy: {required}")
        if parser.tag_counts["h1"] != 1:
            errors.append(f"{relative} must contain exactly one h1")
        for landmark in ("header", "main", "footer"):
            if parser.tag_counts[landmark] != 1:
                errors.append(f"{relative} must contain exactly one {landmark} landmark")
        if parser.html_lang != "en":
            errors.append(f"{relative} does not declare html lang=en")
        if parser.tag_counts["form"] or parser.tag_counts["script"]:
            errors.append(f"{relative} contains an unsupported form or script")
        if parser.class_counts["section-mark"]:
            errors.append(f"{relative} retains refused section-mark eyebrow markup")
        current = [a for a in parser.anchors if a.get("aria-current") == "page"]
        if len(current) != 2 or any(a.get("href") != route for a in current):
            errors.append(f"{relative} navigation does not identify the current route twice")
        nav_hrefs = [urlsplit(a.get("href") or "").path for a in parser.anchors]
        for required_route in ROUTES:
            if required_route not in nav_hrefs:
                errors.append(f"{relative} is missing canonical route link {required_route}")

        for image in parser.images:
            filename = Path(image.get("src") or "").name
            rendered_media.add(filename)
            manifest = A_MEDIA_BY_FILE.get(filename)
            if manifest is None:
                errors.append(f"{relative} renders unmanifested media: {filename}")
                continue
            dimensions = manifest["original_dimensions"]
            if image.get("alt") != manifest["alt"]:
                errors.append(f"{relative} has incorrect alt text for {filename}")
            if image.get("width") != str(dimensions["width"]) or image.get("height") != str(dimensions["height"]):
                errors.append(f"{relative} has incorrect dimensions for {filename}")

        folded_main = parser.main_text.casefold()
        for value in (*FORBIDDEN_TEXT, *A_PUBLIC_FORBIDDEN):
            if re.search(rf"\b{re.escape(value.casefold())}\b", folded_main):
                errors.append(f"{relative} contains forbidden public copy: {value}")

        if route == "/":
            if parser.class_counts["first-view"] != 1 or parser.class_counts["hero-rail"] != 1:
                errors.append("Variant E home is missing the pinned first viewport")
            hero_rail = re.search(
                r'<div class="hero-rail" aria-label="Weekly service times">(.*?)</div>',
                html,
                flags=re.DOTALL,
            )
            rail_labels = tuple(re.findall(r"<span>([^<]+)</span>", hero_rail.group(1))) if hero_rail else ()
            if rail_labels != ("Sun 9:00", "Sun 10:00", "Sun 6:00", "Wed 7:00"):
                errors.append("Variant E home first viewport must contain the four schedule labels")
            if '<p class="section-mark">Fostoria, Ohio</p>' in html:
                errors.append("Variant E home retains the refused location eyebrow")
            home_images = [Path(img.get("src") or "").name for img in parser.images]
            if set(home_images) != set(ASSETS):
                errors.append("Variant E home must meaningfully render all four client rasters")
            if parser.class_counts["compass-line"] != 1:
                errors.append("Variant E home must contain one full Service-Time Compass")
        elif parser.class_counts["compact-compass"] != 1:
            errors.append(f"{relative} is missing compact schedule-compass wayfinding")

    if len(titles) != len(set(titles)) or any(not title for title in titles):
        errors.append("Variant E route titles are missing or not unique")
    if rendered_media != set(ASSETS):
        errors.append("Variant E does not render all four bundled client rasters")

    variant_e_source = (ROOT / "variant_e.py").read_text(encoding="utf-8").casefold()
    if 'class="section-mark"' in variant_e_source:
        errors.append("variant_e.py retains refused section-mark eyebrow markup")

    css = (ROOT / "styles-e.css").read_text(encoding="utf-8").casefold()
    if ".section-mark" in css:
        errors.append("styles-e.css retains refused section-mark eyebrow styling")
    for required in (
        "--navy:#10283f",
        "--white:#f7f8f5",
        "--brick:#963c32",
        "--mist:#dce5ea",
        "grid-template-columns:58% 42%",
        '@font-face{font-family:"liberation sans narrow"',
        'url("/assets/fonts/liberationsansnarrow-bold.ttf")',
        '@font-face{font-family:"source sans 3"',
        'url("/assets/fonts/sourcesans3-latin.woff2") format("woff2")',
        'body{margin:0;background:var(--white);color:var(--ink);font-family:"source sans 3","segoe ui",sans-serif',
        ".hero-rail{display:grid;grid-template-columns:1fr",
        ".hero-rail{grid-template-columns:repeat(2,minmax(0,1fr))",
        ".hero-rail span{font-size:1rem",
        "::selection{background:var(--brick);color:var(--white)}",
        "scrollbar-color:var(--navy) var(--mist)",
        "::-webkit-scrollbar-thumb{background:var(--navy)",
        "@keyframes draw-line",
        "@media(prefers-reduced-motion:reduce)",
        "@media(prefers-reduced-transparency:reduce)",
        "@media(max-width:767px)",
        "height:34vh",
    ):
        if required not in css:
            errors.append(f"styles-e.css is missing direction-contract evidence: {required}")
    for forbidden in ('font-family:"archivo black"', "font-size:.68rem"):
        if forbidden in css:
            errors.append(f"styles-e.css retains superseded finish-review evidence: {forbidden}")

    source_font = ROOT / "assets" / "fonts" / E_FONT_FILE
    built_font = variant_root / "assets" / "fonts" / E_FONT_FILE
    source_license = ROOT / "assets" / "fonts" / E_FONT_LICENSE
    built_license = variant_root / "assets" / "fonts" / E_FONT_LICENSE
    for label, path in (("source", source_font), ("built", built_font)):
        if not path.is_file() or sha256(path) != E_FONT_SHA256:
            errors.append(f"Variant E {label} display font is missing or differs from its source")
    if not source_license.is_file() or not built_license.is_file():
        errors.append("Variant E display-font license is not bundled")
    elif source_license.read_bytes() != built_license.read_bytes():
        errors.append("Variant E bundled display-font license differs from its source")

    source_body_font = ROOT / "assets" / "fonts" / E_BODY_FONT_FILE
    built_body_font = variant_root / "assets" / "fonts" / E_BODY_FONT_FILE
    source_body_license = ROOT / "assets" / "fonts" / E_BODY_FONT_LICENSE
    built_body_license = variant_root / "assets" / "fonts" / E_BODY_FONT_LICENSE
    source_body_provenance = ROOT / "assets" / "fonts" / E_BODY_FONT_PROVENANCE
    built_body_provenance = variant_root / "assets" / "fonts" / E_BODY_FONT_PROVENANCE
    for label, path in (("source", source_body_font), ("built", built_body_font)):
        if not path.is_file() or sha256(path) != E_BODY_FONT_SHA256:
            errors.append(f"Variant E {label} Source Sans 3 font is missing or differs from its verified subset")
    for label, path in (("source", source_body_license), ("built", built_body_license)):
        if not path.is_file() or sha256(path) != E_BODY_FONT_LICENSE_SHA256:
            errors.append(f"Variant E {label} Source Sans 3 license is missing or differs from its verified source")
    if not source_body_provenance.is_file() or not built_body_provenance.is_file():
        errors.append("Variant E Source Sans 3 provenance is not bundled")
    elif source_body_provenance.read_bytes() != built_body_provenance.read_bytes():
        errors.append("Variant E bundled Source Sans 3 provenance differs from its source")
    else:
        provenance = source_body_provenance.read_text(encoding="utf-8")
        for required in (
            "Google Fonts upstream of Source Sans 3",
            "042fe2cc0b933e328410d7acbd0aa6a1873dca5aef81875f4bc214b08825c7b9",
            E_BODY_FONT_SHA256,
            E_BODY_FONT_LICENSE_SHA256,
        ):
            if required not in provenance:
                errors.append(f"Variant E Source Sans 3 provenance is missing: {required}")


def verify_e_receipt(errors: list[str]) -> None:
    try:
        receipt = json.loads(E_RECEIPT_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"cannot read Variant E receipt: {exc}")
        return
    regime = receipt.get("design_regime", {})
    if regime != {
        "skill": "Impeccable",
        "version": "4.1.1",
        "mode": "Persuade",
        "direction": "Service-Time Compass",
        "other_generators_used": [],
    }:
        errors.append("Variant E receipt has an incorrect design regime")
    if receipt.get("routes") != list(ROUTES):
        errors.append("Variant E receipt has an incorrect route manifest")
    contract = receipt.get("contract_assertions", {})
    for assertion in (
        "source_sans_3_body_face_bundled_and_loaded",
        "section_mark_eyebrow_markup_and_style_absent",
    ):
        if contract.get(assertion) is not True:
            errors.append(f"Variant E receipt is missing remediation assertion: {assertion}")
    body_fonts = [font for font in receipt.get("fonts", []) if font.get("role") == "body"]
    if len(body_fonts) != 1:
        errors.append("Variant E receipt must contain exactly one body-font record")
    else:
        body_font = body_fonts[0]
        expected_body_font = {
            "family": "Source Sans 3",
            "source_path": f"assets/fonts/{E_BODY_FONT_FILE}",
            "bundled_path": f"variants/e/assets/fonts/{E_BODY_FONT_FILE}",
            "sha256": E_BODY_FONT_SHA256,
            "license_sha256": E_BODY_FONT_LICENSE_SHA256,
            "loaded_via_font_face": True,
        }
        for key, expected in expected_body_font.items():
            if body_font.get(key) != expected:
                errors.append(f"Variant E receipt has incorrect Source Sans 3 {key}")
    expected_review = {
        "exact_disposition": "pass",
        "fresh_isolated": True,
        "material_fix_count": 0,
        "material_fixes_applied": 2,
        "detector_rerun": False,
        "post_fix_disposition": "pass",
        "post_fix_review_state": "fresh_isolated_review_complete",
        "receipt": "qa/variant-e/post-remediation-finish-review.log.md",
    }
    if receipt.get("post_remediation_finish_review") != expected_review:
        errors.append("Variant E receipt has an incorrect post-remediation finish-review record")
    elif not (ROOT / expected_review["receipt"]).is_file():
        errors.append("Variant E post-remediation finish-review receipt is missing")
    media = receipt.get("media", [])
    if [item.get("file") for item in media] != list(ASSETS):
        errors.append("Variant E receipt has an incorrect media manifest")
        return
    for item in media:
        source = A_MEDIA_BY_FILE[item["file"]]
        expected_path = f"variants/e/assets/{item['file']}"
        if item.get("alt") != source["alt"]:
            errors.append(f"Variant E receipt has incorrect alt text for {item['file']}")
        if item.get("original_dimensions") != source["original_dimensions"]:
            errors.append(f"Variant E receipt has incorrect dimensions for {item['file']}")
        if item.get("sha256") != source["sha256"] or item.get("bundled_path") != expected_path:
            errors.append(f"Variant E receipt has incorrect provenance for {item['file']}")
        bundled = ROOT / expected_path
        if not bundled.is_file() or sha256(bundled) != source["sha256"]:
            errors.append(f"Variant E bundled media differs from receipt: {item['file']}")


def main() -> int:
    errors: list[str] = []
    expected_pages = {
        (SITE / variant / route_file).resolve()
        for variant in VARIANTS
        for route_file in ROUTES.values()
    }
    actual_pages = {path.resolve() for path in SITE.glob("*/**/*.html")}

    if actual_pages != expected_pages:
        missing = sorted(str(path.relative_to(ROOT)) for path in expected_pages - actual_pages)
        extra = sorted(str(path.relative_to(ROOT)) for path in actual_pages - expected_pages)
        if missing:
            errors.append(f"missing generated pages: {', '.join(missing)}")
        if extra:
            errors.append(f"unexpected generated pages: {', '.join(extra)}")

    source = (ROOT / "build.py").read_text(encoding="utf-8")
    for required in (
        NAME,
        ADDRESS,
        D_ADDRESS,
        PHONE_DISPLAY,
        PHONE_TEL,
        A_ADDRESS,
        A_PHONE_DISPLAY,
        A_MAPS_DIR,
        A_IDENTITY,
        *(item["alt"] for item in A_MEDIA),
    ):
        if required not in source:
            errors.append(f"build.py is missing confirmed source value: {required}")
    for forbidden in FORBIDDEN_TEXT:
        if forbidden.casefold() in source.casefold():
            errors.append(f"build.py contains forbidden text: {forbidden}")

    parsed_documents: dict[Path, DocumentParser] = {}
    for page_path in sorted(expected_pages & actual_pages):
        relative_path = page_path.relative_to(ROOT)
        html = page_path.read_text(encoding="utf-8")
        parser = parse_document(page_path)
        parsed_documents[page_path] = parser
        variant = relative_path.parts[1]
        if variant in {"a", "c", "e"}:
            public_address = A_ADDRESS
            public_phone = A_PHONE_DISPLAY
        elif variant == "d":
            public_address = D_ADDRESS
            public_phone = PHONE_DISPLAY
        else:
            public_address = B_ADDRESS
            public_phone = PHONE_DISPLAY

        for required in (NAME, public_address, public_phone, f'href="tel:{PHONE_TEL}"'):
            if required not in html:
                errors.append(f"{relative_path} is missing confirmed value: {required}")
        if parser.tag_counts["h1"] != 1:
            errors.append(
                f"{relative_path} must contain exactly one h1 "
                f"(found {parser.tag_counts['h1']})"
            )
        if variant == "b":
            for forbidden in (
                "—",
                "–",
                "&mdash;",
                "&ndash;",
                "preview",
                "concept",
                "mockup",
                "template",
                "pilot",
                "skill",
                "regime",
            ):
                if forbidden.casefold() in html.casefold():
                    errors.append(
                        f"{relative_path} contains banned Variant B public copy: {forbidden}"
                    )
        for forbidden in FORBIDDEN_TEXT:
            if forbidden.casefold() in html.casefold():
                errors.append(f"{relative_path} contains forbidden text: {forbidden}")

        robots_tokens = {
            token.strip() for content in parser.robots for token in content.split(",")
        }
        if not {"noindex", "nofollow"}.issubset(robots_tokens):
            errors.append(f"{relative_path} is missing noindex, nofollow")

    for variant in VARIANTS:
        variant_root = (SITE / variant).resolve()
        for route_file in ROUTES.values():
            page_path = (variant_root / route_file).resolve()
            parser = parsed_documents.get(page_path)
            if parser is None:
                continue

            references = [reference for _, reference in parser.references]
            linked_paths = {urlsplit(reference).path for reference in references}
            for route in ROUTES:
                if route not in linked_paths:
                    errors.append(
                        f"{page_path.relative_to(ROOT)} is missing internal route link: {route}"
                    )

            for attribute, reference in parser.references:
                parsed = urlsplit(reference)
                if parsed.scheme or parsed.netloc or reference.startswith("//"):
                    continue
                target, fragment = local_target(variant_root, page_path, reference)
                try:
                    target.relative_to(variant_root)
                except ValueError:
                    errors.append(
                        f"{page_path.relative_to(ROOT)} {attribute} escapes variant root: {reference}"
                    )
                    continue
                if not target.is_file():
                    errors.append(
                        f"{page_path.relative_to(ROOT)} has broken {attribute}: {reference}"
                    )
                    continue
                if fragment and target.suffix == ".html":
                    target_parser = parsed_documents.get(target)
                    if target_parser is None:
                        target_parser = parse_document(target)
                        parsed_documents[target] = target_parser
                    if fragment not in target_parser.ids:
                        errors.append(
                            f"{page_path.relative_to(ROOT)} has missing fragment target: {reference}"
                        )

        for asset in ASSETS:
            source_asset = ROOT / "assets" / asset
            built_asset = variant_root / "assets" / asset
            if not built_asset.is_file() or built_asset.read_bytes() != source_asset.read_bytes():
                errors.append(f"variant {variant} asset differs from source: {asset}")

        source_styles = ROOT / f"styles-{variant}.css"
        built_styles = variant_root / "styles.css"
        if not built_styles.is_file() or built_styles.read_bytes() != source_styles.read_bytes():
            errors.append(f"variant {variant} stylesheet differs from source")
        if variant == "b":
            source_nginx = ROOT / "nginx-b.conf"
            built_nginx = variant_root / "nginx.conf"
            if not built_nginx.is_file() or built_nginx.read_bytes() != source_nginx.read_bytes():
                errors.append("variant b nginx.conf differs from source")
            elif 'X-Robots-Tag "noindex, nofollow" always' not in built_nginx.read_text(
                encoding="utf-8"
            ):
                errors.append("variant b nginx.conf is missing X-Robots-Tag")

    for item in A_MEDIA:
        source_asset = ROOT / "assets" / item["file"]
        built_asset = ROOT / item["bundled_path"]
        dimensions = item["original_dimensions"]
        for label, path in (("source", source_asset), ("bundled", built_asset)):
            if sha256(path) != item["sha256"]:
                errors.append(f"Variant A {label} media hash differs: {item['file']}")
            try:
                actual_dimensions = image_size(path)
            except ValueError as exc:
                errors.append(f"cannot inspect Variant A {label} media {item['file']}: {exc}")
                continue
            if actual_dimensions != (dimensions["width"], dimensions["height"]):
                errors.append(f"Variant A {label} media dimensions differ: {item['file']}")


    d_root = SITE / "d"
    d_pages = [d_root / route_file for route_file in ROUTES.values()]
    for d_page in d_pages:
        html = d_page.read_text(encoding="utf-8")
        folded_html = html.casefold()
        for banned in D_PUBLIC_COPY_BANNED:
            if banned.casefold() in folded_html:
                errors.append(
                    f"{d_page.relative_to(ROOT)} contains banned public copy: {banned}"
                )
        if "<blockquote" in folded_html or "testimonial" in folded_html:
            errors.append(
                f"{d_page.relative_to(ROOT)} contains rejected quotation or testimonial UI"
            )

    d_home = (d_root / ROUTES["/"]).read_text(encoding="utf-8")
    for required in (
        "New Visitor Questions",
        "Weekly Schedule",
        "Verified Place and Schedule Proof",
        "Confirmed Beliefs",
        *D_ALT_TEXT,
    ):
        if required not in d_home:
            errors.append(f"variant D home is missing required proof content: {required}")
    for asset in ASSETS:
        if f'src="/assets/{asset}"' not in d_home:
            errors.append(f"variant D home proof is missing image: {asset}")

    for route in ("/", "/visit/", "/events/"):
        schedule_html = unescape((d_root / ROUTES[route]).read_text(encoding="utf-8"))
        for day, gathering, time in D_SCHEDULE_FACTS:
            if not all(value in schedule_html for value in (day, gathering, time)):
                errors.append(f"variant D route {route} is missing schedule row: {gathering}")

    d_events = unescape((d_root / ROUTES["/events/"]).read_text(encoding="utf-8"))
    if "Announcements appear here when supplied." not in d_events:
        errors.append("variant D events page is missing the supplied-announcements notice")

    d_contact = (d_root / ROUTES["/contact/"]).read_text(encoding="utf-8")
    if "<form" in d_contact.casefold():
        errors.append("variant D contact page contains an unrequested form")
    for route, route_file in ROUTES.items():
        for first, second in itertools.combinations(VARIANTS, 2):
            first_path = SITE / first / route_file
            second_path = SITE / second / route_file
            if not first_path.is_file() or not second_path.is_file():
                continue
            first_html = first_path.read_text(encoding="utf-8").replace(
                f"v-{first}", "v-*"
            )
            second_html = second_path.read_text(encoding="utf-8").replace(
                f"v-{second}", "v-*"
            )
            if first_html == second_html:
                errors.append(f"variants {first}/{second} are identical at route {route}")

    for first, second in itertools.combinations(VARIANTS, 2):
        first_styles = SITE / first / "styles.css"
        second_styles = SITE / second / "styles.css"
        if not first_styles.is_file() or not second_styles.is_file():
            continue
        if first_styles.read_bytes() == second_styles.read_bytes():
            errors.append(f"variant stylesheets {first}/{second} are identical")

    b_alts = {
        image.get("alt") or ""
        for page_path, parser in parsed_documents.items()
        if page_path.relative_to(ROOT).parts[1] == "b"
        for image in parser.images
    }
    for exact_alt in B_ALTS:
        if exact_alt not in b_alts:
            errors.append(f"Variant B is missing exact client image alt: {exact_alt}")

    b_css = (ROOT / "styles-b.css").read_text(encoding="utf-8")
    for required_css in (
        "#a24532",
        "prefers-color-scheme: dark",
        "border-radius: 12px",
        "border-radius: 8px",
        "prefers-reduced-motion",
        "grid-template-columns: 44fr 56fr",
    ):
        if required_css not in b_css:
            errors.append(f"styles-b.css is missing Taste gate: {required_css}")
    for forbidden_css in ("linear-gradient", "radial-gradient", "h-screen", "animation:"):
        if forbidden_css in b_css:
            errors.append(f"styles-b.css contains prohibited Taste pattern: {forbidden_css}")

    receipt = ROOT / "qa" / "variant-b-taste-receipt.md"
    manifest = ROOT / "qa" / "variant-b-media-manifest.json"
    if not receipt.is_file():
        errors.append("missing Variant B Taste regime receipt")
    else:
        receipt_text = receipt.read_text(encoding="utf-8")
        for required in (
            "design-taste-frontend",
            "DESIGN_VARIANCE=4",
            "MOTION_INTENSITY=2",
            "VISUAL_DENSITY=4",
        ):
            if required not in receipt_text:
                errors.append(f"Variant B receipt is missing: {required}")
    if not manifest.is_file():
        errors.append("missing Variant B media manifest")

    for qa_path in (ROOT / "README.md", ROOT / "qa-live.json"):
        qa_text = qa_path.read_text(encoding="utf-8")
        superseded_name = f"Faith {SUPERSEDED_CHURCH_WORD} Church"
        if superseded_name.casefold() in qa_text.casefold():
            errors.append(f"{qa_path.relative_to(ROOT)} contains the superseded display name")

    verify_receipt(errors)
    verify_a_styles(errors)
    verify_a_pages(parsed_documents, errors)
    verify_c_styles(errors)
    verify_c_pages(parsed_documents, errors)
    verify_c_receipt(errors)
    verify_e_pages(parsed_documents, errors)
    verify_e_receipt(errors)
    verify_b_source_bytes(errors)
    verify_preserved_main_bytes(errors)

    if errors:
        print("Verification failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Verified 30 pages. Variants A, B, C, D, and E pass route/copy/alts/noindex, "
        "media integrity, accessibility/mobile and regime receipts; generated B output "
        f"matches {B_SOURCE_COMMIT}, and A/C/E match current main {CURRENT_MAIN_BASE}; "
        "Variant D contracts and assets are verified."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
