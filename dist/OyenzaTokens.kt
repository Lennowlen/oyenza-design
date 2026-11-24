package id.oyenza.core

/**
 * The shared Oyenza palette, generated from oyenza-design/tokens.json.
 *
 * Do not edit: edit tokens.json, run `node tools/gen.mjs`, and copy this file
 * over. DioramaTheme reads its four looks from here, so the phone and the
 * desktop are the same island.
 */
object OyenzaTokens {

    // brand
    const val ORANGE = 0xFFF0892E.toInt()
    const val FOLD = 0xFFC9581A.toInt()
    const val CREAM = 0xFFFFF1DE.toInt()
    const val ESPRESSO = 0xFF2B1B10.toInt()
    const val CREAM_SUBTITLE = 0xFF8A7563.toInt()
    const val SUBTITLE_ON_DARK = 0x99FFFFFF.toInt()

    // the island, one look per theme
    const val ISLAND_CLASSIC_GROUND = 0xFF000000.toInt()
    const val ISLAND_CLASSIC_INK = 0xFFFFFFFF.toInt()
    const val ISLAND_CLASSIC_ACCENT = 0xFFF0892E.toInt()
    const val ISLAND_CLASSIC_BORDER = 0x1FFFFFFF.toInt()
    const val ISLAND_CLASSIC_WASH = 0x24FFFFFF.toInt()
    const val ISLAND_CLASSIC_LIGHT = false
    const val ISLAND_CLASSIC_FLOATING = false

    const val ISLAND_OYEN_GROUND = 0xFFFFF1DE.toInt()
    const val ISLAND_OYEN_INK = 0xFF2B1B10.toInt()
    const val ISLAND_OYEN_ACCENT = 0xFFF0892E.toInt()
    const val ISLAND_OYEN_ACCENT_INK = 0xFFC9581A.toInt()
    const val ISLAND_OYEN_BORDER = 0x38C9581A.toInt()
    const val ISLAND_OYEN_WASH = 0xFFF3E5D2.toInt()
    const val ISLAND_OYEN_LIGHT = true
    const val ISLAND_OYEN_FLOATING = false

    const val ISLAND_GLASS_GROUND = 0xF21C1C1E.toInt()
    const val ISLAND_GLASS_INK = 0xFFFFFFFF.toInt()
    const val ISLAND_GLASS_ACCENT = 0xFFF0892E.toInt()
    const val ISLAND_GLASS_BORDER = 0x1AFFFFFF.toInt()
    const val ISLAND_GLASS_WASH = 0x2EFFFFFF.toInt()
    const val ISLAND_GLASS_LIGHT = false
    const val ISLAND_GLASS_FLOATING = false

    const val ISLAND_PILL_GROUND = 0xFF000000.toInt()
    const val ISLAND_PILL_INK = 0xFFFFFFFF.toInt()
    const val ISLAND_PILL_ACCENT = 0xFFF0892E.toInt()
    const val ISLAND_PILL_BORDER = 0x2EFFFFFF.toInt()
    const val ISLAND_PILL_WASH = 0x26FFFFFF.toInt()
    const val ISLAND_PILL_LIGHT = false
    const val ISLAND_PILL_FLOATING = true

    // the app surface behind the island
    const val APP_CANVAS = 0xFFF3F1EE.toInt()
    const val APP_SHEET = 0xFFFFFFFF.toInt()
    const val APP_TILE = 0xFFF7F4F0.toInt()
    const val APP_INK = 0xFF101012.toInt()
    const val APP_INK_2 = 0xFF5F5F66.toInt()
    const val APP_MUTED = 0xFF8B8B93.toInt()
    const val APP_LINE = 0xFFECEBE8.toInt()
    const val APP_ACCENT = 0xFFF0812B.toInt()
    const val APP_FILL = 0xFFB34D12.toInt()
    const val APP_ON_FILL = 0xFFFFFFFF.toInt()
    const val APP_TINT_BLUE = 0xFFDCEAF7.toInt()
    const val APP_TINT_PEACH = 0xFFFBEEE4.toInt()
    const val APP_TINT_MINT = 0xFFE2F3EF.toInt()
    const val APP_TINT_LILAC = 0xFFE8E4F8.toInt()
    const val APP_TINT_CREAM = 0xFFF8EDD9.toInt()
    const val APP_TINT_SKY = 0xFFDFE9F6.toInt()
    const val APP_TINT_GREY = 0xFFF1F1F3.toInt()

    // sizes in dp
    const val RADIUS_SM_DP = 10f
    const val RADIUS_MD_DP = 16f
    const val RADIUS_LG_DP = 24f
    const val RADIUS_XL_DP = 28f
    const val RADIUS_PILL_DP = 999f
    const val SPACE_1_DP = 4f
    const val SPACE_2_DP = 8f
    const val SPACE_3_DP = 12f
    const val SPACE_4_DP = 16f
    const val SPACE_5_DP = 20f
    const val SPACE_6_DP = 24f
    const val SPACE_7_DP = 32f
    const val SPACE_8_DP = 40f
    const val TOUCH_MIN_DP = 44f

    // motion, in milliseconds
    const val MOTION_FAST_MS = 120
    const val MOTION_BASE_MS = 180
    const val MOTION_SLOW_MS = 320
}
