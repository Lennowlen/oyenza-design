# Oyenza design system

One system, three surfaces: catat on the web, Oyen Island on Android, Oyenza
Studio on Windows and Mac. This document is the rules; `tokens.json` is the
values; `tools/gen.mjs` writes them into each app.

## 1. One source of values

Every colour, radius, space step, type size and motion curve lives in
`tokens.json`. An app never holds a hex of its own — it holds the name the
generator gave it:

- web: `var(--oy-app-ink)`
- Android: `OyenTokens.APP_INK`
- Studio: `oyenza_tokens::APP_INK`

If a value is wrong, it is wrong in one file and right everywhere after
`node tools/gen.mjs`. If a value is needed and missing, it is added to
`tokens.json`, not typed into a screen.

## 2. The palette

**Brand** — Oyen's orange `#f0892e`, its fold shade `#c9581a`, the cream paper
`#fff1de`, the espresso ink `#2b1b10`. These are the brand; nothing else may
take the orange's place.

**Island** — the four looks both apps show: Classic (black notch), Oyen (cream
paper), Glass (frosted over the screen), Pill (black capsule below the edge).
Each is one object: ground, ink, accent, border, wash, `light`, `floating`.
The phone and the desktop must agree on all of them; `tools/check.mjs --apps`
fails when they do not.

**App** — the surface behind the island: `canvas`, `sheet`, `tile`, `ink`,
`ink-2`, `muted`, `line`, plus seven tints (blue, peach, mint, lilac, cream,
sky, grey) and the interactive pair `fill` / `on-fill`.

Rules:

- One accent. Orange marks what can be touched or what needs attention;
  everything else is ink, grey or a tint.
- Tints carry categories by hue, never by text colour: the label stays `ink`.
- `fill` is the colour of a filled button, `on-fill` the colour of its label.
  They are a pair; never mix `accent` with `on-fill`. This pair exists because
  the vivid orange does not carry white text: `#ffffff` on `#f0812b` is
  2.66:1, under the 4.5:1 a label needs.
- Dark mode is the same set with `data-theme="dark"` on the root (web) or the
  dark values in the generated constants. It is defined in the tokens and not
  yet used by any screen.

## 3. Type

`display` 28, `title` 20, `body` 15, `small` 13, `micro` 11. Five sizes, no
more: a screen that needs a sixth is a screen with a hierarchy problem.

Web and Android use the system face (`font-text`). Display headings and the
island use Outfit (`font-display`) where it is already shipped. No new font is
added for a single screen.

## 4. Space, radius, touch

Space steps are 4, 8, 12, 16, 20, 24, 32, 40 — nothing between them. Radius:
10 (small marks), 16 (rows, inputs), 24 (cards, sheets), 28 (the phone frame),
999 (capsules). Touch targets are at least 44×44: a 24 px icon sits in a 44 px
button, it does not become a 24 px button.

## 5. Motion

Three durations: 120 ms for a state change under the finger, 180 ms for
something appearing, 320 ms for a sheet or a page. Three curves: `ease`,
`ease-out` for things arriving, `spring` for something that should feel alive.

The budget matters more than the curves (Studio's rule, and it applies to all
three surfaces): **nothing moves at rest.** Motion happens because a person
acted or because a page is open and someone is watching it. When the screen is
locked, the display is off or the battery saver is on, animation stops. Oyen's
mascot may breathe while the island is open; it may not cost a frame while the
island sits idle.

## 6. Words and labels

No emoji in UI, in labels or in the copy a screen shows. A symbol that carries
meaning is drawn, not typed: an icon, a shape, a mark. This is the owner's
standing preference and it is not a per-screen decision.

Labels are short and concrete ("Tutup hari", "Scan 30 hari"), never a sentence
that explains the button. The explanation, when needed, sits under it in
`small` and `muted`.

## 7. Adding a screen

1. Pick the tokens you need from the set; do not add a colour for one screen.
2. Build the layout from space and radius steps, not from invented pixels.
3. Check the text you wrote against `sheet` and `canvas` — 4.5:1 for body,
   3:1 for secondary.
4. Check the touch targets are 44.
5. If the screen needs a value the system does not have, add it to
   `tokens.json` first, regenerate, then use it. That is the only way the three
   apps stay one system.

## 8. Platform notes

- **Web** — `tokens.css` is imported before the app's own CSS; the app's old
  variable names are aliases pointing at `--oy-*`, so old rules keep working
  while the values come from one place.
- **Android** — `OyenzaTokens.kt` is copied into `id.oyenza.core`;
  `DioramaTheme` reads its four looks from it. The island itself is drawn by
  hand, so aspect, neck height and the status-bar strip stay its own business
  (see the island's own notes) — the system only owns colour.
- **Studio** — the Rust constants are generated but the app still holds its
  literals in `look.rs`; wiring them is an upstream change and follows its
  release rules. Until then Studio and the phone are kept honest by the drift
  check, which compares the colours both actually paint.
