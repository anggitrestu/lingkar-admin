import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.darkGray,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  h1: {
    ...BASE,
    fontSize: 35,
      fontWeight: "bold",
  },

  h2: {
    ...BASE,
    fontSize: 25,
      fontWeight: "bold",
  },

  h3: {
    ...BASE,
    fontSize: 20,
    fontWeight: "bold",
    color: color.text,
  },

  h4: {
    ...BASE,
    fontSize: 15,
    fontWeight: "medium",
    color: color.text,
  },

  h5: {
    ...BASE,
    fontSize: 12,
    fontWeight: "medium",
  },

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets


const DEFAULT_ALIGNS: TextStyle = {
  textAlign: "left",
}

export const aligns = {
  default: DEFAULT_ALIGNS,

  center: {
    ...DEFAULT_ALIGNS,
    textAlign: "center",
  },

  right: {
    ...DEFAULT_ALIGNS,
    textAlign: "right",
  },

  justify: {
    ...DEFAULT_ALIGNS,
    textAlign: "justify",
  }
}

export type TextAligns = keyof typeof aligns