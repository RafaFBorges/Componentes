'use client'

import React, { useState } from 'react'

import { IconType } from 'react-icons'

import StyledButton from '../../components/api/button'


export interface UsePaginationProps {
  list: PaginationItem[]
  firstIndex?: number
  lastAction?: PaginationLastAction
  nextLabel?: string
  previousLabel?: string
  color?: string
  iconColor?: string
  disabledColor?: string
}

export interface UsePaginationReturn {
  renderController: () => React.JSX.Element | undefined
  selected: number
  renderPreviousButton: (name?: string | undefined) => React.JSX.Element
  renderNextButton: (name?: string | undefined) => React.JSX.Element
  renderContent: () => React.JSX.Element | undefined
}

export interface PaginationItem {
  name: string
  Icon: IconType | undefined
  renderPage: () => React.JSX.Element | undefined
  canGoFurther?: () => boolean
  canGoBack?: () => boolean
}

interface PaginationLastAction {
  buttonName: string
  action: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  enabled: () => boolean
}

export function usePagination({
  list,
  firstIndex = 0,
  lastAction = undefined,
  nextLabel = 'Next',
  previousLabel = 'Previous',
  color = '#0070f3',
  iconColor = '#999999',
  disabledColor = '#727272ff',
}: UsePaginationProps): UsePaginationReturn {
  const [paginationList,] = useState<PaginationItem[]>(list)
  const [selected, setSelected] = useState<number>(Math.min(Math.max(0, firstIndex), list.length - 1))

  function renderController() {
    return <div style={styles.paginationContainer}>
      {paginationList.map((item, index) => {
        if (item.Icon == null)
          return

        const canClick = (index != selected) && (index < selected && (item.canGoBack == null || item.canGoBack()) || canGoFurther())
        let style: React.CSSProperties = {
          ...styles.paginationItem,
          borderColor: selected === index
            ? color
            : index < selected ? iconColor : disabledColor
        }

        if (canClick)
          style = { ...style, ...styles.canClick }

        const Icon: IconType = item.Icon
        return <div
          key={index}
          style={style}
          onClick={() => {
            if (canClick)
              setSelected(index)
          }}
        >
          <Icon
            color={selected === index
              ? color
              : index < selected ? iconColor : disabledColor
            }
            size={20}
          />
        </div>
      })}
    </div>
  }

  function renderContent(): React.JSX.Element | undefined {
    return 0 <= selected && selected < paginationList.length ? paginationList[selected].renderPage() : undefined
  }

  function canGoFurther(): boolean {
    if ((selected < 0) || (paginationList.length < selected))
      return false

    const maxIndex = paginationList[selected].canGoFurther == null ? paginationList.length - 1 : paginationList.length
    return (0 <= selected) && (selected < maxIndex) && (paginationList[selected].canGoFurther == null || paginationList[selected].canGoFurther())
  }

  function canGoBack(): boolean {
    if ((selected < 0) || (paginationList.length < selected))
      return false

    const minIndex = paginationList[selected].canGoBack == null ? 1 : 0
    return (minIndex <= selected) && (selected < paginationList.length) && (paginationList[selected].canGoBack == null || paginationList[selected].canGoBack())
  }

  function renderNextButton(name: string | undefined = undefined): React.JSX.Element {
    return <StyledButton
      enabled={canGoFurther()}
      color={color}
      clickHandle={(e: React.MouseEvent<HTMLButtonElement>) => {
        return (selected == paginationList.length - 1) && (lastAction != null) && lastAction.action != null
          ? lastAction.action(e)
          : setSelected(prev => Math.min(paginationList.length - 1, prev + 1))
      }}
    >
      {name !== undefined
        ? name
        : (selected == paginationList.length - 1) && (lastAction != null)
          ? lastAction.buttonName
          : nextLabel
      }
    </StyledButton>
  }

  function renderPreviousButton(name: string | undefined = undefined): React.JSX.Element {
    return <StyledButton
      enabled={canGoBack()}
      color={color}
      clickHandle={() => setSelected(prev => Math.max(0, prev - 1))}
    >
      {name === undefined ? previousLabel : name}
    </StyledButton>
  }

  return { renderController, selected, renderPreviousButton, renderNextButton, renderContent }
}

const styles: { [key: string]: React.CSSProperties } = {
  paginationContainer: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paginationItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 6,
    border: '2px solid #ccc',
    padding: 4,
  },
  canClick: {
    cursor: 'pointer',
  },
}
