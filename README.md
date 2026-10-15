# Componentes

Kit de interface reutilizável extraído do Minhas Contas Web: botão, texto, link, toggle, inputs, calendário, modal, popup, cards, tags, formulário em seções, login, tema claro/escuro e validações.

Uso no app (submódulo):

```ts
import { ThemeProvider, ThemeButton, StyledInput } from '@rafafborges/componentes'
```

## Padrão: componente "theme-less" + wrapper no app

Os componentes deste pacote **não leem o tema nem a tradução do app**. Cores, labels e callbacks entram por props, sempre com um valor padrão razoável. Quem conhece o tema (`useTheme`) e a tradução (`useTranslate`) é um wrapper fino no projeto principal, que só repassa os valores.

```tsx
// pacote: não conhece o tema
<Modal saveLabel="Salvar" cancelLabel="Cancelar" backgroundColor="#fff" color="#0070f3" ... />

// app: wrapper lê o tema/tradução e repassa
export default function ThemeTagItem(props: TagItemProps) {
  const { config } = useTheme()
  return <TagItem defaultColor={config.tagDefaultColor} fontColor={config.fontColor} {...props} />
}
```

Consequências para quem for adicionar algo aqui:

- Não importe `useTheme`/`useTranslate`/cookies/router do app. Se precisar de cor ou texto, crie uma prop.
- Estado ou persistência do app (usuário, cookies, chamadas de API) fica no app; o pacote recebe callbacks (`onSubmit`, `onAdd`, `onTagClick`...).
- Para trocar uma peça interna, injete o componente por prop (ex.: `Calendar` em `DateInput`, `inputs` em `FrameworkInput`, `InputComponent` em `useViewForm`).

## Componentes

| Grupo | Exports |
|---|---|
| Básicos | `StyledButton`, `WindowButton`, `Text`/`TextTag`, `Link`, `Toggle` |
| Inputs | `StyledInput`, `PhoneInput`, `SpinInput`, `PasswordInput`, `DateInput`/`DateValue`, `Calendar`, `FrameworkInput` (label + input resolvido por `type`, registry injetável via `inputs`) |
| Feedback | `Popup` + `PopupProvider`/`usePopup`, `Modal` + `ModalProvider`/`useModal` |
| Listas e cartões | `TagItem`, `TagList`, `Card` (tags entram como `children`) |
| Formulários | `useForm` (estado + validação; envio via `onSubmit`), `useViewForm` (renderização em seções com paginação), `usePagination`, `LoginForm` |
| Tema | `ThemeProvider`/`useTheme`, `ThemeButton`, `ThemeText`, `ThemeToggle` |
| Utilitários | `lightenCor`, `isLight`, `getSideColor`, `validateEmail`, `validateDate`, `notEmpty`, `validateStrongPassword`, `isLeapYear`, `encrypt`, `decrypt` |

Veja `playground/` para um exemplo de cada componente.
