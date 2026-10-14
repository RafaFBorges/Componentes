'use client'

import React from 'react'

import { FaPlus as AddIcon } from 'react-icons/fa'

import StyledButton from './button'
import TagItem from './tagItem'

export interface TagListItem {
  name: string;
  disabled: boolean;
}

export interface TagListProps {
  style?: React.CSSProperties | null;
  tags: Array<TagListItem | null> | null;
  emptyLabel?: string;
  allowEmpty?: boolean;
  DisabledHover?: boolean;
  onTagClick?: (index: number) => void;
  onAdd?: () => void;
  color?: string;
  tagDefaultColor?: string;
  disabledFontColor?: string;
  fontColor?: string;
}

export default function TagList({
  style,
  tags,
  emptyLabel = '',
  allowEmpty = false,
  DisabledHover = false,
  onTagClick = undefined,
  onAdd = undefined,
  color = '#0070f3',
  tagDefaultColor = undefined,
  disabledFontColor = undefined,
  fontColor = undefined,
}: TagListProps) {
  function printTag(name: string, index: number, isDisabled: boolean, clickable: boolean) {
    return <TagItem
      DisabledHover={DisabledHover}
      key={index}
      name={name}
      isDisabled={isDisabled}
      defaultColor={tagDefaultColor}
      disabledFontColor={disabledFontColor}
      fontColor={fontColor}
      onClick={clickable && onTagClick != null ? () => onTagClick(index) : () => { }}
    />
  }

  function printContainer() {
    if (tags == null || tags.length == 0)
      return allowEmpty ? null : printTag(emptyLabel, 0, false, false)

    return tags.map((item, index) => printTag(item != null ? item.name : emptyLabel, index, item != null ? item.disabled : false, true))
  }

  return <div style={{ ...styles.container, ...style }}>
    {onAdd != null &&
      <StyledButton
        color={color}
        clickHandle={onAdd}
        Icon={AddIcon}
      />
    }
    <div style={styles.containerList}>{printContainer()}</div>
  </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.4em',
    width: '100%',
    boxSizing: 'border-box',
  },
  containerList: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: '0.4em',
    boxSizing: 'border-box',
    flexWrap: 'nowrap',
    alignItems: 'center',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
}
