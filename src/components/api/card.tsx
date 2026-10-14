'use client'

import React from 'react'

import { FaTrash as DeleteIcon, FaEdit as EditIcon } from 'react-icons/fa'

import StyledButton from './button'
import Text, { TextTag } from './text'

export interface CardProps {
  children?: React.ReactNode;
  style?: React.CSSProperties | null;
  title: string;
  date: string;
  id?: number;
  editClickHandle?: null | ((index: number) => void);
  deleteClickHandle?: null | ((index: number) => void);
  backgroundColor?: string;
  color?: string;
  fontColor?: string;
  disabledFontColor?: string;
}

export default function Card({
  children,
  title,
  date,
  style = null,
  id = -1,
  editClickHandle = null,
  deleteClickHandle = null,
  backgroundColor = '',
  color = '#0070f3',
  fontColor = '',
  disabledFontColor = '',
}: CardProps) {
  let cardStyle: React.CSSProperties = style != null ? { ...styles.card, ...style } : styles.card
  if (backgroundColor != '')
    cardStyle = { ...cardStyle, backgroundColor: backgroundColor }

  return <div style={cardStyle}>
    <div style={styles.content}>
      <div style={styles.flexRow}>
        <Text textTag={TextTag.H6} style={styles.title} fontColor={fontColor} disabledFontColor={disabledFontColor} noWrap>{title}</Text>
        <div style={styles.buttonsArea}>
          {editClickHandle != null &&
            <StyledButton
              color={color}
              clickHandle={() => editClickHandle(id)}
              Icon={EditIcon}
              isClickableIcon
            />
          }
          {deleteClickHandle != null &&
            <StyledButton
              color={color}
              clickHandle={() => deleteClickHandle(id)}
              Icon={DeleteIcon}
              isClickableIcon
            />
          }
        </div>
      </div>
      {children}
      <Text textTag={TextTag.P} style={styles.date} fontColor={fontColor} disabledFontColor={disabledFontColor} disabled>{date}</Text>
    </div>
  </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    flexShrink: 0,
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    maxWidth: '350px',
  },
  content: {
    padding: '0.7rem',
  },
  flexRow: {
    display: 'flex',
    gap: '0.5em',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '350px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.25rem',
  },
  buttonsArea: {
    display: 'flex',
    gap: '0.4em',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
  },
}
