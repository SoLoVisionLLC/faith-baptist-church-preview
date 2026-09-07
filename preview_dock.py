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


def preview_dock(variant, slug):
    """Render the route-preserving comparison dock for a variant and route."""
    route = "/" if not slug else f"/{slug}/"
    design_items = []
    for key, domain in VARIANT_DOMAINS.items():
        code, name = VARIANT_NAMES[key]
        active = " is-active" if key == variant else ""
        current = ' aria-current="location"' if key == variant else ""
        design_items.append(
            f'<a class="preview-design{active}" href="{domain}{route}"{current} '
            f'aria-label="Design {code}: {name}"><span>{code}</span><strong>{name}</strong></a>'
        )
    designs = "".join(design_items)
    return f'''<aside class="preview-dock" aria-label="Faith Baptist design comparison">
  <div class="preview-dock-bar"><span class="preview-dock-kicker">Compare</span><span class="preview-dock-context">Current page</span><button class="preview-dock-toggle" type="button" aria-expanded="false" aria-controls="preview-dock-panel">Open design comparison</button></div>
  <div class="preview-dock-panel" id="preview-dock-panel"><nav class="preview-designs" aria-label="Designs">{designs}</nav><div class="preview-palette" role="group" aria-label="Palette"><span class="preview-palette-label">Palette</span><button class="palette-option palette-original" type="button" aria-pressed="true" data-palette="original">Original</button><button class="palette-option palette-logo" type="button" aria-pressed="false" data-palette="logo">Logo</button></div></div>
</aside>'''


PALETTE_SCRIPT = '''<script>
(() => {
  const dock = document.querySelector('.preview-dock');
  const toggle = document.querySelector('.preview-dock-toggle');
  const options = document.querySelectorAll('[data-palette]');
  if (!dock || !toggle || !options.length) return;
  toggle.addEventListener('click', () => {
    const open = dock.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close design comparison' : 'Open design comparison';
  });
  const setPalette = (palette) => {
    const enabled = palette === 'logo';
    if (enabled) document.body.setAttribute('data-logo-palette', '');
    else document.body.removeAttribute('data-logo-palette');
    options.forEach((option) => option.setAttribute('aria-pressed', String(option.dataset.palette === palette)));
  };
  setPalette(window.localStorage.getItem('faith-baptist-palette') === 'logo' ? 'logo' : 'original');
  options.forEach((option) => option.addEventListener('click', () => {
    const palette = option.dataset.palette === 'logo' ? 'logo' : 'original';
    window.localStorage.setItem('faith-baptist-palette', palette);
    setPalette(palette);
  }));
})();
</script>'''
