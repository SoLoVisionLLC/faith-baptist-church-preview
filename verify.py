#!/usr/bin/env python3
"""Verify the Revision 3 static contract; browser and live QA are separate gates.

Revision 2 required generated HTML to match historical Git commits byte-for-byte.
Revision 3 explicitly changes all five compositions and their public wording, so
those freezes are replaced by route, content, media and regime checks below.
"""
from __future__ import annotations

import hashlib
import itertools
import json
import re
import struct
import sys
from collections import Counter, defaultdict
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit, parse_qs

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "variants"
VARIANTS = ("a", "b", "c", "d", "e")
ROUTES = {"/": Path("index.html"), **{f"/{r}/": Path(r) / "index.html" for r in ("visit", "beliefs", "ministries", "events", "contact")}}
COLORS = {"#b31942", "#0a3161", "#ffffff"}
RGB_COLORS = {(179, 25, 66), (10, 49, 97), (255, 255, 255)}
NAME = "Faith Baptist Church"
ADDRESS = "11275 W. Twp. Rd. 116, Fostoria, OH 44830"
PHONE_TEL = "tel:+14193482171"
IDENTITY = "Bible believing. Gospel driven. Growing together in God's Word."
MEDIA = json.loads((ROOT / "qa/revision-3-media.json").read_text())
RASTERS = {item["file"]: item for item in MEDIA["rasters"]}
BANNED = re.compile(r"\b(preview|concept|mockup|demo|placeholder|sample|pilot|skill|regime|revision|redesign|solovision|template|pastor|testimonials?|livestream|giving|donation|sermon archive|dillon road|faith chapel)\b", re.I)
REPORT_COPY = re.compile(r"source[- ]backed|confirmed (?:convictions|gatherings|schedule|information)|verified (?:place|schedule|facts)|when supplied|when provided|exact address|source material", re.I)

