import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native"
import {  TextPresets, TextAligns } from "./text.presets"


export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets

  /**
   * An optional text alignment.
   * Defaults to left if not specified.
  */

  align?: TextAligns
}
