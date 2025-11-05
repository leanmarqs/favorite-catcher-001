# React Project Template

Um template moderno para projetos React com Vite, TypeScript, Tailwind CSS v4, ESLint (Flat Config) e Prettier — já configurado com convenções opinadas de código.

**Stacks e libs principais**
- Vite 7 (dev server e build) — `vite.config.ts:1`
- React 19 + React Router DOM — `package.json:17`, `package.json:19`
- TypeScript 5 — `tsconfig.json:1`
- Tailwind CSS v4 + plugin oficial para Vite — `vite.config.ts:4`, `src/index.css:1`
- ESLint 9 (Flat Config) com TypeScript, React Hooks, React Refresh — `eslint.config.js:1`
- Prettier com convenções do projeto — `.prettierrc:1`

**Requisitos**
- Node.js 18+ (recomendado LTS mais recente)
- npm (ou pnpm/yarn, se preferir)

**Primeiros passos**
- Instalar dependências: `npm install`
- Ambiente de desenvolvimento: `npm run dev` (abre o Vite em modo dev)
- Lint do código: `npm run lint` (usa `eslint .`)
- Build de produção: `npm run build` (roda `tsc -b` e `vite build`)
- Preview do build: `npm run preview`

**Formatador (Prettier)**
- O projeto usa Prettier com as regras: sem ponto e vírgula e aspas simples (inclui JSX).
- Rodar sem instalar (via npx): `npx prettier . --write`
- Opcional instalar localmente: `npm i -D prettier`
- Verificar sem alterar: `npx prettier . --check`
- Ignore do Prettier: `.prettierignore:1` (ignora `node_modules`, `dist`, `build`, etc.)

**Lint (ESLint)**
- Configuração: `eslint.config.js:8`
- Regras de estilo principais:
  - Aspas simples: `quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }]` — `eslint.config.js:23`
  - Aspas simples em JSX: `'jsx-quotes': ['error', 'prefer-single']` — `eslint.config.js:24`
  - Sem ponto e vírgula: `@typescript-eslint/semi: ['error', 'never']` (e `semi: 'off'`) — `eslint.config.js:26`
- Ignorados globalmente: `dist` — `eslint.config.js:9`
- Corrigir automaticamente: `npx eslint . --fix`

**Tailwind CSS v4**
- Integração via plugin oficial: `vite.config.ts:4`
- Estilos base: importados em `src/index.css:1` com `@import 'tailwindcss';`
- Animações utilitárias: `tw-animate-css` importado em `src/index.css:2`

**TypeScript**
- Projeto referenciado (app/node) — `tsconfig.json:3`
- Config da aplicação: `tsconfig.app.json:1` (JSX `react-jsx`, `strict: true`)
- Alias `@` para `src`: configurado no Vite e TypeScript — `vite.config.ts:10`, `tsconfig.json:9`

**Scripts disponíveis**
- `dev`: inicia o servidor Vite — `package.json:7`
- `build`: compila TypeScript (`tsc -b`) e gera build — `package.json:8`
- `lint`: executa ESLint — `package.json:9`
- `preview`: serve a pasta `dist` — `package.json:10`

**Criar um novo repositório a partir deste template**

- No GitHub, acesse a página deste repositório e clique em "Use this template" > "Create a new repository".
- Defina o nome do repositório, escolha a visibilidade (Public/Private) e confirme em "Create repository".
- Na página do novo repositório, clique em "Code" e copie a URL (HTTPS ou SSH).
- `npm install`
- Opcional: `npx prettier . --write` e `npx eslint . --fix` para padronizar o código local
- `npm run dev` e abra a URL indicada (por padrão, `http://localhost:5173`)

**Dicas**
- Se o Vite não iniciar, verifique a versão do Node (`node -v`) — use 18+.
- Caso o Prettier não esteja instalado, use `npx prettier . --write` ou adicione como devDependency.
- Para importar com alias: `import Foo from '@/path/para/Foo'` (resolvido para `src/`).

**Estrutura rápida**
- Código-fonte: `src/`
- Estilos globais: `src/index.css`
- Configurações: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`

Fique à vontade para adaptar as convenções conforme a necessidade do seu time.

**Providers de Tema e Idioma**
- Providers prontos para tema (light/dark/system) e idioma (en-US/pt-BR).
- Já integrados em `src/app/App.tsx:7`.
- Componentes utilitários inclusos: `ThemeSelector` e `LanguageSelector`.

**Tema (ThemeProvider)**
- Arquivos: `src/providers/themes/ThemeProvider.tsx`, `src/providers/themes/themeContext.ts`.
- API de contexto (`ThemeContextValue`):
  - `theme: 'light' | 'dark' | 'system'`
  - `toggleTheme(): void`
  - `setTheme(t: Theme): void`
- Comportamento:
  - Aplica/Remove a classe `dark` no `document.documentElement` conforme seleção ou preferência do sistema quando em `system`.
  - Suporta Tailwind `dark:` para estilos condicionais.
- Uso no app (já configurado):
  - Envolve a aplicação em `ThemeProvider` em `src/app/App.tsx:8`.
- Exemplo de consumo:
  - `import { useContext } from 'react'`
  - `import { ThemeContext } from '@/providers/themes'`
  - `const { theme, toggleTheme, setTheme } = useContext(ThemeContext)`

**Idioma (LanguageProvider)**
- Arquivos: `src/providers/languages/LanguageProvider.tsx`, `src/providers/languages/languageContext.tsx`.
- API de contexto (`LanguageContextValue`):
  - `locale: 'en-US' | 'pt-BR'`
  - `setLocale(l: Locale): void`
  - `toggleLocale(): void`
- Mensagens de i18n:
  - Base em `src/lib/i18n/` com `messages` mapeando `en-US` e `pt-BR`.
  - Exemplo de uso: veja `src/pages/HelloWeirdo.tsx:9`.
- Uso no app (já configurado):
  - `LanguageProvider` envolve as rotas em `src/app/App.tsx:9`.

**Componentes de UI**
- `src/components/ui/ThemeSelector.tsx`
  - Alterna entre `light` e `dark` rapidamente.
  - Usa `ThemeContext` sob o capô.
- `src/components/ui/LanguageSelector.tsx`
  - Abre um menu para `en-US` e `pt-BR`.
  - Usa `LanguageContext` e atualiza o rótulo conforme o locale atual.

**Como adicionar novos idiomas**
- Crie um arquivo em `src/lib/i18n/` (ex.: `es-ES.ts`) exportando o objeto de mensagens com a mesma estrutura de `en-US.ts`.
- Atualize `src/lib/i18n/index.ts` adicionando a chave no objeto `messages`.
- Ajuste o tipo `Locale` em `src/providers/languages/languageContext.tsx` para incluir o novo código.
- Opcional: atualize `LanguageSelector` para exibir a opção no menu.

**Dicas de estilo com tema**
- Utilize variantes `dark:` do Tailwind v4 (classe `dark` já é controlada pelo `ThemeProvider`).
- Exemplo: `className="bg-white text-black dark:bg-zinc-900 dark:text-zinc-100"`.
