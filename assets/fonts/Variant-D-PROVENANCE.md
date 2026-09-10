# Variant D font provenance

Inter Latin was copied without modification from VitePress 1.6.4's bundled `dist/client/theme-default/fonts/inter-roman-latin.woff2` in the existing local Jenkins `codex_mobile-web-parity-20260827` dependency tree. The included SIL Open Font License is from the existing `@expo-google-fonts/inter` 0.4.2 package (`LICENSE_FONT`), naming Inter Project Authors.

JetBrains Mono Bold was copied without modification from the existing Hermes `web/public/fonts-terminal/JetBrainsMono-Bold.woff2`. Its SIL Open Font License was copied from the existing UI/UX Pro Max `canvas-fonts/JetBrainsMono-OFL.txt`.

- `Inter-Latin.woff2` — SHA-256 `f7ab715caa2c78facb4334b211c81ee66f037cf9c99ca3f24acd543e84a93278`.
- `JetBrainsMono-Bold.woff2` — SHA-256 `08863c7964612257a90bd821e3127dc5ccb0b5046f881673a1ade5809eb21d0f`.

Playfair Display remains the pre-existing Google Fonts italic import with Georgia as its serif fallback. No Playfair Display binary was found in the local workspace or host font inventories. Network font retrieval was unavailable in this environment, so local Playfair loading is not claimed. Font rendering must be checked in a browser with access to the font service before release.