CSS_NAMED_COLORS = frozenset(
    """
    aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond
    blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue
    cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey
    darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon
    darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet
    deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen
    fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew
    hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon
    lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey
    lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey
    lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine
    mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen
    mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite
    navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen
    paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple
    rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell
    sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan
    teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen
    """.split()
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

def normalize_hex_color(literal: str) -> str:
    digits = literal.removeprefix("#").casefold()
    if len(digits) in {3, 4}:
        digits = "".join(channel * 2 for channel in digits)
    return f"#{digits[:6]}"


def public_text(html: str) -> str:
    # Comments and scripts are implementation details, never visible client copy.
    html = re.sub(r'<!--.*?-->|<(script|style)\b[^>]*>.*?</\1>', '', html, flags=re.S | re.I)
    return ' '.join(unescape(re.sub(r'<[^>]+>', ' ', html)).split())


def verify_colors(css: str, label: str, errors: list[str]) -> None:
    # The comparison dock and palette switcher keep their shared Revision 2 chrome
    # (validated by verify_preview_dock_contract / verify_palette_switcher), so
    # their scoped declarations are exempt from each variant's design triad.
    # Exempt by selector scope BEFORE comment-stripping, which erases the marker.
    css = without_preview_styles(css)
    css = without_palette_switcher_styles(css)
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    found = {normalize_hex_color(c) for c in re.findall(r'#[0-9a-fA-F]{3,8}\b', css)}
    if found != COLORS:
        errors.append(f'{label}: expected only all three brand colors, found {sorted(found)}')
    for fn, args in re.findall(r'\b(rgb|rgba|hsl|hsla)\(([^)]*)\)', css, re.I):
        try:
            values = [float(x.strip()) for x in args.split(',')]
            valid = fn.lower() in ('rgb', 'rgba') and tuple(values[:3]) in RGB_COLORS
            valid = valid and len(values) == (4 if fn.lower() == 'rgba' else 3)
            valid = valid and (len(values) == 3 or 0 <= values[3] <= 1)
        except ValueError:
            valid = False
        if not valid:
            errors.append(f'{label}: unsupported/non-brand color {fn}({args})')
    if re.search(r'\b(?:hwb|lab|lch|oklab|oklch|color)\s*\(', css, re.I):
        errors.append(f'{label}: unsupported color function')
    for declaration in re.findall(r'(?:^|[;{])\s*[-\w]+\s*:\s*([^;}]*)', css):
        value = re.sub(r'([\'"]).*?\1', '', declaration)
        value = re.sub(r'\b(?:var|url)\([^)]*\)', '', value, flags=re.I)
        named = set(re.findall(r'\b[a-zA-Z]+\b', value.lower())) & CSS_NAMED_COLORS
        if named:
            errors.append(f'{label}: named color outside explicit triad: {sorted(named)}')
    for mix in re.findall(r'color-mix\(([^;{}]+)', css, re.I):
        if 'transparent' not in mix.lower():
            errors.append(f'{label}: color-mix must vary opacity against transparent')


def require(text: str, values: tuple[str, ...], label: str, errors: list[str]) -> None:
    for value in values:
        if value.casefold() not in text.casefold():
            errors.append(f'{label}: missing {value!r}')


def verify_regimes(styles: dict[str, str], pages: dict[Path, DocumentParser], errors: list[str]) -> None:
    # Design-regime checks scan each variant's own CSS only; the shared dock and
    # palette-switcher chrome is governed by its own contracts below.
    styles = {
        variant: without_palette_switcher_styles(without_preview_styles(css))
        for variant, css in styles.items()
    }
    a = styles['a']
    require(a, ('system-ui',), 'A system-font baseline', errors)
    if re.search(r'@(?:font-face|import|keyframes)|\b(?:animation|transition)\s*:', a):
        errors.append('A: no custom fonts, animation, or transitions allowed')
    if re.search(r'scroll-behavior\s*:\s*smooth', a):
        errors.append('A: smooth scroll violates no-motion baseline')
    for radius in re.findall(r'border-radius\s*:\s*([^;}]+)', a):
        if radius.strip() not in ('0', '0px'):
            errors.append(f'A: nonrectangular radius {radius}')
    b = styles['b']
    require(b, ('prefers-color-scheme: dark', 'prefers-reduced-motion', 'border-radius'), 'B Taste 4/2/4', errors)
    if re.search(r'@keyframes|\banimation\s*:(?!\s*none\b)', b):
        errors.append('B: use restrained transitions only')
    for transition in re.findall(r'transition\s*:\s*([^;}]+)', b):
        for duration, unit in re.findall(r'([\d.]+)(ms|s)\b', transition):
            milliseconds = float(duration) * (1000 if unit == 's' else 1)
            if milliseconds > 200:
                errors.append(f'B: transition exceeds 200ms: {transition}')
    c = styles['c']
    require(c, ('fraunces', 'karla', '@keyframes', 'border-radius', 'scroll-snap-type', 'prefers-reduced-motion'), 'C Organic Biomorphic', errors)
    require((ROOT / 'variant-c.js').read_text(), ('IntersectionObserver', 'prefers-reduced-motion'), 'C progressive motion', errors)
    d = styles['d']
    require(d, ('inter', 'playfair display', 'jetbrains mono', 'prefers-reduced-motion', ':focus-visible'), 'D Accessible & Ethical', errors)
    for route in ('/', '/visit/', '/events/'):
        parser = pages.get((SITE / 'd' / ROUTES[route]).resolve())
        if parser and (not parser.tag_counts['table'] or not parser.tag_counts['caption']):
            errors.append(f'D {route}: semantic schedule table/caption required')
        if parser and any(not cell.get('scope') for cell in parser.element_attrs['th']):
            errors.append(f'D {route}: table headers require scope')
    e = styles['e']
    require(e, ('liberation sans narrow', 'source sans 3', 'prefers-reduced-motion', ':checked+label', ':focus-visible+label'), 'E Service-Time Compass', errors)
    for route, route_file in ROUTES.items():
        parser = pages.get((SITE / 'e' / route_file).resolve())
        if not parser:
            continue
        radios = [a for a in parser.element_attrs['input'] if a.get('type') == 'radio']
        if len(radios) != 4 or sum('checked' in a for a in radios) != 1:
            errors.append(f'E {route}: compass needs four native choices and one selection')
        if [a.get('value') for a in radios] != ['Sunday 9:00 AM', 'Sunday 10:00 AM', 'Sunday 6:00 PM', 'Wednesday 7:00 PM']:
            errors.append(f'E {route}: incorrect compass day/time values')
        label_ids = {a.get('for') for a in parser.element_attrs['label']}
        if any(a.get('id') not in label_ids for a in radios):
            errors.append(f'E {route}: compass choice missing associated label')
        if not any(a.get('role') == 'status' and a.get('aria-live') == 'polite' for a in parser.element_attrs['p']):
            errors.append(f'E {route}: compass selection announcement missing')
    for variant, css in styles.items():
        require(css, ('focus', '@media', '44px'), f'{variant} focus/mobile/target rules', errors)
    headings = {
        'a': ('Weekly service times', 'Start here', 'Truth does not move with the times.'),
        'b': ('Today at Faith Baptist', 'Plan the practical details', 'A local church in Fostoria', 'Our weekly rhythm'),
        'c': ('Weekly Rhythm', 'Growing Together', 'A Real Place', 'What We Believe'),
        'd': ('New Visitor Questions', 'Weekly Schedule', 'Confirmed Beliefs', 'Questions before you visit?'),
        'e': ('Service-Time Compass', 'A church in Fostoria', 'What we believe', 'Ministry rhythm'),
    }
    for variant, required in headings.items():
        home = pages.get((SITE / variant / 'index.html').resolve())
        if home:
            require(home.main_text, required, f'{variant} home fingerprint', errors)
            # Section sequence is part of the approved independent compositions.
            outline = ScheduleParser()
            outline.feed((SITE / variant / 'index.html').read_text())
            heading_text = [' '.join(' '.join(n['text']).split()).casefold() for n in outline.nodes if n['tag'] == 'h2']
            positions = [heading_text.index(h.casefold()) if h.casefold() in heading_text else -1 for h in required]
            if -1 in positions:
                errors.append(f'{variant}: required section heading missing')
            if positions != sorted(positions):
                errors.append(f'{variant}: home sections out of approved order')


class ScheduleParser(HTMLParser):
    """Read actual rendered grouping, not free-floating presence of time tokens."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.nodes = []

    def handle_starttag(self, tag, attrs):
        node = {"tag": tag, "attrs": dict(attrs), "text": [], "parent": self.stack[-1] if self.stack else None}
        self.nodes.append(node)
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]["tag"] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        for node in self.stack:
            node["text"].append(data)


def verify_schedule(html: str, variant: str, route: str, errors: list[str]) -> None:
    parser = ScheduleParser()
    parser.feed(html)
    def has_class(node, name):
        return node is not None and name in node["attrs"].get("class", "").split()
    def text(node):
        return " ".join(" ".join(node["text"]).split()).replace("’", "'").replace("&", "and")
    records = []
    for node in parser.nodes:
        parent = node["parent"]
        candidate = False
        if variant == 'a':
            candidate = has_class(node, 'schedule-row')
        elif variant == 'b':
            if route == '/':
                candidate = has_class(parent, 'sunday-plan') or (node['tag'] == 'p' and has_class(parent, 'today-band') and 'Wednesday' in text(node))
            elif route == '/visit/':
                candidate = node['tag'] == 'tr'
            else:
                candidate = node['tag'] == 'p' and parent is not None and has_class(parent['parent'], 'weekly-groups')
        elif variant == 'c':
            candidate = has_class(node, 'rhythm-stop') or has_class(node, 'schedule-row')
        elif variant == 'd':
            candidate = node['tag'] == 'tr' and parent is not None and parent['tag'] == 'tbody'
        elif variant == 'e':
            candidate = has_class(node, 'compass-detail')
        if not candidate:
            continue
        record = text(node)
        # Day headings may label the surrounding group rather than repeat per row.
        day_scope = node
        while day_scope:
            if has_class(day_scope, 'day-group') or (variant == 'b' and parent is not None and day_scope is parent and has_class(parent['parent'], 'weekly-groups')):
                record = text(day_scope).split(' ', 1)[0] + ' ' + record
                break
            day_scope = day_scope['parent']
        records.append(record)
    patterns = {
        'adult Sunday School': (r'sunday school(?!.*young children)', '9:00 AM', 'Sunday'),
        'main service': (r'main service|morning worship', '10:00 AM', 'Sunday'),
        'young children': (r"young children'?s sunday school", '10:00 AM', 'Sunday'),
        'evening service': (r'evening service', '6:00 PM', 'Sunday'),
        'prayer and Bible study': (r'prayer.*bible study', '7:00 PM', 'Wednesday'),
    }
    for name, (pattern, expected_time, expected_day) in patterns.items():
        matching = [r for r in records if re.search(pattern, r, re.I)]
        if name == 'adult Sunday School':
            matching = [r for r in matching if not re.search(r"young children'?s sunday school", r, re.I)]
        if not matching:
            errors.append(f'{variant} {route}: no schedule record for {name}')
        for record in matching:
            times = set(re.findall(r'\b\d{1,2}:\d{2} [AP]M\b', record))
            day = 'Wednesday' if 'Wednesday' in record else 'Sunday'
            if times != {expected_time} or day != expected_day:
                errors.append(f'{variant} {route}: {name} must be {expected_day} {expected_time}, found {record!r}')


DOCK_CSS_MARKER = "/* Floating comparison pill */"
EXPECTED_DOCK_ASSET_VERSION = "20260907-dock-v8-typography"
DOCK_HEX_COLORS = {"#252525", "#bdbdbd", "#bc2026", "#d7092e", "#082b73", "#e7a928", "#14222d", "#f7f8f5"}


class DockElement:
    def __init__(self, tag: str, attrs: dict[str, str | None]) -> None:
        self.tag = tag
        self.attrs = attrs
        self.classes = set((attrs.get("class") or "").split())
        self.children: list[DockElement] = []
        self.text_parts: list[str] = []

    @property
    def text(self) -> str:
        return " ".join(" ".join(self.text_parts).split())


class PreviewDockParser(HTMLParser):
    """Parse only comparison asides, preserving their element hierarchy and copy."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.docks: list[DockElement] = []
        self.stack: list[DockElement] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        element = DockElement(tag, dict(attrs))
        if not self.stack:
            if tag != "aside" or "preview-dock" not in element.classes:
                return
            self.docks.append(element)
        else:
            self.stack[-1].children.append(element)
        self.stack.append(element)

    def handle_endtag(self, tag: str) -> None:
        if self.stack and self.stack[-1].tag == tag:
            self.stack.pop()

    def handle_data(self, data: str) -> None:
        for element in self.stack:
            element.text_parts.append(data)


def preview_css_blocks(css: str) -> list[re.Match[str]]:
    """Only exempt selectors scoped to dock controls from variant visual rules."""
    # Callers may pass lowercased CSS (see main()), so match the marker insensitively.
    marker = css.lower().find(DOCK_CSS_MARKER.lower())
    if marker < 0:
        return []
    scope = re.compile(r"\.(?:preview-[\w-]+|palette-(?:option|original|logo))(?=[\s.:[#>+~]|$)")
    return [
        block for block in re.finditer(r"([^{}]+)\{([^{}]*)\}", css)
        if block.start() >= marker and all(
            scope.match(selector.strip()) for selector in block[1].split(",")
        )
    ]


def without_preview_styles(css: str) -> str:
    for block in reversed(preview_css_blocks(css)):
        css = css[:block.start()] + css[block.end():]
    return css


def palette_switcher_css_blocks(css: str) -> list[re.Match[str]]:
    """Scoped blocks for the Logo-palette token overrides and toggle chrome."""
    scope = re.compile(r"(body\[data-logo-palette\]|\.palette-toggle)(?=[\s.:[#>+~]|$)")
    blocks = []
    for block in re.finditer(r"([^{}]+)\{([^{}]*)\}", css):
        selectors = [selector.strip() for selector in block[1].split(",")]
        if any(scope.match(selector) for selector in selectors):
            blocks.append(block)
    return blocks


def without_palette_switcher_styles(css: str) -> str:
    for block in reversed(palette_switcher_css_blocks(css)):
        css = css[:block.start()] + css[block.end():]
    return css


def palette_css_rules(css: str) -> dict[str, dict[str, str]]:
    """Bounded declaration reader for selector->property->value lookups."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.DOTALL)
    rules: dict[str, dict[str, str]] = {}
    for selector_list, block in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        declarations = dict(
            (name.strip(), value.strip())
            for name, value in re.findall(r"([\w-]+)\s*:\s*([^;]+)", block)
        )
        for selector in selector_list.split(","):
            rules.setdefault(selector.strip(), {}).update(declarations)
    return rules


def verify_palette_switcher(errors: list[str]) -> None:
    """The Logo button must re-theme only through documented token overrides."""
    for variant in VARIANTS:
        css_path = ROOT / f"styles-{variant}.css"
        css = css_path.read_text(encoding="utf-8")
        if "body[data-logo-palette]" not in css:
            errors.append(f"{css_path.name} is missing the logo palette token override")
            continue
        blocks = palette_switcher_css_blocks(css)
        if not blocks:
            errors.append(f"{css_path.name} logo palette override must declare token values")
            continue
        switcher_css = "\n".join(block[0] for block in blocks)
        for literal in re.findall(r"#[0-9a-fA-F]{3,8}\b", switcher_css):
            if normalize_hex_color(literal) not in DOCK_HEX_COLORS:
                errors.append(f"{css_path.name} palette override uses non-contract color {literal}")
        if not palette_css_rules(css).get("body[data-logo-palette]", {}):
            errors.append(f"{css_path.name} logo palette override must declare token values")


def verify_preview_dock_contract(errors: list[str]) -> None:
    """Check slim pill geometry and route-preserving controls on all 30 pages."""
    from preview_dock import ASSET_VERSION

    if ASSET_VERSION != EXPECTED_DOCK_ASSET_VERSION:
        errors.append(f"preview dock asset version must be {EXPECTED_DOCK_ASSET_VERSION}; got {ASSET_VERSION}")
    designs = {
        "a": ("Plain Welcome", "https://faithbaptistchurch-a.sololink.cloud"),
        "b": ("Sunday Starts Here", "https://faithbaptistchurch-b.sololink.cloud"),
        "c": ("Rooted & Rising", "https://faithbaptistchurch-c.sololink.cloud"),
        "d": ("Accessible & Ethical", "https://faithbaptist-d.sololink.cloud"),
        "e": ("Service-Time Compass", "https://faithbaptist-e.sololink.cloud"),
    }
    pages_checked = 0
    shared_css = None
    for variant in VARIANTS:
        css_path = ROOT / f"styles-{variant}.css"
        css = css_path.read_text(encoding="utf-8")
        if css.count(DOCK_CSS_MARKER) != 1:
            errors.append(f"{css_path.name} must contain one floating pill style block")
        dock_css = css.partition(DOCK_CSS_MARKER)[2]
        if shared_css is None:
            shared_css = dock_css
        elif dock_css != shared_css:
            errors.append(f"{css_path.name} floating pill styles differ from the shared contract")
        if any(marker in css for marker in ("Minimal comparison dock overrides", "Persistent single-row comparison strip", ".preview-dock-panel", ".preview-dock-toggle")):
            errors.append(f"{css_path.name} retains obsolete comparison styles")
        rules = palette_css_rules(dock_css)
        required_styles = {
            "body": {"padding-bottom": "calc(64px + env(safe-area-inset-bottom)) !important"},
            ".preview-dock": {
                "position": "fixed", "width": "max-content", "height": "34px",
                "inset": "auto auto calc(16px + env(safe-area-inset-bottom)) 50%",
                "max-width": "calc(100% - 2 * max(16px, env(safe-area-inset-left), env(safe-area-inset-right)))",
                "transform": "translateX(-50%)", "border-radius": "999px",
                "background": "#252525", "color": "#FFFFFF",
                "box-sizing": "border-box", "padding": "0 8px",
                "border": "1px solid rgba(255,255,255,.2)",
                "font": "500 11px/1.2 system-ui, sans-serif",
            },
            ".preview-dock *": {
                "font": "inherit", "letter-spacing": "normal", "text-transform": "none",
            },
            ".preview-dock-scroll": {
                "display": "flex", "flex-wrap": "nowrap", "align-items": "center",
                "height": "100%", "padding": "2px 4px", "box-sizing": "border-box", "gap": "8px",
                "overflow-x": "auto", "overflow-y": "hidden",
                "overscroll-behavior-x": "contain", "white-space": "nowrap",
            },
            ".preview-designs": {"display": "flex", "flex": "0 0 auto", "flex-wrap": "nowrap"},
            ".preview-palette": {"display": "flex", "flex": "0 0 auto", "flex-wrap": "nowrap"},
            ".preview-group-label": {"color": "#BDBDBD", "font-size": "10px"},
            ".preview-dock-icon": {"flex": "0 0 12px", "width": "12px", "height": "12px"},
            ".preview-dock-divider": {"height": "16px"},
            ".palette-original .preview-palette-dot": {"background": "#B31942"},
            ".palette-logo .preview-palette-dot": {"background": "#082B73"},
        }
        for selector in (".preview-design", ".palette-option"):
            # A 34px border-box pill leaves 28px inside its border and scroll padding.
            # Keep the 28px internal chips fully inset without changing client targets.
            required_styles[selector] = {
                "min-width": "44px", "min-height": "28px", "height": "28px",
                "padding": "0 10px", "box-sizing": "border-box",
                "background": "transparent", "border": "0", "border-radius": "999px",
                "color": "#FFFFFF",
            }
        for selector in (".preview-design:hover", ".palette-option:hover"):
            required_styles[selector] = {"background": "rgba(255,255,255,.12)", "color": "#FFFFFF"}
        for selector in (".preview-design.is-active", '.palette-option[aria-pressed="true"]'):
            required_styles[selector] = {"background": "#BC2026", "color": "#FFFFFF"}
        for selector in (".preview-dock a:focus-visible", ".preview-dock button:focus-visible"):
            required_styles[selector] = {"outline": "2px solid #BC2026", "outline-offset": "-3px"}
        for selector, declarations in required_styles.items():
            for name, value in declarations.items():
                if rules.get(selector, {}).get(name) != value:
                    errors.append(f"{css_path.name} pill {selector} must set {name}: {value}")
        reduced = re.search(r"@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{(.*)\}\s*$", dock_css, flags=re.DOTALL)
        reduced_rules = palette_css_rules(reduced[1]) if reduced else {}
        for selector, property_name, value in (
            (".preview-dock-scroll", "scroll-behavior", "auto !important"),
            (".preview-design", "transition", "none !important"),
            (".palette-option", "transition", "none !important"),
        ):
            if reduced_rules.get(selector, {}).get(property_name) != value:
                errors.append(f"{css_path.name} pill must honor reduced motion for {selector}")
        for route, route_file in ROUTES.items():
            page = SITE / variant / route_file
            if not page.is_file():
                continue
            label = str(page.relative_to(ROOT))
            html = page.read_text(encoding="utf-8")
            parser = PreviewDockParser()
            parser.feed(html)
            if len(parser.docks) != 1:
                errors.append(f"{label} must contain exactly one floating comparison pill")
                continue
            dock = parser.docks[0]
            pages_checked += 1
            if dock.attrs.get("aria-label") != "Faith Baptist preview comparison":
                errors.append(f"{label} pill is missing its accessible label")
            if len(dock.children) != 1 or "preview-dock-scroll" not in dock.children[0].classes:
                errors.append(f"{label} pill must have one shared horizontal scroll wrapper")
                continue
            scroll = dock.children[0]
            if scroll.tag != "div" or len(scroll.children) != 3:
                errors.append(f"{label} pill must contain variant navigation, divider, and palette group")
                continue
            nav, divider, palette = scroll.children
            if nav.tag != "nav" or "preview-designs" not in nav.classes or nav.attrs.get("aria-label") != "Preview designs":
                errors.append(f"{label} pill is missing accessible design navigation")
            if divider.tag != "span" or "preview-dock-divider" not in divider.classes or divider.attrs.get("aria-hidden") != "true":
                errors.append(f"{label} pill is missing its decorative divider")
            if palette.tag != "div" or "preview-palette" not in palette.classes or palette.attrs.get("role") != "group" or palette.attrs.get("aria-label") != "Color palette":
                errors.append(f"{label} pill is missing its accessible palette group")
            for group, text, icon_class in ((nav, "VARIANT:", "preview-layers-icon"), (palette, "PALETTE:", "preview-palette-icon")):
                if not group.children:
                    errors.append(f"{label} pill is missing {text} label")
                    continue
                heading = group.children[0]
                if heading.tag != "span" or "preview-group-label" not in heading.classes or heading.text != text:
                    errors.append(f"{label} pill must label its group {text}")
                icons = [child for child in heading.children if child.tag == "svg"]
                if len(icons) != 1 or not {"preview-dock-icon", icon_class}.issubset(icons[0].classes) or icons[0].attrs.get("aria-hidden") != "true" or icons[0].attrs.get("focusable") != "false":
                    errors.append(f"{label} {text} must have one decorative {icon_class}")
            links = nav.children[1:]
            if len(links) != 5:
                errors.append(f"{label} pill must contain five design links")
            for link, (key, (name, domain)) in zip(links, designs.items()):
                code = key.upper()
                if link.tag != "a" or "preview-design" not in link.classes or link.attrs.get("href") != domain + route:
                    errors.append(f"{label} Design {code} must preserve route {route} on its exact preview domain")
                if link.attrs.get("aria-label") != f"Design {code}: {name}" or link.text != f"{code} ({name})":
                    errors.append(f"{label} Design {code} must expose its code and parenthesized client-safe name")
                if len(link.children) != 2 or link.children[0].tag != "span" or "preview-design-code" not in link.children[0].classes or link.children[0].text != code or link.children[1].tag != "strong" or link.children[1].text != f"({name})":
                    errors.append(f"{label} Design {code} has incorrect chip anatomy")
                if (link.attrs.get("aria-current") == "page") != (key == variant) or ("is-active" in link.classes) != (key == variant) or (key != variant and "aria-current" in link.attrs):
                    errors.append(f"{label} must mark only Design {variant.upper()} active with aria-current=page")
            buttons = palette.children[1:]
            if len(buttons) != 2:
                errors.append(f"{label} pill must contain two palette buttons")
            for button, value in zip(buttons, ("original", "logo")):
                expected_pressed = "true" if value == "original" else "false"
                if button.tag != "button" or not {"palette-option", f"palette-{value}"}.issubset(button.classes) or button.attrs.get("type") != "button" or button.attrs.get("data-palette") != value or button.attrs.get("aria-pressed") != expected_pressed or button.text != value.title():
                    errors.append(f"{label} {value} palette button has incorrect label or initial toggle state")
                if len(button.children) != 1 or button.children[0].tag != "span" or "preview-palette-dot" not in button.children[0].classes or button.children[0].attrs.get("aria-hidden") != "true":
                    errors.append(f"{label} {value} palette button is missing its decorative color dot")
            for obsolete in ("preview-dock-panel", "preview-dock-toggle"):
                if obsolete in html:
                    errors.append(f"{label} contains the removed {obsolete}")
            if f'href="/styles.css?v={ASSET_VERSION}"' not in html:
                errors.append(f"{label} must use current dock stylesheet version {ASSET_VERSION}")
            for script_contract in (
                "window.localStorage.getItem('faith-baptist-palette')",
                "window.localStorage.setItem('faith-baptist-palette', palette)",
                "setPalette(stored === 'logo' ? 'logo' : 'original')",
                "setAttribute('aria-pressed', String(option.dataset.palette === palette))",
                "document.body.setAttribute('data-logo-palette', '')",
                "document.body.removeAttribute('data-logo-palette')",
            ):
                if script_contract not in html:
                    errors.append(f"{label} palette script is missing {script_contract}")
    if pages_checked != 30:
        errors.append(f"floating comparison pill coverage is {pages_checked} pages; expected 30 (A-E x six routes)")


def main() -> int:
    errors: list[str] = []
    expected = {(SITE / v / p).resolve() for v in VARIANTS for p in ROUTES.values()}
    actual = {p.resolve() for p in SITE.glob('*/**/*.html')}
    if actual != expected:
        errors.append(f'route inventory mismatch: {len(expected - actual)} missing, {len(actual - expected)} extra')
    pages: dict[Path, DocumentParser] = {}
    styles: dict[str, str] = {}
    for variant in VARIANTS:
        root = (SITE / variant).resolve()
        css_path = ROOT / f'styles-{variant}.css'
        css = css_path.read_text()
        styles[variant] = css.lower()
        verify_colors(css, css_path.name, errors)
        if not (root / 'styles.css').is_file() or (root / 'styles.css').read_bytes() != css_path.read_bytes():
            errors.append(f'{variant}: generated CSS differs from source')
        for reference in re.findall(r'url\([\'"]?([^\)\'\"]+)', css):
            if urlsplit(reference).scheme:
                continue
            target = root / reference.lstrip('/')
            source = ROOT / reference.lstrip('/')
            if not target.is_file() or not source.is_file() or target.read_bytes() != source.read_bytes():
                errors.append(f'{variant}: missing/different bundled CSS asset {reference}')
        used_images: set[str] = set()
        titles: set[str] = set()
        for route, relative in ROUTES.items():
            path = (root / relative).resolve()
            if not path.is_file():
                continue
            html = path.read_text()
            parser = parse_document(path)
            pages[path] = parser
            text = public_text(html)
            label = f'{variant} {route}'
            require(text, (NAME, ADDRESS), label, errors)
            if not re.search(r'\(419\) 348-2171|419-348-2171', text):
                errors.append(f'{label}: verified phone missing')
            if BANNED.search(text) or REPORT_COPY.search(text):
                match = BANNED.search(text) or REPORT_COPY.search(text)
                errors.append(f'{label}: rejected public copy {match.group()!r}')
            for attrs in parser.element_attrs['meta']:
                if attrs.get('name') == 'description' and (BANNED.search(attrs.get('content') or '') or REPORT_COPY.search(attrs.get('content') or '')):
                    errors.append(f'{label}: internal language in meta description')
            tokens = {t.strip() for r in parser.robots for t in r.split(',')}
            if not {'noindex', 'nofollow'} <= tokens:
                errors.append(f'{label}: noindex,nofollow missing')
            if parser.html_lang != 'en' or parser.tag_counts['main'] != 1 or parser.tag_counts['h1'] != 1:
                errors.append(f'{label}: lang/one main/one h1 contract failed')
            if not parser.title or parser.title in titles:
                errors.append(f'{label}: title missing/duplicated')
            titles.add(parser.title)
            if parser.tag_counts['form'] or parser.tag_counts['iframe'] or parser.tag_counts['video'] or parser.tag_counts['audio']:
                errors.append(f'{label}: unsupported form/embed/media')
            links = {a.get('href') for a in parser.anchors}
            if not set(ROUTES) <= links or PHONE_TEL not in links or '#main' not in links:
                errors.append(f'{label}: route/phone/skip link missing')
            if not any(a.get('aria-current') == 'page' and a.get('href') == route for a in parser.anchors):
                errors.append(f'{label}: active route announcement missing')
            if not any(a.get('id') == 'main' and a.get('tabindex') == '-1' for a in parser.element_attrs['main']):
                errors.append(f'{label}: skip target must be programmatically focusable')
            maps = [link for link in links if link and urlsplit(link).hostname == 'www.google.com']
            if not maps or any(parse_qs(urlsplit(link).query).get('destination') != [ADDRESS] for link in maps):
                errors.append(f'{label}: exact directions destination missing/wrong')
            raw_ids = [a['id'] for elements in parser.element_attrs.values() for a in elements if a.get('id')]
            if len(raw_ids) != len(set(raw_ids)):
                errors.append(f'{label}: duplicate element id')
            for img in parser.images:
                filename = Path(img.get('src') or '').name
                item = RASTERS.get(filename)
                if not item or img.get('alt') != item['alt']:
                    errors.append(f'{label}: unapproved raster or changed exact alt: {filename}')
                    continue
                used_images.add(filename)
                dimensions = item['original_dimensions']
                if img.get('width') != str(dimensions['width']) or img.get('height') != str(dimensions['height']):
                    errors.append(f'{label}: raster intrinsic dimensions missing/wrong: {filename}')
            for attribute, reference in parser.references:
                parsed = urlsplit(reference)
                if parsed.scheme or parsed.netloc:
                    continue
                target, fragment = local_target(root, path, reference)
                if not target.is_relative_to(root) or not target.is_file():
                    errors.append(f'{label}: broken/escaping {attribute}: {reference}')
                elif fragment and target.suffix == '.html' and fragment not in parse_document(target).ids:
                    errors.append(f'{label}: missing fragment {reference}')
            if route == '/':
                require(text.replace('’', "'"), (IDENTITY, 'Plan Your Visit'), label, errors)
            if route in ('/', '/visit/', '/events/'):
                verify_schedule(html, variant, route, errors)
                require(parser.main_text, ('Sunday', '9:00 AM', '10:00 AM', '6:00 PM', 'Wednesday', '7:00 PM', 'nursery'), label, errors)
            if route == '/ministries/':
                require(parser.main_text, ('adults', 'teens', 'children', 'nursery', 'Wednesday'), label, errors)
            if route == '/beliefs/':
                require(parser.main_text, ('Bible', 'gospel', 'KJV'), label, errors)
        if used_images != set(RASTERS):
            errors.append(f'{variant}: all four client rasters must be used across the routes')
        for filename, item in RASTERS.items():
            for asset in (ROOT / 'assets' / filename, root / 'assets' / filename):
                if not asset.is_file() or sha256(asset) != item['sha256']:
                    errors.append(f'{asset}: source raster bytes changed/missing')
                elif image_size(asset) != (item['original_dimensions']['width'], item['original_dimensions']['height']):
                    errors.append(f'{asset}: source raster dimensions changed')
        for filename, digest in MEDIA['fonts'].items():
            source = ROOT / 'assets/fonts' / filename
            if not source.is_file() or sha256(source) != digest:
                errors.append(f'font changed from verified source: {filename}')
        if variant == 'b':
            nginx = root / 'nginx.conf'
            if not nginx.is_file() or nginx.read_bytes() != (ROOT / 'nginx-b.conf').read_bytes() or 'X-Robots-Tag "noindex, nofollow" always' not in nginx.read_text():
                errors.append('B nginx noindex header/source parity missing')
    for variant, filename in (('c', 'variant-c.js'), ('e', 'compass.js')):
        if (SITE / variant / filename).read_bytes() != (ROOT / filename).read_bytes():
            errors.append(f'{variant}: generated script differs from source')
    verify_regimes(styles, pages, errors)
    verify_preview_dock_contract(errors)
    verify_palette_switcher(errors)
    for first, second in itertools.combinations(VARIANTS, 2):
        if styles[first] == styles[second]:
            errors.append(f'{first}/{second}: identical styles')
        for route_file in ROUTES.values():
            a, b = (SITE / first / route_file).resolve(), (SITE / second / route_file).resolve()
            if a in pages and b in pages and pages[a].class_counts == pages[b].class_counts:
                errors.append(f'{first}/{second} {route_file}: identical composition fingerprint')
    # Actual ratios, not an inference from color names. Opacity/layout needs browser QA.
    def luminance(rgb):
        channels = [c / 255 for c in rgb]
        linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in channels]
        return sum(c * w for c, w in zip(linear, (.2126, .7152, .0722)))
    for color in ((179, 25, 66), (10, 49, 97)):
        if 1.05 / (luminance(color) + .05) < 4.5:
            errors.append(f'brand/white body contrast failed: {color}')
    if errors:
        print('Verification failed:')
        print('\n'.join(f'- {error}' for error in errors))
        return 1
    print('Verified 30 pages + preview dock: route/copy/identity/noindex/link contracts, exact raster alts and bytes, bundled assets, triad colors, five regime structures and 10/10 different static fingerprint pairs on every route. Static checks only; visual uniqueness, browser accessibility, mobile layout, font loading and live HTTPS remain separate QA.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
