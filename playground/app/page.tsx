'use client'

import React, { useState } from 'react'
import {
  ThemeProvider,
  ThemeButton,
  ThemeText,
  ThemeToggle,
  StyledInput,
  PhoneInput,
  Link,
  TextTag,
  ThemeOptions,
  useTheme,
  validateEmail,
} from '@rafafborges/componentes'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <ThemeText textTag={TextTag.H3} style={{ marginBottom: '0.75rem', overflow: 'visible', whiteSpace: 'normal' }}>
        {title}
      </ThemeText>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 420 }}>
        {children}
      </div>
    </section>
  )
}

function Demo() {
  const { config, settedTheme, setTheme } = useTheme()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enabled, setEnabled] = useState(true)

  return (
    <div
      style={{
        backgroundColor: config.backgroundColor,
        minHeight: '100vh',
        padding: '2.5rem 1.5rem',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <ThemeText textTag={TextTag.H1} style={{ overflow: 'visible', whiteSpace: 'normal', fontSize: '1.5rem' }}>
            Playground de Componentes
          </ThemeText>
          <ThemeToggle
            name="dark"
            enabled={settedTheme === ThemeOptions.DARK}
            clickHandle={() =>
              setTheme(settedTheme === ThemeOptions.DARK ? ThemeOptions.LIGHT : ThemeOptions.DARK)
            }
          />
        </div>

        <Section title="Botões (ThemeButton)">
          <ThemeButton clickHandle={() => alert('Botão primário clicado')}>
            Primário
          </ThemeButton>
          <ThemeButton isSecondary clickHandle={() => alert('Botão secundário clicado')}>
            Secundário
          </ThemeButton>
          <ThemeButton enabled={false}>Desabilitado</ThemeButton>
        </Section>

        <Section title="Texto (ThemeText)">
          <ThemeText textTag={TextTag.P} style={{ whiteSpace: 'normal', overflow: 'visible' }}>
            Este é um parágrafo padrão usando as cores do tema atual.
          </ThemeText>
          <ThemeText textTag={TextTag.P} disabled style={{ whiteSpace: 'normal', overflow: 'visible' }}>
            Texto desabilitado.
          </ThemeText>
        </Section>

        <Section title="Link">
          <Link href="https://github.com/rafafborges">Perfil no GitHub</Link>
        </Section>

        <Section title="Toggle (ThemeToggle)">
          <ThemeToggle
            name="Notificações"
            enabled={enabled}
            clickHandle={() => setEnabled((v) => !v)}
          />
        </Section>

        <Section title="Input com validação (StyledInput)">
          <StyledInput
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            validate={validateEmail}
            changeHandle={(e) => setEmail(e.target.value)}
          />
        </Section>

        <Section title="Input de telefone (PhoneInput)">
          <PhoneInput
            name="telefone"
            placeholder="99 (99) 9999 - 9999"
            value={phone}
            changeHandle={(e) => setPhone(e.target.value)}
          />
        </Section>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  )
}
