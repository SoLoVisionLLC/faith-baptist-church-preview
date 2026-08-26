#!/usr/bin/env python3
"""Verify the complete local static preview build without network access."""

from __future__ import annotations

import itertools
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "variants"
VARIANTS = ("a", "b", "c")
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
SUPERSEDED_CHURCH_WORD = "Cha" + "pel"
SUPERSEDED_STREET_NAME = "Syca" + "more"
FORBIDDEN_TEXT = (
    f"Faith {SUPERSEDED_CHURCH_WORD}",
    f"220 {SUPERSEDED_STREET_NAME}",
)
ASSETS = ("front.png", "church1.jpg", "church2.jpg", "church3.jpg")


class DocumentParser(HTMLParser):
    """Collect local references and metadata needed by the verifier."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.references: list[tuple[str, str]] = []
        self.robots: list[str] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if element_id:
            self.ids.add(element_id)

        if tag == "a" and attributes.get("href"):
            self.references.append(("href", attributes["href"]))
        if tag in {"img", "script"} and attributes.get("src"):
            self.references.append(("src", attributes["src"]))
        if tag == "link" and attributes.get("href"):
            self.references.append(("href", attributes["href"]))

        if tag == "meta" and (attributes.get("name") or "").lower() == "robots":
            self.robots.append((attributes.get("content") or "").lower())


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

    source_path = ROOT / "build.py"
    source = source_path.read_text(encoding="utf-8")
    for required in (NAME, ADDRESS, PHONE_DISPLAY, PHONE_TEL):
        if required not in source:
            errors.append(f"build.py is missing confirmed value: {required}")
    for forbidden in FORBIDDEN_TEXT:
        if forbidden.casefold() in source.casefold():
            errors.append(f"build.py contains forbidden text: {forbidden}")

    parsed_documents: dict[Path, DocumentParser] = {}
    for page_path in sorted(expected_pages & actual_pages):
        relative_path = page_path.relative_to(ROOT)
        html = page_path.read_text(encoding="utf-8")
        parser = parse_document(page_path)
        parsed_documents[page_path] = parser

        for required in (NAME, ADDRESS, PHONE_DISPLAY, f'href="tel:{PHONE_TEL}"'):
            if required not in html:
                errors.append(f"{relative_path} is missing confirmed value: {required}")
        for forbidden in FORBIDDEN_TEXT:
            if forbidden.casefold() in html.casefold():
                errors.append(f"{relative_path} contains forbidden text: {forbidden}")

        robots_tokens = {
            token.strip()
            for content in parser.robots
            for token in content.split(",")
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

    if errors:
        print("Verification failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(
        "Verified 18 pages: identity/contact details, noindex, internal links, "
        "assets, and pairwise variant uniqueness all pass."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
