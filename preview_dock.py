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
    return f'''<aside class="preview-dock" aria-label="Faith Baptist preview comparison">
  <div class="preview-dock-heading"><span class="preview-dock-kicker">Compare designs</span><span class="preview-dock-route">{route}</span></div>
  <div class="preview-designs" role="navigation" aria-label="Preview designs">{designs}</div>
  <div class="preview-palette" role="group" aria-label="Color palette">
    <span>Palette</span>
    <button class="palette-toggle" type="button" aria-pressed="false" aria-label="Use Faith Baptist logo colors">Use logo colors</button>
  </div>
</aside>'''


PALETTE_SCRIPT = '''<script>
(() => {
  const button = document.querySelector('.palette-toggle');
  if (!button) return;
  const setPalette = (enabled) => {
    // toggleAttribute('data-logo-palette') is the palette token contract.
    if (enabled) document.body.setAttribute('data-logo-palette', '');
    else document.body.removeAttribute('data-logo-palette');
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? 'Use original colors' : 'Use logo colors';
    button.setAttribute('aria-label', enabled ? 'Use this variant’s original colors' : 'Use Faith Baptist logo colors');
  };
  setPalette(window.localStorage.getItem('faith-baptist-palette') === 'logo');
  button.addEventListener('click', () => {
    const enabled = !document.body.hasAttribute('data-logo-palette');
    window.localStorage.setItem('faith-baptist-palette', enabled ? 'logo' : 'original');
    setPalette(enabled);
  });
})();
</script>'''
