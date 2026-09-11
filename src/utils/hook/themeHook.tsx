"use client"

import { createContext, useContext, ReactNode, useState } from 'react'

import { getSideColor } from '../colors'

export enum ThemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
}

export const THEME_KEY = 'ThemeProvider.theme'

const LIGHT_CONFIG = {
  color: '#0070f3',
  backgroundColor: '#fff',
  fontSize: '16',
  fontColor: '#121212ff',
  disabledFontColor: '#555',
  cardBackground: '#fff',
  tagDefaultColor: '#1439dcff',
  GainSideColor: '#00D84C',
  NeutralSidedColor: '#727272ff',
  LossSideColor: '#ff0839ff',
  borderColor: '#555',
  borderSuccessColor: '#639922',
  borderErrorColor: '#e24b4a',
  enabledColor: '#00D84C',
  disabledColor: '#727272ff',
  iconColor: '#999999',
  diferentMonth: '#D8D8D8',
  selectedDate: '#0070f3',
  disabledDay: '#808080',
}

const DARK_CONFIG = {
  color: '#328f16ff',
  backgroundColor: '#121212ff',
  fontSize: '16',
  fontColor: '#fff',
  disabledFontColor: '#808080',
  cardBackground: '#1d1d1d',
  tagDefaultColor: '#dc143cff',
  GainSideColor: '#54f523ff',
  NeutralSidedColor: '#727272ff',
  LossSideColor: '#ff4757ff',
  borderColor: '#d1d5db',
  borderSuccessColor: '#639922',
  borderErrorColor: '#e24b4a',
  enabledColor: '#00D84C',
  disabledColor: '#727272ff',
  iconColor: '#eed7b8',
  diferentMonth: '#D8D8D8',
  selectedDate: '#328f16ff',
  disabledDay: '#555',
}

interface ThemeContextType {
  setTheme: (newTheme: ThemeOptions) => void;
  config: ThemeStyleProps;
  sideColor: (value: number) => string;
  settedTheme: ThemeOptions;
}

export interface ThemeStyleProps {
  color: string
  backgroundColor: string
  fontSize: string | number
  fontColor: string
  disabledFontColor: string
  cardBackground: string
  tagDefaultColor: string
  LossSideColor: string
  NeutralSidedColor: string
  GainSideColor: string
  borderColor: string
  borderSuccessColor: string
  borderErrorColor: string
  enabledColor: string
  disabledColor: string
  iconColor: string
  diferentMonth: string
  selectedDate: string
  disabledDay: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

function isValidTheme(theme: string): boolean {
  return Object.values(ThemeOptions).includes(theme as ThemeOptions)
}

function themeToConfig(themeOption: ThemeOptions): ThemeStyleProps {
  switch (themeOption) {
    case ThemeOptions.LIGHT: return LIGHT_CONFIG
    case ThemeOptions.DARK: return DARK_CONFIG
    default: return LIGHT_CONFIG
  }
}

function loadTheme(lastValue: string | undefined): ThemeOptions {
  if (lastValue != null && isValidTheme(lastValue))
    return lastValue as ThemeOptions

  return ThemeOptions.LIGHT
}

export function ThemeProvider({
  children,
  theme,
  onThemeChange,
}: {
  children: ReactNode
  theme?: string
  onThemeChange?: (theme: ThemeOptions) => void
}) {
  const [settedTheme, setSettedTheme] = useState<ThemeOptions>(() => loadTheme(theme))
  const [config, setConfig] = useState<ThemeStyleProps>(() => themeToConfig(loadTheme(theme)))

  function setTheme(newTheme: ThemeOptions) {
    if (!isValidTheme(newTheme) || newTheme == settedTheme)
      return

    setSettedTheme(newTheme)
    setConfig(themeToConfig(newTheme))

    if (typeof window !== 'undefined')
      localStorage.setItem(THEME_KEY, newTheme)

    onThemeChange?.(newTheme)
  }

  function sideColor(value: number) {
    return getSideColor(value, config)
  }

  return <ThemeContext.Provider
    value={{
      setTheme,
      config,
      sideColor,
      settedTheme,
    }}
  >
    {children}
  </ThemeContext.Provider>
}
