'use client'

import React, { ReactNode, useRef, useState } from 'react'

import { FormInputField, FormState, getFieldValueResult } from '../../types/formTypes'
import { UseViewFormOptions, useViewForm } from './useViewForm'

const EMPTY_FIELD: FormInputField = {
  value: '',
  isValid: null,
  type: 'text',
  name: '',
  label: '',
  position: 0,
}

export interface UseFormReturn {
  form: () => FormState
  renderForm: () => React.JSX.Element | undefined
  addOrSetField: (field: FormInputField) => void
  getFieldValue: (name: string, value: string) => getFieldValueResult
  canSubmit: () => boolean
  onFieldChange: () => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export interface UseFormProps extends UseViewFormOptions {
  initialFields: FormInputField[]
  name: string
  handleChange: (name: string, value: string) => void
  processResponse: undefined | ((response: unknown) => boolean)
  onSuccess?: () => ReactNode
  onSubmit: (form: FormState) => Promise<unknown>
  title?: string
  subtitle?: string
}

export function useForm({ initialFields = [], name, handleChange, processResponse = undefined, onSubmit, onSuccess, title = undefined, subtitle = undefined, ...viewOptions }: UseFormProps): UseFormReturn {
  const buildInitialState = (): FormState => {
    return initialFields.reduce<FormState>((acc, field, index) => {

      acc[field.name] = {
        ...field,
        position: field.position ?? index,
        isTouched: field.isTouched ?? false,
        setIsTouched: (touched: boolean) => addOrSetField({ ...form()[field.name], isTouched: touched }),
      }
      return acc
    }, {})
  }

  const formRef = useRef<FormState>(buildInitialState())
  const orderRef = useRef<string[]>(initialFields.map(f => f.name))
  const canSubmitRef = useRef<boolean>(false)
  const [notSending, setNotSending] = useState<boolean>(false)
  const [, forceUpdate] = useState(0)
  const { renderForm, setSucess } = useViewForm({
    orderedFields: orderedFields,
    onFieldBlur: onFieldBlur,
    handleChange: handleChange,
    onSuccess: onSuccess,
    title: title,
    subtitle: subtitle,
    canSubmit: canSubmit,
    handleSubmit: handleSubmit,
    ...viewOptions,
  })

  const addOrSetField = (field: FormInputField) => {
    const isNew = !formRef.current[field.name]

    formRef.current = {
      ...formRef.current,
      [field.name]: field,
    }

    if (isNew) {
      orderRef.current = [
        ...orderRef.current.filter(n => n !== field.name),
        field.name,
      ].sort((a, b) => (formRef.current[a]?.position ?? 0) - (formRef.current[b]?.position ?? 0))
    }

    forceUpdate(n => n + 1)
  }

  function orderedFields(): FormInputField[] {
    return orderRef.current
      .map(name => formRef.current[name])
      .filter(Boolean)
      .sort((a, b) => a.position - b.position)
  }

  function onFieldBlur() {
    canSubmitRef.current = Object.values(formRef.current).every(f => f.isValid === true)
    forceUpdate(n => n + 1)
  }

  function onFieldChange() {
    canSubmitRef.current = false
    forceUpdate(n => n + 1)
  }

  function getFieldValue(name: string, value: string): getFieldValueResult {
    const fieldData = formRef.current[name]
    if (!fieldData)
      return { success: false, field: EMPTY_FIELD }

    const isValid = fieldData.validate ? fieldData.validate(value) : null

    return {
      success: true,
      field: { ...fieldData, value, isValid },
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (!canSubmit)
      return

    setNotSending(true)
    const response = await onSubmit(form())

    if (response != null && processResponse != undefined)
      setSucess(processResponse(response))

    setNotSending(false)
    console.log('handleSubmit > ' + name + ' response=' + (response != null))
  }

  function canSubmit(): boolean {
    return !notSending && canSubmitRef.current
  }

  function form(): FormState {
    return formRef.current
  }

  return { form, canSubmit, onFieldChange, addOrSetField, getFieldValue, handleSubmit, renderForm }
}
