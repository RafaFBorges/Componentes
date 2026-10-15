'use client'

import React, { ReactNode, useState } from 'react'

import { IconType } from 'react-icons'

import FrameworkInput, { FrameworkInputProps } from '../../components/input/frameworkInput'
import Text, { TextTag } from '../../components/api/text'
import StyledButton from '../../components/api/button'
import { FormInputField } from '../../types/formTypes'
import { PaginationItem, UsePaginationProps, usePagination } from './usePagination'


export interface UseViewFormOptions {
  submitLabel?: string
  color?: string
  InputComponent?: React.ComponentType<FrameworkInputProps>
  pagination?: Pick<UsePaginationProps, 'nextLabel' | 'previousLabel' | 'color' | 'iconColor' | 'disabledColor'>
}

interface UseViewFormProps extends UseViewFormOptions {
  orderedFields: () => FormInputField[]
  onFieldBlur: () => void
  handleChange: (name: string, value: string) => void
  onSuccess?: () => ReactNode
  title?: string
  subtitle?: string
  canSubmit: () => boolean
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

interface SectionBlock {
  sectionKey: string
  sectionLabel?: string
  Icon?: IconType | undefined
  rows: (FormInputField | FormInputField[])[]
}

interface UseViewReturn {
  renderForm: () => React.JSX.Element | undefined
  setSucess: (value: boolean) => void
}

export function useViewForm({
  orderedFields,
  onFieldBlur,
  handleChange,
  onSuccess,
  title = undefined,
  subtitle = undefined,
  canSubmit,
  handleSubmit,
  submitLabel = 'Submit',
  color = '#0070f3',
  InputComponent = FrameworkInput,
  pagination = undefined,
}: UseViewFormProps): UseViewReturn {
  const [sucess, setSucess] = useState<boolean>(false)
  const [paginationList,] = useState<PaginationItem[]>(buildPagination())
  const { renderController, renderNextButton, renderPreviousButton, renderContent } = usePagination({
    list: paginationList,
    firstIndex: 0,
    lastAction: {
      buttonName: submitLabel,
      action: (e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e),
      enabled: canSubmit,
    },
    ...pagination,
  })

  function CanGoFurther(section: SectionBlock): boolean {
    if (section == null || section.rows == null)
      return true

    if (!Array.isArray(section.rows)) {
      const isValidRow: boolean | null = (section.rows as FormInputField).isValid
      return isValidRow != null && isValidRow
    }

    for (const row of section.rows) {
      if (Array.isArray(row)) {
        for (const field of row)
          if (!field.isValid)
            return false
      } else {
        if (!row.isValid)
          return false
      }
    }

    return true
  }

  function buildPagination(): PaginationItem[] {
    const sections: SectionBlock[] = buildSections()

    return sections.map((section, index) => {
      return {
        name: section.sectionLabel ?? section.sectionKey,
        Icon: section.Icon,
        renderPage: () => {
          const current = buildSections().find(s => s.sectionKey === section.sectionKey)
          return current ? renderSectionRows(current) : undefined
        },
        canGoFurther: (): boolean => {
          const current = buildSections().find(s => s.sectionKey === section.sectionKey)

          return current
            ? CanGoFurther(current) && ((index != sections.length - 1) || canSubmit())
            : true
        },
      }
    })
  }

  function buildSections(): SectionBlock[] {
    const fields: FormInputField[] = orderedFields()
    const sections: SectionBlock[] = []
    const sectionMap: Map<string, SectionBlock> = new Map<string, SectionBlock>()
    const groupMap: Map<string, FormInputField[]> = new Map<string, FormInputField[]>()

    for (const field of fields) {
      const sectionKey = field.section ?? '__default__'

      if (!sectionMap.has(sectionKey)) {
        const block: SectionBlock = {
          sectionKey,
          sectionLabel: field.section,
          Icon: field.sectionIcon,
          rows: [],
        }

        sectionMap.set(sectionKey, block)
        sections.push(block)
      }

      const section = sectionMap.get(sectionKey)!

      if (field.group) {
        const groupKey = `${sectionKey}::${field.group}`

        if (!groupMap.has(groupKey)) {
          const group: FormInputField[] = []
          groupMap.set(groupKey, group)
          section.rows.push(group)
        }

        groupMap.get(groupKey)!.push(field)
      } else
        section.rows.push(field)
    }

    return sections
  }

  function renderField(item: FormInputField) {
    return <InputComponent
      key={item.name}
      {...item}
      onBlur={onFieldBlur}
      changeHandle={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(item.name, e.target.value)}
    />
  }

  function renderSectionRows(section: SectionBlock) {
    return (
      <div>
        {section.sectionLabel && (
          <Text
            noSelection
            noWrap
            style={styles.sectionLabel}
            textTag={TextTag.P}
            color={'#000'}
          >
            {section.sectionLabel}
          </Text>
        )}

        {section.rows.map((row, rIndex) => (
          <div key={rIndex}>
            {renderRow(row)}
            {rIndex < section.rows.length - 1 && <div style={styles.rowDivider} />}
          </div>
        ))}
      </div>
    )
  }

  function renderRow(row: FormInputField | FormInputField[]) {
    if (Array.isArray(row)) {
      return <div key={row.map(f => f.name).join('-')} style={styles.group}>
        {row.map(renderField)}
      </div>
    }

    return renderField(row)
  }

  function renderFields() {
    const sections = buildSections()

    return <div>
      {sections.map((section, sIndex) => (
        <div key={section.sectionKey}>
          {renderSectionRows(section)}
          {sIndex < sections.length - 1 && <hr style={styles.sectionDivider} />}
        </div>
      ))}
    </div>
  }

  function renderButtons(): React.JSX.Element | undefined {
    if (paginationList.length <= 0)
      return <StyledButton color={color} enabled={canSubmit()} clickHandle={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
        {submitLabel}
      </StyledButton>

    return <div style={styles.buttonsContainer}>
      {renderPreviousButton()}
      {renderNextButton()}
    </div>
  }

  function renderFormContent(): React.JSX.Element | undefined {
    if (sucess)
      return onSuccess ? <>{onSuccess()}</> : undefined

    return paginationList.length <= 0 ? renderFields() : renderContent()
  }

  function renderForm() {
    return <>
      <div style={styles.header}>
        <Text noSelection noWrap style={styles.title} textTag={TextTag.H1} color={'#000'}>{title}</Text>
        {!sucess && renderController()}
      </div>
      <Text noSelection noWrap style={styles.subtitle} textTag={TextTag.P} color={'#000'}>{subtitle}</Text>
      <form noValidate>
        {renderFormContent()}
        {!sucess && renderButtons()}
      </form>
    </>
  }

  return { renderForm, setSucess }
}

const styles: { [key: string]: React.CSSProperties } = {
  group: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: '0 0 1rem',
  },
  rowDivider: {
    height: 8,
  },
  sectionDivider: {
    border: 'none',
    borderTop: '1px solid #eee',
    margin: '1.25rem 0',
  },
  buttonsContainer: {
    overflow: 'hidden',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    margin: '0 0 0.25rem',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    margin: '0 0 1.75rem',
  },
}
