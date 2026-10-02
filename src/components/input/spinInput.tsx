'use client'

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { FaChevronUp as UpIcon, FaChevronDown as DownIcon } from 'react-icons/fa'

import StyledButton from '../api/button'
import StyledInput, { StyledInputProps } from './input'

export interface SpinInputProps extends StyledInputProps {
  setValueHandle?: (newValue: number) => void
  disabledButtons?: boolean
  padNumber?: number
  step?: number
  max?: number
  min?: number
  buttonColor?: string
}

const SpinInput = forwardRef<HTMLInputElement, SpinInputProps>(({
  value,
  changeHandle,
  style = null,
  max = 9999999999999,
  min = -9999999999999,
  step = 1,
  setValueHandle = () => { },
  height = 36,
  disabledButtons = false,
  padNumber = 1,
  buttonColor = '#0070f3',
  onKeyDown = undefined,

  ...ret
}: SpinInputProps, ref) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const cursorPosRef = useRef<number | null>(null)

  let spinStyle: React.CSSProperties = { ...styles.spin, height: height }
  if (style != null)
    spinStyle = { ...spinStyle, ...style }

  useImperativeHandle(ref, () => inputRef.current! as HTMLInputElement, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    cursorPosRef.current = (e.target as HTMLInputElement).selectionStart

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()

      const increment = e.key === 'ArrowUp' ? step : -step
      const currentValue = typeof value === 'number' ? value : Number(value)
      const newValue = Math.min(max, Math.max(min, currentValue + increment))

      if (newValue !== currentValue && inputRef.current != null) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set

        nativeInputValueSetter?.call(inputRef.current, String(newValue).padStart(padNumber, '0'))
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }

    if (onKeyDown)
      onKeyDown(e)
  }

  function spinChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    const prevLen = String(value).length
    const newRaw = e.target.value.replace(/\D/g, '')

    let newValue: number = Number(newRaw)
    newValue = Math.min(max, Math.max(min, newValue))

    const newStr = String(newValue).padStart(padNumber, '0')
    const lengthDiff = newStr.length - prevLen

    requestAnimationFrame(() => {
      if (inputRef.current && cursorPosRef.current !== null) {
        const newPos = cursorPosRef.current + lengthDiff
        inputRef.current.setSelectionRange(newPos, newPos)
      }
    })

    if (changeHandle)
      changeHandle({ ...e, target: { ...e.target, value: newStr } } as React.ChangeEvent<HTMLInputElement>)
  }

  function iconClick(increment: number) {
    if (typeof value !== 'number')
      return

    const newValue: number = Number(value) + increment
    if (newValue < min || max < newValue)
      return

    setValueHandle(newValue)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={spinStyle}
  >
    <StyledInput
      {...ret}

      ref={inputRef}
      type={'text'}
      inputMode={'numeric'}
      value={value}
      changeHandle={spinChangeHandle}
      style={style}
      onKeyDown={handleKeyDown}
      height={height}
    />
    {isHovered && !disabledButtons &&
      <div style={{ ...styles.buttonArea, top: (height - 34) / 2 }}>
        <StyledButton
          clickHandle={() => iconClick(1)}
          Icon={UpIcon}
          isClickableIcon
          color={buttonColor}
        />
        <StyledButton
          clickHandle={() => iconClick(-1)}
          Icon={DownIcon}
          isClickableIcon
          color={buttonColor}
        />
      </div>
    }
  </div>
})

const styles: { [key: string]: React.CSSProperties } = {
  spin: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  buttonArea: {
    position: 'absolute',
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    right: 4,
    zIndex: 10,
  }
}

SpinInput.displayName = 'SpinInput'
export default SpinInput
