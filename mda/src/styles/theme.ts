import type { DefaultTheme } from 'styled-components'
import { dimensions, height, width } from './dimensions'

export const appTheme: DefaultTheme = {
  background: '#FFF',
  backgroundLight: '#F9F9F9',
  backgroundDark: '#D4D6D7',
  primary: '#2A8F7A',
  secondary: '#E3594B',
  title: '#1E1E1E',
  text: '#5B5B5B',
  highlight: '#FF2353',
  dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`
}

export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.primary
  }
}
