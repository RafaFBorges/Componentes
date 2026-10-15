'use client'

import React, { useState } from 'react'
import {
  ThemeProvider,
  ThemeButton,
  ThemeText,
  ThemeToggle,
  StyledInput,
  PhoneInput,
  DateInput,
  DateValue,
  FrameworkInput,
  TagItem,
  TagList,
  Card,
  LoginForm,
  ModalProvider,
  useModal,
  useForm,
  FormInputField,
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

function ModalDemo() {
  const { config } = useTheme()
  const { openModal } = useModal()

  return (
    <ThemeButton clickHandle={() => openModal('Modal de exemplo', () => (
      <ThemeText textTag={TextTag.P} style={{ whiteSpace: 'normal', overflow: 'visible', color: config.fontColor }}>
        Conteúdo do modal.
      </ThemeText>
    ), (data) => alert('Salvou: ' + JSON.stringify(data)))}>
      Abrir modal
    </ThemeButton>
  )
}

function FormDemo() {
  const { config } = useTheme()

  const { renderForm, getFieldValue, addOrSetField, onFieldChange } = useForm({
    name: 'Playground',
    title: 'Formulário',
    subtitle: 'Exemplo de useForm',
    initialFields: [
      { position: 0, name: 'nome', label: 'Nome', type: 'text', value: '', isValid: null, section: 'Dados', validate: (v: string) => v.length >= 3 },
      { position: 1, name: 'email', label: 'Email', type: 'email', value: '', isValid: null, section: 'Dados', validate: validateEmail },
    ] as FormInputField[],
    handleChange: (name: string, value: string) => {
      onFieldChange()
      const { field } = getFieldValue(name, value)
      addOrSetField({ ...field, value, isValid: field.validate ? field.validate(value) : null })
    },
    processResponse: () => true,
    onSubmit: async (form) => form,
    onSuccess: () => <ThemeText>Enviado!</ThemeText>,
    submitLabel: 'Enviar',
    color: config.color,
  })

  return <div>{renderForm()}</div>
}

function Demo() {
  const { config, settedTheme, setTheme } = useTheme()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [date, setDate] = useState('')
  const [label, setLabel] = useState('')
  const [tags, setTags] = useState([
    { name: 'Mercado', disabled: false },
    { name: 'Transporte', disabled: true },
  ])

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

        <Section title="Data (DateInput + Calendar)">
          <DateInput
            name="data"
            value={date}
            changeHandle={(e) => setDate(e.target.value)}
            minDate={new DateValue('01', '01', '2020')}
          />
        </Section>

        <Section title="FrameworkInput">
          <FrameworkInput
            label="Texto"
            name="texto"
            type="text"
            value={label}
            changeHandle={(e) => setLabel(e.target.value)}
            labelColor={config.disabledFontColor}
            fontColor={config.fontColor}
          />
          <FrameworkInput label="Telefone" name="tel" type="tel" value="" changeHandle={() => { }} />
        </Section>

        <Section title="TagItem e TagList">
          <TagItem name="Tag solta" isDisabled={false} />
          <TagList
            tags={tags}
            emptyLabel="desconhecido"
            color={config.color}
            tagDefaultColor={config.tagDefaultColor}
            disabledFontColor={config.disabledFontColor}
            fontColor={config.fontColor}
            onTagClick={(i) => setTags(tags.map((t, j) => (i === j ? { ...t, disabled: !t.disabled } : t)))}
            onAdd={() => setTags([...tags, { name: 'Nova ' + tags.length, disabled: false }])}
          />
        </Section>

        <Section title="Card">
          <Card
            title="Compra de teste"
            date="14/10/2026"
            id={1}
            editClickHandle={(id) => alert('Editar ' + id)}
            deleteClickHandle={(id) => alert('Excluir ' + id)}
            backgroundColor={config.cardBackground}
            color={config.color}
            fontColor={config.fontColor}
            disabledFontColor={config.disabledFontColor}
          >
            <TagList tags={tags} DisabledHover tagDefaultColor={config.tagDefaultColor} disabledFontColor={config.disabledFontColor} fontColor={config.fontColor} />
          </Card>
        </Section>

        <Section title="Modal (ModalProvider + useModal)">
          <ModalDemo />
        </Section>

        <Section title="LoginForm">
          <LoginForm
            registerHRef="#"
            passwordForgetedHRef="#"
            color={config.color}
            fontColor={config.fontColor}
            disabledFontColor={config.disabledFontColor}
            onSubmit={(user) => alert('Login: ' + user)}
          />
        </Section>

        <Section title="Formulário (useForm)">
          <FormDemo />
        </Section>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Demo />
      </ModalProvider>
    </ThemeProvider>
  )
}
