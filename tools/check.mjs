#!/usr/bin/env node
/**
 * Proves the token set before anything ships:
 *
 *   node tools/check.mjs                       determinism, coverage, contrast
 *   node tools/check.mjs --apps <dir> <dir>    also: no drift against the apps
 *
 * --apps takes the oyen-android checkout and the oyenza-studio checkout. The
 * drift check reads the island colours those two already paint with and fails
 * when tokens.json disagrees, so a "one system" claim is measured, not
 * asserted.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { build, render, kotlinInt, rustInt } from './gen.mjs';

let failures = 0;
const pass = (what, detail = '') => console.log(`ok   ${what}${detail ? ` — ${detail}` : ''}`);
const fail = (what, detail = '') => {
  failures += 1;
  console.log(`FAIL ${what}${detail ? ` — ${detail}` : ''}`);
};
const eq = (what, got, want) => (got === want ? pass(what, `${got}`) : fail(what, `got ${got}, want ${want}`));

const tokens = JSON.parse(readFileSync(new URL('../tokens.json', import.meta.url), 'utf8'));
const files = build();

// 1. The same input always gives the same bytes.
const again = render(tokens);
for (const name of Object.keys(files)) {
  eq(`deterministic: ${name}`, again[name], files[name]);
}

// 2. Every platform file carries every colour it needs.
const css = files['tokens.css'];
const kt = files['OyenzaTokens.kt'];
const rs = files['oyenza_tokens.rs'];

for (const [name, color] of Object.entries(tokens.app.light)) {
  const v = name.replace(/[^a-zA-Z0-9]+/g, '-');
  if (!css.includes(`--oy-app-${v}: ${color};`)) fail(`css carries app.light.${name}`);
}
for (const [name, color] of Object.entries(tokens.app.dark)) {
  const v = name.replace(/[^a-zA-Z0-9]+/g, '-');
  if (!css.includes(`--oy-app-${v}: ${color};`)) fail(`css carries app.dark.${name}`);
}
pass('css carries every app colour (light and dark)');

for (const [id, look] of Object.entries(tokens.island)) {
  const up = id.toUpperCase();
  for (const key of ['ground', 'ink', 'accent', 'border', 'wash']) {
    if (!kt.includes(kotlinInt(look[key]))) fail(`kotlin carries island.${id}.${key}`);
    if (!rs.includes(rustInt(look[key]))) fail(`rust carries island.${id}.${key}`);
  }
}
pass('kotlin and rust carry every island colour');

for (const group of ['radius', 'space']) {
  for (const [name, value] of Object.entries(tokens[group])) {
    if (!css.includes(`--oy-${group}-${name}: ${value};`)) fail(`css carries ${group}.${name}`);
  }
}
pass('css carries radius and space');

// 3. Text you can read: WCAG 2.1 contrast for the pairs that carry words.
const channels = (color) => {
  const hex = color.slice(1);
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
};
const luminance = (color) => {
  const [r, g, b] = channels(color).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const pairs = [
  ['light ink on sheet', tokens.app.light.ink, tokens.app.light.sheet, 4.5],
  ['light ink on canvas', tokens.app.light.ink, tokens.app.light.canvas, 4.5],
  ['light ink-2 on sheet', tokens.app.light['ink-2'], tokens.app.light.sheet, 4.5],
  ['light on-fill on fill', tokens.app.light['on-fill'], tokens.app.light.fill, 4.5],
  ['dark ink on sheet', tokens.app.dark.ink, tokens.app.dark.sheet, 4.5],
  ['dark ink on canvas', tokens.app.dark.ink, tokens.app.dark.canvas, 4.5],
  ['dark ink-2 on sheet', tokens.app.dark['ink-2'], tokens.app.dark.sheet, 4.5],
  ['dark on-fill on fill', tokens.app.dark['on-fill'], tokens.app.dark.fill, 4.5],
  ['oyen ink on cream', tokens.island.oyen.ink, tokens.island.oyen.ground, 4.5],
  ['oyen subtitle on cream', tokens.brand['cream-subtitle'], tokens.island.oyen.ground, 3.0],
  ['white ink on classic ground', tokens.island.classic.ink, tokens.island.classic.ground, 4.5],
  ['white ink on pill ground', tokens.island.pill.ink, tokens.island.pill.ground, 4.5],
];
for (const [label, fg, bg, minimum] of pairs) {
  const value = ratio(fg, bg);
  const shown = value.toFixed(2);
  if (value >= minimum) pass(`contrast ${label}`, `${shown}:1 (min ${minimum})`);
  else fail(`contrast ${label}`, `${shown}:1, want ${minimum}`);
}

/** 0xFFF0892E / #f0892e as one upper-case hex string, alpha included. */
const digits = (value) => {
  const hex = value
    .replace(/\.toInt\(\)/, '')
    .trim()
    .replace(/^#/, '')
    .replace(/^0x/i, '')
    .toUpperCase();
  return hex.length === 6 ? `FF${hex}` : hex;
};

// 4. Optional: the two apps on disk must agree with tokens.json.
const at = process.argv.indexOf('--apps');
if (at !== -1) {
  const [android, studio] = process.argv.slice(at + 1, at + 3);
  const read = (path) => {
    try {
      return readFileSync(path, 'utf8');
    } catch {
      return null;
    }
  };

  const themeKt = android && read(join(android, 'app/src/main/java/id/oyenza/core/DioramaTheme.kt'));
  if (themeKt) {
    // The companion names a few colours (CREAM, ORANGE) that the looks then
    // use by name, so resolve those first and compare what is painted.
    const named = new Map();
    for (const match of themeKt.matchAll(/const val ([A-Z_0-9]+) = (0x[0-9A-Fa-f]+)/g)) {
      named.set(match[1], digits(match[2]));
    }
    const resolve = (value) => {
      if (!value) return null;
      const trimmed = value.trim();
      if (trimmed.startsWith('0x')) return digits(trimmed);
      return named.get(trimmed) ?? null;
    };
    let compared = 0;
    for (const [id, look] of Object.entries(tokens.island)) {
      const block = themeKt.match(new RegExp(`val ${id.toUpperCase()} = DioramaTheme\\(([\\s\\S]*?)\\n        \\)`));
      if (!block) {
        fail(`android has the ${id} look`);
        continue;
      }
      for (const key of ['ground', 'border', 'wash']) {
        const field = block[1].match(new RegExp(`\\n\\s+${key} = ([^,\\n]+)`));
        if (!field) {
          fail(`android ${id}.${key} is present`);
          continue;
        }
        eq(`android ${id}.${key}`, resolve(field[1]), digits(rustInt(look[key])));
        compared += 1;
      }
    }
    pass('android looks agree with tokens.json', `${compared} colours`);
  } else if (android) {
    fail('android DioramaTheme.kt is readable');
  }

  const look = studio && read(join(studio, 'crates/poni-core/src/look.rs'));
  if (look) {
    // Color::hex in poni_core takes rgb; the alpha is separate.
    const oyen = look.match(/pub const OYEN: Look = Look \{([\s\S]*?)\n\};/);
    if (!oyen) fail('studio OYEN look is present');
    else {
      const ground = oyen[1].match(/ground: Color::hex\((0x[0-9A-Fa-f]+)\)/);
      const ink = oyen[1].match(/ink: Color::hex\((0x[0-9A-Fa-f]+)\)/);
      eq('studio oyen.ground', ground && digits(ground[1]).slice(-6), digits(tokens.island.oyen.ground).slice(-6));
      eq('studio oyen.ink', ink && digits(ink[1]).slice(-6), digits(tokens.island.oyen.ink).slice(-6));
    }
    const classic = look.match(/pub const CLASSIC: Look = Look \{([\s\S]*?)\n\};/);
    if (!classic) fail('studio CLASSIC look is present');
    else if (!/ground: Color::black\(1\.0\)/.test(classic[1])) fail('studio classic.ground is black');
    else pass('studio classic.ground matches classic ground', 'black');
  } else if (studio) {
    fail('studio look.rs is readable');
  }
}

if (failures) {
  console.log(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nall checks passed');
