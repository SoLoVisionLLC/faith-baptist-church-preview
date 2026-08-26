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
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "variants"
VARIANTS = ("a", "b", "c")
ACCEPTED_BASE = "ee3623e41b6647b7380c987421f4a2ecb2057749"
RECEIPT_PATH = ROOT / "variant-a-receipt.json"
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


def verify_base_bytes(errors: list[str]) -> None:
    listing = git_output(
        ["ls-tree", "-r", "--name-only", ACCEPTED_BASE, "--", "variants/b", "variants/c"]
    )
    if listing.returncode:
        errors.append(
            f"cannot read accepted B/C tree {ACCEPTED_BASE}: "
            f"{listing.stderr.decode(errors='replace').strip()}"
        )
        return

    expected = set(listing.stdout.decode().splitlines())
    actual = {
        path.relative_to(ROOT).as_posix()
        for variant in ("b", "c")
        for path in (SITE / variant).rglob("*")
        if path.is_file()
    }
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        if missing:
            errors.append(f"B/C files missing relative to accepted base: {', '.join(missing)}")
        if extra:
            errors.append(f"B/C files added relative to accepted base: {', '.join(extra)}")

    for relative in sorted(expected & actual):
        base_blob = git_output(["show", f"{ACCEPTED_BASE}:{relative}"])
        if base_blob.returncode:
            errors.append(f"cannot read accepted base blob: {relative}")
        elif (ROOT / relative).read_bytes() != base_blob.stdout:
            errors.append(f"generated B/C bytes differ from accepted base: {relative}")


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
        public_address = A_ADDRESS if variant == "a" else ADDRESS
        public_phone = A_PHONE_DISPLAY if variant == "a" else PHONE_DISPLAY

        for required in (NAME, public_address, public_phone, f'href="tel:{PHONE_TEL}"'):
            if required not in html:
                errors.append(f"{relative_path} is missing confirmed value: {required}")
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

    for route, route_file in ROUTES.items():
        for first, second in itertools.combinations(VARIANTS, 2):
            first_html = (SITE / first / route_file).read_text(encoding="utf-8").replace(
                f"v-{first}", "v-*"
            )
            second_html = (SITE / second / route_file).read_text(encoding="utf-8").replace(
                f"v-{second}", "v-*"
            )
            if first_html == second_html:
                errors.append(f"variants {first}/{second} are identical at route {route}")

    for first, second in itertools.combinations(VARIANTS, 2):
        if (SITE / first / "styles.css").read_bytes() == (
            SITE / second / "styles.css"
        ).read_bytes():
            errors.append(f"variant stylesheets {first}/{second} are identical")

    for qa_path in (ROOT / "README.md", ROOT / "qa-live.json"):
        qa_text = qa_path.read_text(encoding="utf-8")
        superseded_name = f"Faith {SUPERSEDED_CHURCH_WORD} Church"
        if superseded_name.casefold() in qa_text.casefold():
            errors.append(f"{qa_path.relative_to(ROOT)} contains the superseded display name")

    verify_receipt(errors)
    verify_a_styles(errors)
    verify_a_pages(parsed_documents, errors)
    verify_base_bytes(errors)

    if errors:
        print("Verification failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Verified 18 pages. Variant A passes exact routes/copy/alts/noindex, media "
        "integrity, accessibility/mobile and regime receipts; generated B/C bytes "
        f"match accepted base {ACCEPTED_BASE}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
