# Oyenza design tokens

One palette for every Oyenza surface:

| Surface | Repo | Reads |
|---|---|---|
| catat web app | `Lennowlen/oyenza-catat-rebuild` (`web/src/tokens.css`) | CSS custom properties |
| Oyen Island (Android) | `Lennowlen/oyen-android` (`core/OyenzaTokens.kt`) | Kotlin constants |
| Oyenza Studio (Windows/Mac island) | `oyenza-studio` (`crates/poni-core/src/oyenza_tokens.rs`) | Rust constants |

`tokens.json` is the only place a colour, radius, spacing step, type size or
motion curve is written down. The three files in `dist/` are generated from it
and copied into the apps. No app keeps a hex of its own.

## Change a token

```bash
# 1. edit tokens.json
node tools/gen.mjs                                    # writes dist/
node tools/check.mjs --apps ~/oyen-android ~/repo-vm/work/oyenza-studio
# 2. copy the file each app needs
cp dist/tokens.css        ../catat-rebuild/web/src/tokens.css
cp dist/OyenzaTokens.kt   ~/oyen-android/app/src/main/java/id/oyenza/core/OyenzaTokens.kt
# 3. commit in each app repo, rebuild the app
```

`node tools/check.mjs` without `--apps` checks the token set alone. With
`--apps` it also reads the island colours the desktop and the phone paint with
right now and fails when `tokens.json` disagrees, so "the same island on both"
is measured rather than claimed.

## What the checks prove

- **Determinism** — the same `tokens.json` always renders the same bytes.
- **Coverage** — every colour in the set reaches every file that needs it.
- **Contrast** — WCAG 2.1 ratio for each pair that carries words: body text
  4.5:1, secondary text 3:1. This is what caught the old accent button: white
  on `#f0812b` is 2.66:1, so filled buttons now use `fill`/`on-fill`
  (5.27:1 light, 7.34:1 dark) and the vivid orange stays for decoration.
- **No drift** — 12 island colours on Android plus Oyen's ground and ink on the
  desktop equal the values in `tokens.json`.

## Files

- `tokens.json` — the set. `brand`, `island` (four looks), `app` (light and
  dark), `radius`, `space`, `type`, `motion`, `elevation`, `touch`.
- `tools/gen.mjs` — validates and renders `dist/`. `--check` fails when `dist/`
  is stale.
- `tools/check.mjs` — determinism, coverage, contrast, drift.
- `dist/tokens.css` — `:root`, `[data-theme="dark"]`, `[data-island="…"]`.
- `dist/OyenzaTokens.kt` — `object OyenzaTokens` for `id.oyenza.core`.
- `dist/oyenza_tokens.rs` — `u32` ARGB constants for `poni_core`.

## Adoption

| Surface | State |
|---|---|
| catat web | **adopted** — `app.css` has no colour of its own; its 17 old variables resolve to the same values through the shared tokens. |
| Oyen Island | **wired** — `DioramaTheme` builds its four looks from `OyenzaTokens`; all 12 colour values are unchanged. |
| Oyenza Studio | **generated, not wired** — `dist/oyenza_tokens.rs` exists; `look.rs` still holds its literals. Wiring it is a change in the upstream app repo and goes with its own release. |

Android builds and Studio builds are not run here (no Android SDK, no cargo on
this machine). The Kotlin was compiled against a stub `android.graphics.Color`
and the four looks were executed: every ground, accent, border and wash came out
identical to the values they replaced.
