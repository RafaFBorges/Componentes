'use client'

import React, { useState } from 'react'

import StyledButton from './button'
import Link from './link'
import Text, { TextTag } from './text'
import StyledInput from '../input/input'
import PasswordInput from '../input/passwordInput'

export interface LoginFormLabels {
  emailPlaceholder: string;
  passwordPlaceholder: string;
  send: string;
  forgotPassword: string;
  firstTime: string;
  createAccount: string;
}

export interface LoginFormProps {
  registerHRef?: string;
  passwordForgetedHRef?: string;
  onSubmit: (user: string, password: string) => void | Promise<void>;
  labels?: Partial<LoginFormLabels>;
  color?: string;
  fontColor?: string;
  disabledFontColor?: string;
}

const DEFAULT_LABELS: LoginFormLabels = {
  emailPlaceholder: 'Enter your email',
  passwordPlaceholder: 'Enter your password',
  send: 'Send',
  forgotPassword: 'Forgot password?',
  firstTime: 'First time?',
  createAccount: 'Create account',
}

export default function LoginForm({
  registerHRef = '',
  passwordForgetedHRef = '',
  onSubmit,
  labels = undefined,
  color = '#0070f3',
  fontColor = '',
  disabledFontColor = '',
}: LoginFormProps) {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const text: LoginFormLabels = { ...DEFAULT_LABELS, ...labels }

  return <div style={styles.container}>
    <StyledInput
      type={'text'}
      name={'user'}
      value={user}
      changeHandle={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
      placeholder={text.emailPlaceholder}
     
    />
    <div style={styles.passwordContainer}>
      <PasswordInput
        type={'password'}
        name={'password'}
        placeholder={text.passwordPlaceholder}
        value={password}
        changeHandle={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
       
      />
      <Link href={passwordForgetedHRef}>{text.forgotPassword}</Link>
    </div>
    <StyledButton color={color} clickHandle={async () => { await onSubmit(user, password) }}>
      {text.send}
    </StyledButton>

    <div style={styles.creationContainer}>
      <Text textTag={TextTag.P} fontColor={fontColor} disabledFontColor={disabledFontColor}>{text.firstTime}</Text>
      <Link href={registerHRef}>{text.createAccount}</Link>
    </div>
  </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    border: 'none',
    borderRadius: '8px',
    boxSizing: 'border-box',
    flexDirection: 'column',
    gap: '12px',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  creationContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignSelf: 'center',
  },
}
