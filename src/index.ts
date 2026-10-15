export { default as StyledButton } from './components/api/button'
export type { StyledButtonProps } from './components/api/button'

export { default as WindowButton } from './components/api/windowButton'
export type { WindowButtonProps } from './components/api/windowButton'

export { default as Text, TextTag } from './components/api/text'
export type { TextProps } from './components/api/text'

export { default as Link } from './components/api/link'
export type { LinkProps } from './components/api/link'

export { default as Toggle } from './components/api/toggle'
export type { ToggleProps } from './components/api/toggle'

export { default as StyledInput } from './components/input/input'
export type { StyledInputProps } from './components/input/input'

export { default as PhoneInput } from './components/input/phoneInput'
export { default as SpinInput } from './components/input/spinInput'
export type { SpinInputProps } from './components/input/spinInput'
export { default as PasswordInput } from './components/input/passwordInput'
export type { PasswordInputProps } from './components/input/passwordInput'

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

export { default as DateInput, DateValue } from './components/input/dateInput'
export type { DateInputProps, DateField } from './components/input/dateInput'
export { default as Calendar, CalendarViewType, WEEK_DAYS, CALENDAR_ITEM_COUNT, MONTH_NAME } from './components/input/calendar'
export type { CalendarProps, WeekDaysType } from './components/input/calendar'

export { default as TagItem } from './components/api/tagItem'
export type { TagItemProps } from './components/api/tagItem'

export { default as Modal } from './components/api/modal'
export type { ModalProps, ModalThemeProps } from './components/api/modal'
export { ModalProvider, useModal } from './utils/hook/useModal'
export type { ModalContentProps, ModalFormProps } from './types/modalTypes'

export { default as FrameworkInput, DEFAULT_INPUT_REGISTRY, resolveInput } from './components/input/frameworkInput'
export type { FrameworkInputProps, InputRegistry } from './components/input/frameworkInput'

export { default as TagList } from './components/api/tagList'
export type { TagListProps, TagListItem } from './components/api/tagList'

export { default as Card } from './components/api/card'
export type { CardProps } from './components/api/card'

export { useViewForm } from './utils/hook/useViewForm'
export type { UseViewFormOptions } from './utils/hook/useViewForm'
export { useForm } from './utils/hook/useForm'
export type { UseFormProps, UseFormReturn } from './utils/hook/useForm'
export type { FormInputField, FormState, getFieldValueResult } from './types/formTypes'

export { default as LoginForm } from './components/api/loginForm'
export type { LoginFormProps, LoginFormLabels } from './components/api/loginForm'
