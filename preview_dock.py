"""Shared preview comparison dock contract for all Faith Baptist variants."""

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
ASSET_VERSION = "20260907-dock-v4"


def preview_dock(variant, slug):
    """Render the persistent route-preserving comparison strip."""
    route = "/" if not slug else f"/{slug}/"
    design_items = []
    for key, domain in VARIANT_DOMAINS.items():
        code, name = VARIANT_NAMES[key]
        active = " is-active" if key == variant else ""
        current = ' aria-current="page"' if key == variant else ""
        design_items.append(
            f'<a class="preview-design{active}" href="{domain}{route}"{current} '
            f'title="Design {code}: {name}" aria-label="Design {code}: {name}">'
            f'<span aria-hidden="true">{code}</span><strong>{name}</strong></a>'
        )
    designs = "".join(design_items)
    return f'''<aside class="preview-dock" aria-label="Faith Baptist preview comparison">
  <nav class="preview-designs" aria-label="Preview designs">{designs}</nav>
  <span class="preview-dock-divider" aria-hidden="true"></span>
  <div class="preview-palette" role="group" aria-label="Color palette">
    <button class="palette-option palette-original" type="button" aria-pressed="true" data-palette="original">Original</button>
    <button class="palette-option palette-logo" type="button" aria-pressed="false" data-palette="logo">Logo</button>
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
