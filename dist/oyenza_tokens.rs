//! The shared Oyenza palette, generated from oyenza-design/tokens.json.
//!
//! Do not edit: edit tokens.json, run `node tools/gen.mjs`, and copy this
//! file over. `look.rs` reads the island colours from here, so the desktop
//! and the phone are the same island.

use crate::oyen::{FOLD_ORANGE, ORANGE};

pub const CLASSIC_GROUND: u32 = 0xFF000000;
pub const CLASSIC_INK: u32 = 0xFFFFFFFF;
pub const CLASSIC_ACCENT: u32 = 0xFFF0892E;
pub const CLASSIC_BORDER: u32 = 0x1FFFFFFF;
pub const CLASSIC_WASH: u32 = 0x24FFFFFF;

pub const OYEN_GROUND: u32 = 0xFFFFF1DE;
pub const OYEN_INK: u32 = 0xFF2B1B10;
pub const OYEN_ACCENT: u32 = 0xFFF0892E;
pub const OYEN_ACCENT_INK: u32 = 0xFFC9581A;
pub const OYEN_BORDER: u32 = 0x38C9581A;
pub const OYEN_WASH: u32 = 0xFFF3E5D2;

pub const GLASS_GROUND: u32 = 0xF21C1C1E;
pub const GLASS_INK: u32 = 0xFFFFFFFF;
pub const GLASS_ACCENT: u32 = 0xFFF0892E;
pub const GLASS_BORDER: u32 = 0x1AFFFFFF;
pub const GLASS_WASH: u32 = 0x2EFFFFFF;

pub const PILL_GROUND: u32 = 0xFF000000;
pub const PILL_INK: u32 = 0xFFFFFFFF;
pub const PILL_ACCENT: u32 = 0xFFF0892E;
pub const PILL_BORDER: u32 = 0x2EFFFFFF;
pub const PILL_WASH: u32 = 0x26FFFFFF;

pub const APP_CANVAS: u32 = 0xFFF3F1EE;
pub const APP_SHEET: u32 = 0xFFFFFFFF;
pub const APP_TILE: u32 = 0xFFF7F4F0;
pub const APP_INK: u32 = 0xFF101012;
pub const APP_INK_2: u32 = 0xFF5F5F66;
pub const APP_MUTED: u32 = 0xFF8B8B93;
pub const APP_LINE: u32 = 0xFFECEBE8;
pub const APP_ACCENT: u32 = 0xFFF0812B;
pub const APP_FILL: u32 = 0xFFB34D12;
pub const APP_ON_FILL: u32 = 0xFFFFFFFF;
pub const APP_TINT_BLUE: u32 = 0xFFDCEAF7;
pub const APP_TINT_PEACH: u32 = 0xFFFBEEE4;
pub const APP_TINT_MINT: u32 = 0xFFE2F3EF;
pub const APP_TINT_LILAC: u32 = 0xFFE8E4F8;
pub const APP_TINT_CREAM: u32 = 0xFFF8EDD9;
pub const APP_TINT_SKY: u32 = 0xFFDFE9F6;
pub const APP_TINT_GREY: u32 = 0xFFF1F1F3;

/// Oyen's orange, kept as a name of its own for the marks that draw with it.
pub const BRAND_ORANGE: u32 = ORANGE;
pub const BRAND_FOLD: u32 = FOLD_ORANGE;
