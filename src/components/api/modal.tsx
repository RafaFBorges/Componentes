'use client'

import React from 'react'

import { FaTimes as CloseIcon } from 'react-icons/fa'

import StyledButton from './button'
import Text, { TextTag } from './text'
import { ModalFormProps } from '../../types/modalTypes'

export interface ModalThemeProps {
  saveLabel?: string;
  cancelLabel?: string;
  backgroundColor?: string;
  color?: string;
  fontColor?: string;
  disabledFontColor?: string;
}

export interface ModalProps extends ModalFormProps, ModalThemeProps {
  children: React.ReactNode;
  closeModal: () => void;
  title: string;
  data: object;
}

export default function Modal({
  children,
  closeModal,
  title,
  enabledVerify = true,
  onAccept = null,
  data = {},
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  backgroundColor = '#fff',
  color = '#0070f3',
  fontColor = '',
  disabledFontColor = '',
}: ModalProps) {
  return <div style={styles.overlay}>
    <div style={{ ...styles.modal, backgroundColor: backgroundColor }}>
      <div style={{ ...styles.titleRow, margin: '0 0 0.5rem 0' }}>
        <Text textTag={TextTag.H6} style={styles.title} fontColor={fontColor} disabledFontColor={disabledFontColor}>{title}</Text>
        <StyledButton
          color={color}
          clickHandle={() => closeModal()}
          Icon={CloseIcon}
          isClickableIcon
        />
      </div>
      <div style={styles.content}>
        {children}
      </div>
      <div style={{ ...styles.titleRow, margin: '0.5rem 0 0 0' }}>
        <StyledButton
          color={color}
          clickHandle={() => closeModal()}
          width='40%'
        >
          {cancelLabel}
        </StyledButton>
        <StyledButton
          color={color}
          clickHandle={() => {
            if (onAccept != null)
              onAccept(data)

            closeModal()
          }}
          width='40%'
          enabled={enabledVerify}
        >
          {saveLabel}
        </StyledButton>
      </div>
    </div>
  </div>
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '0.4em',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  content: {
    flexGrow: '1',
    width: '100%',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.25rem',
  },
}
