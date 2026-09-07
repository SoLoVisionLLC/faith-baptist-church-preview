"""Shared preview comparison dock contract for all Faith Baptist variants."""

from html import escape

VARIANT_DOMAINS = {
    "a": "https://faithbaptistchurch-a.sololink.cloud",
    "b": "https://faithbaptistchurch-b.sololink.cloud",
    "c": "https://faithbaptistchurch-c.sololink.cloud",
    "d": "https://faithbaptist-d.sololink.cloud",
    "e": "https://faithbaptist-e.sololink.cloud",
}
VARIANT_NAMES = {
    "a": ("A", "Plain Welcome"),
    "b": ("B", "Sunday Starts Here"),
    "c": ("C", "Rooted & Rising"),
    "d": ("D", "Accessible & Ethical"),
    "e": ("E", "Service-Time Compass"),
}
ASSET_VERSION = "20260907-dock-v5"


def preview_dock(variant, slug):
    """Render the floating, route-preserving comparison pill."""
    route = "/" if not slug else f"/{slug}/"
    design_items = []
    for key, domain in VARIANT_DOMAINS.items():
        code, name = VARIANT_NAMES[key]
        active = " is-active" if key == variant else ""
        current = ' aria-current="page"' if key == variant else ""
        label = escape(f"Design {code}: {name}", quote=True)
        design_items.append(
            f'<a class="preview-design{active}" href="{domain}{route}"{current} '
            f'title="{label}" aria-label="{label}">'
            f'<span class="preview-design-code" aria-hidden="true">{code}</span>'
            f'<strong>({escape(name)})</strong></a>'
        )
    designs = "".join(design_items)
    return f'''<aside class="preview-dock" aria-label="Faith Baptist preview comparison">
  <div class="preview-dock-scroll">
    <nav class="preview-designs" aria-label="Preview designs">
      <span class="preview-group-label"><svg class="preview-dock-icon preview-layers-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>VARIANT:</span>
      {designs}
    </nav>
    <span class="preview-dock-divider" aria-hidden="true"></span>
    <div class="preview-palette" role="group" aria-label="Color palette">
      <span class="preview-group-label"><svg class="preview-dock-icon preview-palette-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.4-3H18a3 3 0 0 0 3-3A8.8 8.8 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="11" cy="7" r=".8"/><circle cx="15.5" cy="8" r=".8"/></svg>PALETTE:</span>
      <button class="palette-option palette-original" type="button" aria-pressed="true" data-palette="original"><span class="preview-palette-dot" aria-hidden="true"></span>Original</button>
      <button class="palette-option palette-logo" type="button" aria-pressed="false" data-palette="logo"><span class="preview-palette-dot" aria-hidden="true"></span>Logo</button>
    </div>
  </div>
</aside>'''


PALETTE_SCRIPT = '''<script>
(() => {
  const options = document.querySelectorAll('[data-palette]');
  if (!options.length) return;
  const setPalette = (palette) => {
    const enabled = palette === 'logo';
    if (enabled) document.body.setAttribute('data-logo-palette', '');
    else document.body.removeAttribute('data-logo-palette');
    options.forEach((option) => option.setAttribute('aria-pressed', String(option.dataset.palette === palette)));
  };
  const stored = window.localStorage.getItem('faith-baptist-palette');
  setPalette(stored === 'logo' ? 'logo' : 'original');
  options.forEach((option) => option.addEventListener('click', () => {
    const palette = option.dataset.palette === 'logo' ? 'logo' : 'original';
    window.localStorage.setItem('faith-baptist-palette', palette);
    setPalette(palette);
  }));
})();
</script>'''
