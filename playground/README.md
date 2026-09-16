# Playground

App Next.js mínimo só para visualizar e testar os componentes do pacote
`@rafafborges/componentes` localmente, sem depender do projeto principal
(Minhas Contas Web).

## Onde colocar esta pasta

Este `playground/` deve ficar **dentro do repositório `Componentes`**, no
mesmo nível de `src/`, `package.json`, `tsconfig.json` etc:

```
Componentes/
├── src/
├── package.json
├── tsconfig.json
└── playground/        <- esta pasta
    ├── app/
    ├── package.json
    └── ...
```

Isso é necessário porque o `package.json` do playground referencia o pacote
via `"@rafafborges/componentes": "file:.."` (a pasta pai).

## Como rodar

```bash
cd playground
npm install
npm run dev
```

Abra http://localhost:3000 — vai aparecer uma tela com todos os componentes
exportados (`ThemeButton`, `ThemeText`, `Link`, `ThemeToggle`, `StyledInput`,
`PhoneInput`), incluindo um botão no topo para alternar entre tema claro e
escuro.

## Se você editar os componentes em `src/`

O Next com `transpilePackages` já observa os arquivos do pacote local e
recompila em hot-reload — não precisa reinstalar nada, só salvar o arquivo
em `../src/...` e o navegador atualiza sozinho.

Se o `npm install` não pegar uma alteração recente (raro, mas pode
acontecer com cache do `file:` link), rode:

```bash
rm -rf node_modules/.cache
npm install
```

## Dependências

As `peerDependencies` do pacote (`next`, `react`, `react-dom`,
`react-icons`, `tinycolor2`) já estão declaradas como dependências diretas
aqui no playground, então um único `npm install` resolve tudo.
