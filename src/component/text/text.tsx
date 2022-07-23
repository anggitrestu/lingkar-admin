import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets, aligns } from "./text.presets"
import { TextProps } from "./text.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { preset = "default", text, children, align="",  style: styleOverride, ...rest } = props

  // figure out which content to use
  const content =  text || children

  const style = presets[preset] || presets.default 
  const textALign =  aligns[align] || aligns.default
  const styles = [style, styleOverride, textALign]

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
