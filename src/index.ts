export { default as StyledButton } from './components/api/button'
export type { StyledButtonProps } from './components/api/button'

export { default as WindowButton } from './components/api/windowButton'
export type { WindowButtonProps } from './components/api/windowButton'

export { default as Text, TextTag } from './components/api/text'
export type { TextProps } from './components/api/text'

export { default as Link } from './components/api/link'
export type { LinkProps } from './components/api/link'

export { default as Toggle } from './components/api/toggle'
export type { ToogleProps } from './components/api/toggle'

export { default as StyledInput } from './components/input/input'
export type { StyledInputProps } from './components/input/input'

export { default as PhoneInput } from './components/input/phoneInput'

export { default as ThemeButton } from './components/themeComponents/themeButton'
export { default as ThemeText } from './components/themeComponents/themeText'
export { default as ThemeToggle } from './components/themeComponents/themeToggle'

export { ThemeProvider, useTheme, ThemeOptions, THEME_KEY } from './utils/hook/themeHook'
export type { ThemeStyleProps } from './utils/hook/themeHook'

export { lightenCor, isLight, getSideColor } from './utils/colors'
export { validateEmail, notEmpty, validateStrongPassword, validateDate, isLeapYear } from './utils/validations'
export { encrypt, decrypt } from './utils/crypto'
export { usePagination } from './utils/hook/usePagination'
export type { UsePaginationProps, UsePaginationReturn, PaginationItem } from './utils/hook/usePagination'

export { PopupProvider, usePopup, PopupPositionType } from './utils/hook/usePopup'
export { PopupType, PopupInfo } from './types/popupTypes'
export type { PopupContextType } from './types/popupTypes'
export { default as Popup } from './components/api/popup'
