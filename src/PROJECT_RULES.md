# Clube App - Frontend Rules

## Objetivo do Projeto

Frontend web para gerenciamento de:
- usuários
- convidados
- convites
- comunicação interna do clube

Objetivos principais:
- simplicidade
- responsividade
- arquitetura organizada
- evolução gradual
- reutilização de componentes

---

# Stack

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS tradicional

---

# Regras Arquiteturais

## Pages

Pages devem:
- renderizar interface
- organizar fluxo visual

Pages NÃO devem:
- conter regras pesadas de negócio
- chamar API diretamente

---

## Hooks

Hooks são responsáveis por:
- regras
- controle de estado
- lógica da aplicação

Exemplos:
- useLoginController
- useLoginState
- useLoginActions

---

## Services

Services são responsáveis por:
- chamadas HTTP
- integração backend

Nunca chamar API diretamente dentro de pages/components.

---

## Context

AuthContext controla:
- autenticação global
- token
- sessão

O token é persistido no localStorage.

---

# Estrutura Atual

src/

components/
pages/
hooks/
services/
contexts/
routes/
styles/
types/

---

# Regras de Componentes

- Componentes devem ser reutilizáveis sempre que possível
- Evitar lógica pesada dentro de componentes
- Evitar inline styles
- Manter responsividade
- Utilizar TypeScript estrito

---

# Regras de Estilização

- Utilizar CSS organizado
- Manter padrão visual existente
- Evitar estilos duplicados
- Priorizar responsividade mobile

---

# Layout

AppLayout possui:
- sidebar desktop
- menu mobile
- overlay mobile
- scroll isolado

Não alterar estrutura principal do layout sem necessidade.

---

# Rotas

Rotas públicas:
- /login

Rotas privadas:
- /dashboard
- /invitations/list
- /invitations/new
- /messages

PrivateRoute protege autenticação.

---

# Regras IMPORTANTES para AI

- NÃO alterar arquitetura atual
- NÃO criar refactor global
- NÃO modificar autenticação sem solicitação
- NÃO criar novas dependências sem necessidade
- NÃO mudar estrutura de pastas existente
- NÃO remover padrões atuais

Sempre seguir os padrões já existentes no projeto.

---

# Objetivo Atual do MVP

Entregar um MVP funcional até quinta-feira contendo:
- login
- dashboard
- guests
- invitations
- messages

Prioridade:
- estabilidade
- fluxo funcional
- responsividade
- sensação de produto real

Não priorizar:
- arquitetura perfeita
- refactors grandes
- otimizações prematuras