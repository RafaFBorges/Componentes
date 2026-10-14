'use client'

import React, { useState } from 'react'

import Text, { TextTag } from './text'
import { isLight, lightenCor } from '../../utils/colors'

export interface TagItemProps {
  style?: React.CSSProperties | null;
  name: string;
  isDisabled: boolean;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  isOnlyText?: boolean;
  DisabledHover?: boolean;
  defaultColor?: string;
  disabledFontColor?: string;
  fontColor?: string;
}

export default function TagItem({
  style,
  name,
  isDisabled,
  color = '',
  onClick = () => { },
  isOnlyText = false,
  DisabledHover = false,
  defaultColor = '#1439dcff',
  disabledFontColor = '#555',
  fontColor = '',
}: TagItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = () => { setIsHovered(!DisabledHover) }
  const handleMouseLeave = () => { setIsHovered(false) }

  const tagColor: string = isDisabled
    ? disabledFontColor
    : color == ''
      ? defaultColor
      : color

  const backColor: string = isHovered ? lightenCor(tagColor, 23) : lightenCor(tagColor, 35)

  return isOnlyText
    ? <Text
      showHoover
      noSelection
      noWrap
      textTag={TextTag.P}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      fontColor={fontColor}
      disabledFontColor={disabledFontColor}
    >
      {name}
    </Text>
    : <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...styles.tagContainer, borderColor: tagColor, backgroundColor: backColor }}
      onClick={onClick}
    >
      <Text
        textTag={TextTag.P}
        style={styles.categoryTitle}
        color={isLight(backColor) ? '#000' : '#FFF'}
        fontColor={fontColor}
        disabledFontColor={disabledFontColor}
        disabled
        noSelection
      >
        {name}
      </Text>
    </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  tagContainer: {
    whiteSpace: 'noWrap',
    border: '1px solid red',
    borderRadius: '8px',
    padding: '2px 4px',
  }
}
