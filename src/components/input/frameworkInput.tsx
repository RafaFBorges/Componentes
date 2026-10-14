'use client'

import React from 'react'

import Text, { TextTag } from '../api/text'
import StyledInput, { StyledInputProps } from './input'
import PhoneInput from './phoneInput'
import SpinInput from './spinInput'
import PasswordInput from './passwordInput'
import DateInput from './dateInput'

export type InputRegistry = Partial<Record<React.HTMLInputTypeAttribute, React.ComponentType<StyledInputProps>>>

export const DEFAULT_INPUT_REGISTRY: InputRegistry = {
  tel: PhoneInput,
  number: SpinInput,
  password: PasswordInput,
  date: DateInput,
  text: StyledInput,
}

export interface FrameworkInputProps extends StyledInputProps {
  label: string;
  labelColor?: string;
  fontColor?: string;
  disabledFontColor?: string;
  inputs?: InputRegistry;
}

export function resolveInput(type: React.HTMLInputTypeAttribute, inputs: InputRegistry = DEFAULT_INPUT_REGISTRY): React.ComponentType<StyledInputProps> {
  return inputs[type] ?? StyledInput
}

export default function FrameworkInput({
  type = 'text',
  label,
  labelColor = '#555',
  fontColor = '',
  disabledFontColor = '',
  inputs = undefined,
  height = 36,
  ...rest
}: FrameworkInputProps) {
  const InputComponent = resolveInput(type, inputs ? { ...DEFAULT_INPUT_REGISTRY, ...inputs } : DEFAULT_INPUT_REGISTRY)

  return <div style={styles.container}>
    <Text
      noSelection
      noWrap
      fontSize={14}
      style={styles.title}
      textTag={TextTag.P}
      color={labelColor}
      fontColor={fontColor}
      disabledFontColor={disabledFontColor}
    >
      {label}
    </Text>

    <InputComponent
      type={type}
      height={height}
      {...rest}
    />
  </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    outline: 'none',
    gap: '0.1rem',
    borderRadius: '8px',
    border: 'none',
    boxSizing: 'border-box',
  },
}
