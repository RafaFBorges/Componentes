import React from 'react'

import { IconType } from 'react-icons'

import { DateValue } from '../components/input/dateInput'


export interface FormInputField {
  value: string
  isValid: boolean | null
  type: React.HTMLInputTypeAttribute
  name: string
  label: string
  position: number
  group?: string
  section?: string
  placeholder?: string
  style?: React.CSSProperties
  validate?: (value: string) => boolean
  maxDate?: DateValue
  minDate?: DateValue
  sectionIcon?: IconType | undefined
  isTouched?: boolean
  setIsTouched?: (touched: boolean) => void
}

export interface getFieldValueResult {
  success: boolean
  field: FormInputField
}

export interface FormState {
  [key: string]: FormInputField
}
