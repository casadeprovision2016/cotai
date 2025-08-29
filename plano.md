# Visão Geral do Projeto: Neuro-IA MVP

Este documento fornece uma visão geral completa do projeto Neuro-IA MVP, detalhando a arquitetura, tecnologias, estrutura de diretórios e componentes chave.

## 1. Arquitetura Geral

O projeto é uma aplicação web full-stack moderna, dividida em dois serviços principais:

-   **`frontend`**: Uma aplicação Next.js (React) responsável pela interface do usuário, autenticação e interação com os serviços de backend.
-   **`ai-service`**: Um serviço de backend em Python (FastAPI) que encapsula a lógica de negócio e a integração com modelos de Inteligência Artificial.

A comunicação entre o `frontend` e o `ai-service` é feita através de uma API RESTful. O banco de dados e a autenticação são gerenciados pelo **Supabase**.

## 2. Tecnologias Utilizadas

### Frontend (`@frontend/**`)

-   **Framework**: Next.js 14 (com App Router)
-   **Linguagem**: TypeScript
-   **Estilização**: Tailwind CSS
-   **UI Components**:
    -   `lucide-react` para ícones
    -   `react-hot-toast` para notificações
-   **Gerenciamento de Estado**: React Context API (para autenticação)
-   **Formulários**: `react-hook-form` com `yup` para validação
-   **Drag & Drop**: `@dnd-kit` para a funcionalidade de Kanban
-   **Linting**: ESLint

### Backend (`@ai-service/**`)

-   **Framework**: FastAPI (Python)
-   **Linguagem**: Python 3.12
-   **Banco de Dados**: PostgreSQL (via Supabase)
-   **Autenticação**: Supabase Auth
-   **IA & Processamento**:
    -   OCR e NLP para extração de dados de documentos
    -   Modelos de IA para análise e classificação

### Infraestrutura

-   **Containerização**: Docker e Docker Compose
-   **Banco de Dados & Auth**: Supabase
-   **CI/CD**: Configurado via `Makefile` e scripts shell

## 3. Estrutura de Diretórios (`@frontend/**`)

```
frontend/
├── public/
├── src/
│   ├── app/                # Rotas da aplicação (App Router)
│   │   ├── (auth)/         # Grupo de rotas para autenticação
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── app/            # Rotas protegidas (acessíveis após login)
│   │   │   ├── cad/        # Cadastros
│   │   │   │   ├── fornecedores/
│   │   │   │   └── produtos/
│   │   │   ├── config/
│   │   │   ├── cotai/
│   │   │   ├── mensagem/
│   │   │   ├── nlic/
│   │   │   ├── notificacoes/
│   │   │   └── perfil/
│   │   ├── api/            # API routes do Next.js (ex: proxy para o AI service)
│   │   ├── globals.css
│   │   └── layout.tsx      # Layout principal da aplicação
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── kanban/         # Componentes específicos do quadro Kanban
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── hooks/              # Hooks customizados
│   │   ├── useAuth.tsx
│   │   └── useAccessControl.ts
│   ├── lib/                # Configuração de bibliotecas (ex: cliente Supabase)
│   ├── services/           # Lógica de negócio e comunicação com APIs
│   ├── types/              # Definições de tipos TypeScript
│   └── utils/              # Funções utilitárias
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── next.config.ts          # Configuração do Next.js
```

## 4. Detalhamento das Páginas e Componentes

### Páginas de Autenticação (`src/app/(auth)/*`)

-   **/login**: Formulário de login com email/senha.
-   **/register**: Formulário de cadastro de novos usuários com validação de força de senha.
-   **/forgot-password**: Página para solicitar o link de redefinição de senha.
-   **/reset-password**: Página para definir uma nova senha a partir do link de recuperação.

#### Exemplo: Auth com Supabase (login, registro, recuperação de senha)
/* Adição: guia prático e pontos importantes para usar Supabase como BaaS de autenticação */
- Objetivo: usar Supabase Auth como BaaS para login (email+senha / magic link), registro e fluxo de recuperação de senha, com práticas seguras para frontend e backend.

- Fluxos (visão geral)
  - Registro (email + senha)
    - Cliente valida localmente (email RFC, força de senha) e opcionalmente reCAPTCHA.
    - Chamada ao supabase-js signUp (ou endpoint server-side que usa service_role para adicionar metadata segura).
    - Supabase envia e-mail de confirmação (configurar templates no painel Supabase).
    - UI: apresentar mensagem genérica ("verifique seu email") para evitar enumeração de contas.
  - Login (email + senha ou magic link)
    - Para senha: supabase.auth.signInWithPassword({ email, password }) no cliente.
    - Para magic link: supabase.auth.signInWithOtp({ email }) — escolha dependendo do UX.
    - Após login, armazenar sessão de forma segura:
      - Em SPA: deixar supabase-js gerenciar (armazenamento em memória) e sincronizar com cookies HttpOnly via rota server-side.
      - Em Next.js: enviar session para server e set-cookie Secure HttpOnly SameSite=strict para uso SSR.
  - Recuperação de senha
    - Cliente solicita reset (fornece email + reCAPTCHA).
    - Chamar endpoint que dispara e-mail de recuperação (via supabase-auth).
    - Link de reset redireciona para /reset-password com token; cliente chama a API server-side para confirmar e trocar a senha.
    - Server deve revogar sessions anteriores após troca de senha.

- Exemplo (pseudo-código cliente)
  - Registro (exemplo simplificado / pseudo):
    ```ts
    // pseudo: cliente (react)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { company_id_temp, consent_timestamp } } // USAR server-side para dados sensíveis
    });
    // mostrar mensagem genérica e instruções
    ```
  - Login (pseudo):
    ```ts
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // trocar session local por cookie seguro via rota /api/auth/session (server-side)
    ```
  - Solicitar reset (pseudo):
    ```ts
    // pedir reCAPTCHA -> depois:
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${APP_URL}/reset-password` });
    // ou chamar endpoint server-side que aciona o e-mail de reset
    ```

- Responsabilidades e segurança
  - Nunca expor service_role key no frontend. Operações sensíveis (atribuir roles, criar company_members, emitir signed upload para buckets privados) devem ser feitas server-side.
  - Use server-side routes / Edge Functions para:
    - Gerar cookies HttpOnly com session JWT (SSR).
    - Regras de login/registro que exigem verificação extra (ex.: anti-fraud, PNCP lookup).
    - Enviar signed URLs para uploads e pós-processamento (malware scan).
  - Cookies e tokens:
    - Cookies: HttpOnly, Secure, SameSite=strict, path=/; TTL curto.
    - Refresh tokens: armazenar e rotacionar; revogar em casos sensíveis (reset de senha).
  - Proteções adicionais:
    - Rate limiting por IP / por endpoint (registro, login, reset).
    - Proteção contra enumeração (respostas uniformes).
    - ReCAPTCHA em endpoints públicos (registro, reset).
    - Força de senha e validação client-side + server-side.
    - Auditoria: registrar eventos (login success/fail, password resets) em audit_log.
    - Account lockout e cooldown após N falhas (logar tentativas e notificar).
    - 2FA/OTP opcional para ações sensíveis (PIN, alterações de dados críticos).

- Boas práticas de integração com Next.js
  - SSR: validar session server-side usando cookie + verificar JWT com Supabase.
  - Middleware.ts: redirecionar rotas protegidas, renovar sessão quando necessário.
  - Server Actions / API routes: executar operações com service_role (criação de company, hashing de PIN com Argon2, emitir signed uploads).
  - E-mails e templates: personalizar no painel Supabase; garantir links de callback (redirectTo) seguros.

- UX e acessibilidade
  - Mensagens genéricas para ações sensíveis (evitar enumeração).
  - Feedback claro: loaders, erros acessíveis (aria-live), foco no primeiro campo inválido.
  - Requisições idempotentes: evitar duplicação de cadastro por múltiplos cliques.
  - Mostrar instruções para verificação por e-mail e próximos passos (ex.: se documento necessário).

- Checklist resumido (implementação)
  1. Implementar signUp/signIn usando supabase-js + validações (react-hook-form + yup).
  2. Implementar rota server-side para setar cookie HttpOnly e trocar sessions para SSR.
  3. Adicionar reCAPTCHA em forms públicos (registro, reset).
  4. Adicionar rate limiting e uniform responses no servidor.
  5. Configurar email templates e redirectTo corretos no Supabase.
  6. Logar eventos críticos em audit_log e implementar revogação de sessions em reset de senha.

### Páginas Protegidas (`src/app/app/*`)

-   **/app**: Dashboard principal com estatísticas e atividades recentes.
-   **/app/nlic**: Módulo de busca e gerenciamento de licitações (NLIC).
-   **/app/cotai**: Quadro Kanban para gerenciamento de cotações com IA.
-   **/app/mensagem**: Interface de mensagens internas.
-   **/app/notificacoes**: Central de notificações do sistema.
-   **/app/cad/fornecedores**: Cadastro e gerenciamento de fornecedores.
-   **/app/cad/produtos**: Cadastro e gerenciamento de produtos.
-   **/app/perfil**: Página de gerenciamento do perfil do usuário.
-   **/app/config**: Configurações gerais do sistema.

### Componentes Chave (`src/components/`)

-   **`Header`**: Cabeçalho da aplicação com busca, notificações e menu do usuário.
-   **`Sidebar`**: Menu de navegação lateral, responsivo e modular.
-   **`Card`**: Componente genérico para exibir conteúdo em blocos.
-   **`KanbanBoard`**: Componente principal do quadro Kanban, gerencia o estado e a lógica de arrastar e soltar.
-   **`KanbanColumn`**: Representa uma coluna no quadro (ex: "Recebidos", "Em Análise").
-   **`KanbanCard`**: Representa um item de cotação dentro de uma coluna.
-   **`SecureDocumentUpload`**: Componente para upload de arquivos com criptografia AES-256 e integração com o Supabase Storage.
-   **`PasswordConfirmationModal`**: Modal para confirmar ações críticas (como mover um card) através de senha.

### Página de Cadastro de Empresas (Licitações Públicas)
/* Adicionado: detalhes derivados de 1.2-register.md */
- Objetivo: permitir que empresas se cadastrem para participar de licitações, com validações, compliance (Lei 14.133/2021), LGPD e integrações com PNCP/Receita.

- Fluxo UX (wizard - mobile-first):
  1. Dados básicos (CNPJ, razão social, nome fantasia)
  2. Endereço (CEP -> auto-complete via ViaCEP)
  3. Contato (email, telefone, consentimentos LGPD)
  4. Uploads de documentos e logotipo (signed upload)
  5. Definir PIN (6–8 dígitos) e confirmar
  6. Escolher plano (Free/Starter/Premium)
  7. Revisão e submissão (cria company_revisions + audit_log)
  8. Status de verificação (PNCP/Receita automático; se inconclusivo -> revisão manual)

- Campos principais e validações (client + server):
  - Identificação:
    - razao_social (string, obrigatório)
    - nome_fantasia (opcional)
    - cnpj (somente dígitos, obrigatório) — validar algoritmo CNPJ client-side e server-side; checar existência via API oficial (PNCP/Receita) server-side.
  - Endereço:
    - cep, logradouro, numero, complemento, bairro, cidade, estado (UF)
    - Autocompletar via ViaCEP e bloquear inconsistências cidade/UF.
  - Contato:
    - email_principal: validar RFC-5322; opcional checagem MX server-side.
    - telefone_principal: E.164 preferido; máscara no cliente.
    - consentimento_communications: boolean com timestamp (armazenar para LGPD).
  - Metadados administrativos:
    - codigo_pncp[] (código + descricao), natureza_juridica, porte_empresa.
  - PIN:
    - PIN numérico 6–8 dígitos; confirmação dupla no cadastro; client-side validar formato; server-side receber PIN e armazenar apenas hash (Argon2 recomendado).
    - Implementar rate limit e cooldown no servidor; registrar tentativas em audit_log.

- Uploads de documentos:
  - Tipos permitidos: image/jpeg, image/png, application/pdf, (image/tiff opcional).
  - Limites por plano (ex.: Free imagens <=5MB, Premium <=20MB).
  - Fluxo seguro:
    1. Cliente pede signed upload a uma API/Edge Function (server-side) -> TTL curto.
    2. Cliente faz PUT/POST direto para Supabase Storage com signed URL.
    3. Pós-processamento server-side: valida MIME real, tamanho, calcula sha256, gera thumbnails e aciona malware-scan.
    4. Registrar metadata (file_hash, company_id, uploaded_by, version) e mover para bucket privado.
  - UI: componente SecureDocumentUpload integrado com react-hook-form; mostrar progresso, validações de tamanho/tipo e preview.

- Planos e limites:
  - Campos: plan (enum), plan_started_at, plan_expires_at, features_limits (json).
  - Regras: cliente mostra mensagens/CTA para upgrade; servidor retorna 403 ao tentar acessar recurso premium sem permissão.

- Segurança, RBAC e RLS:
  - Tráfego sempre sobre TLS.
  - Tokens: cookies HttpOnly Secure SameSite=strict; não expor service_role keys no frontend.
  - RBAC roles: superadmin, auditor, company_admin, company_user.
  - Frontend: useAuth + useAccessControl para esconder ações; chamadas sensíveis via endpoints server-side (service_role).
  - Exemplos de políticas: usar company_members + RLS em Postgres (implementação server-side). Frontend confia nos endpoints protegidos.

- Validações e integridade:
  - Repetir todas as validações no servidor (CNPJ ativo, CEP consistente).
  - DB constraints: UNIQUE(cnpj), NOT NULL e triggers para criar company_revisions/audit_log (documentado para backend).
  - Mostrar erros detalhados no cliente com foco em acessibilidade (aria-live, foco no primeiro erro).

- Integrações externas:
  - PNCP/Receita: chamadas server-side (Edge Functions) com credenciais seguras.
  - Autocomplete PNCP: frontend fornece autocomplete/lookup consultando API server-side com cache.

- Auditoria e versionamento:
  - Após submissão criar company_revisions (snapshot JSONB), e registrar eventos críticos em audit_log (login, tentativas PIN, mudanças de plano, uploads).
  - Mostrar no frontend histórico básico de revisões e status de verificação.

- Exemplo de responsabilidades entre frontend/backend:
  - Frontend:
    - Formulários (react-hook-form + yup), máscaras, previews de uploads, wizard, chamadas para signed URLs e endpoints protegidos.
  - Backend (documentado para equipe backend):
    - Validar CNPJ via Receita/PNCP, criar hashes de PIN (Argon2), emitir signed uploads, pós-processar arquivos, aplicar RLS, criar company_revisions/audit_log, enforçar limites de plano.

- Acessibilidade e UX:
  - Labels vinculados, mensagens de erro acessíveis, resumo antes do submit, navegação por teclado e foco em erros.
  - Mobile-first: single-column em mobile; progress indicator do wizard.    

- Tarefas prioritárias para o frontend (implementação):
  1. Criar rota /app/cad/fornecedores (ou /app/cad/empresas) com wizard de múltiplos passos.
  2. Implementar validadores client-side para CNPJ, CEP, email e telefone.
  3. Integrar SecureDocumentUpload com chamadas a API de signed upload.
  4. Integrar fluxo de PIN: captura, confirmação e chamada para endpoint que faz hash/armazenamento.
  5. Consumir endpoints server-side para PNCP/Receita e exibir pré-fill baseado no CNPJ.
  6. Implementar telas de erro/estado (rejeitado, em revisão, aprovado).
  7. Implementar componentes para histórico (company_revisions) e notificações de status.

### NLlC: Sistema de Buscas (Contratações & Propostas Abertas)
/* Nova seção: detalha busca baseada em 6.3 e 6.4 do nlic.md */
- Objetivo: permitir buscas avançadas e paginadas sobre contratações publicadas e contratações com período de recebimento de propostas em aberto (PNCP endpoints v1/contratacoes/publicacao e v1/contratacoes/proposta).

- Filtros principais (UI)
  - dateInicial / dateFinal — seleção por datepicker; enviar ao backend no formato AAAAMMDD (ex.: 20230801).
  - codigoModalidadeContratacao (enum) — autocomplete/select usando catálogo local ou API server-side.
  - codigoModoDisputa (opcional)
  - uf (sigla) / codigoMunicipioIbge
  - cnpj (órgão) / codigoUnidadeAdministrativa / idUsuario
  - pagina (inteiro) e tamanhoPagina (padrão 50, max 500)
  - pesquisa livre por texto (objetoCompra / nomeFornecedor) com debounce

- Responsabilidades Frontend
  - Validação dos campos (datas, formato AAAAMMDD, CNPJ dígitos).
  - UX: form reativo com debounce, loaders, mensagens acessíveis (aria-live) e foco no primeiro erro.
  - Paginação: exibir totalRegistros / totalPaginas / pagina atual / navegação (prev/next/jump-to).
  - Deep-linking: refletir filtros e página na query string (permitir compartilhamento e back/forward).
  - Renderização dos resultados: cards ou tabela com campos chave (numeroControlePNCP, objetoCompra, dataPublicacaoPncp, valor estimado, orgaoEntidade).
  - Tratar respostas 200/204/422/500 e exibir mensagens apropriadas.
  - Export CSV / Download: solicitar exportação server-side (paginada) para evitar timeouts.

- Responsabilidades Backend (Next.js API routes / Edge Functions)
  - Agir como proxy para PNCP (esconder BASE_URL/credentials), injetar headers necessários e aplicar rate limiting.
  - Converter query params do cliente para o formato aceito pelo PNCP (AAAAMMDD, pagina/tamanhoPagina).
  - Implementar cache por query (ex.: Redis) com TTL curto e invalidação baseada em headers (ETag/Last-Modified quando disponível).
  - Implementar circuit breaker / backoff em caso de 429/5xx do PNCP.
  - Mapear códigos de domínio (modalidadeId, modoDisputaId, etc.) e devolver descrições junto com os dados.
  - Prover endpoints:
    - GET /api/pncp/contratacoes?dateInicial=...&dateFinal=...&...  -> proxy para /v1/contratacoes/publicacao
    - GET /api/pncp/propostas?dataFinal=...&... -> proxy para /v1/contratacoes/proposta
    - POST /api/pncp/export -> iniciar job de exportação CSV (assíncrono), retornar jobId

- Formato esperado e paginação
  - Usar os campos retornados por PNCP: numeroControlePNCP, objetoCompra, dataAberturaProposta, dataEncerramentoProposta, dataPublicacaoPncp, orgaoEntidade.{cnpj,razaoSocial}, valorTotalEstimado, situacaoCompraNome.
  - Ler meta: totalRegistros, totalPaginas, numeroPagina, paginasRestantes e exibir no UI.
  - Lidar com resposta 204 (No Content) mostrando estado vazio/CTA para ampliar filtro.

- UX / Performance
  - Debounce das buscas livres (300–500ms).
  - Pré-busca de domínios (modalidades, modos de disputa) em cache local na inicialização da página.
  - Infinite scroll opcional com prefetch da próxima página.
  - Indicar limites de paginação e permitir jump-to-page.
  - Mostrar nota sobre possível latência do PNCP e permitir retry manual.

- Acessibilidade e mensagens de erro
  - Mensagens uniformes para erros públicos (evitar detalhe que exponha backend).
  - Mensagens amigáveis para problemas de validação (datas inválidas, dataInicial > dataFinal).
  - Fornecer link para documentação PNCP e número de contato de suporte quando apropriado.

- Segurança e boas práticas
  - Nunca chamar PNCP diretamente do cliente; usar rota server-side para esconder chaves/BASE_URL.
  - Rate limit por IP e autenticação para endpoints que acessam PNCP (limitar abuso).
  - Log de queries importantes em audit_log (apenas metadados; não armazenar PII sem consentimento).
  - Cache resultados públicos e revalide periodicamente.

- Exemplo de fluxo (resumido)
  1. Usuário preenche datepickers e escolhe modalidade → frontend validates and serializes dates to AAAAMMDD.
  2. Frontend calls GET /api/pncp/contratacoes?dateInicial=YYYYMMDD&dateFinal=YYYYMMDD&codigoModalidadeContratacao=8&pagina=1.
  3. Server-side proxy fetches PNCP, caches response, maps domain codes to names, returns standardized payload + pagination metadata.
  4. Frontend renders results, updates URL query string, enables pagination/export.

- Tarefas prioritárias para implementação (frontend)
  1. Criar rota /app/nlic/search com componentes: NlicSearchForm, NlicResultsList, Pagination, ExportButton.
  2. Implementar client-side validators e date -> AAAAMMDD transformer.
  3. Implementar deep-linking (useSearchParams / router.replace).
  4. Implementar debounced text search e prefetch da próxima página.
  5. Consumir /api/pncp/contratacoes e /api/pncp/propostas (server-side proxies).
  6. Testar handling de 204 / 422 / 500 e latência do PNCP; exibir mensagens adequadas.

### Resumo rápido do CotAI
- O que é: módulo Kanban para gerenciamento de cotações (CotAI) integrado ao Neuro-IA MVP — UI em Next.js e processamento IA em FastAPI.
- Objetivo: acelerar triagem, extração e classificação de documentos de cotação usando OCR/NLP, com fluxos colaborativos em tempo real e controles de segurança/compliance.
- Arquitetura: frontend Next.js (TypeScript + Tailwind) <-> ai-service (FastAPI) via API proxy; dados e autenticação gerenciados pelo Supabase (Postgres, Auth, Storage, Realtime).
- Funcionalidades chave:
  - Quadro Kanban com drag&drop (@dnd-kit): colunas, cartões de cotação e ordenação por posição.
  - Uploads seguros (Supabase Storage, AES-256 recomendado) + processamento IA (OCR/NLP) para preencher campos automaticamente.
  - RBAC e RLS (useAccessControl / rbacService) — ações habilitadas por permissões; PIN/confirm modal para ações críticas.
  - Sincronização em tempo real via Supabase Realtime para atualizações instantâneas entre colaboradores.
  - Histórico e auditoria por item (company_revisions / audit_log).
- Componentes principais: KanbanBoard, KanbanColumn, KanbanCard, SecureDocumentUpload, Header, Sidebar, modais (Password/PIN), hooks (useAuth, useAccessControl, useSupabaseRealtimeSync).
- Banco de dados (Supabase Postgres) — tabelas essenciais:
  - users, boards, lists, cards, comments, attachments, company_revisions, audit_log.
  - Recursos: soft-delete (deleted_at), position ordering, labels/checklists opcionais.
- Autenticação e segurança:
  - Supabase Auth (email/senha), cookies HttpOnly Secure SameSite=strict para SSR.
  - Service_role keys apenas server-side; signed uploads e pós-processamento server-side (malware-scan, thumbnails, hash).
- Armazenamento e arquivos:
  - Anexos em Supabase Storage, buckets privados, acesso via URLs assinadas com TTL curto.
- Backend & IA:
  - FastAPI para orquestração IA (OCR/NLP), validações, jobs assíncronos e integração com serviços externos.
  - Server-side responsibilities: validações sensíveis, hashing Argon2, emitir signed URLs, políticas RLS e jobs de export.
- Frontend & UX:
  - React + Tailwind, react-hook-form + yup, UX mobile-first, acessibilidade (aria-live, foco em erros).
  - Bibliotecas úteis: @dnd-kit (drag&drop), @tanstack/react-query (cache), shadcn/ui ou componentes próprios.
- Recursos de desenvolvimento & integração rápida:
  - Reutilizar padrões Supabase (Realtime + RLS + Storage) para simplificar sincronização e segurança.
  - Estruturar rotas API server-side para proxy/normalize dados externos (PNCP) e proteger credenciais.
  - Prioridades de implementação: CRUD de boards/lists/cards, upload seguro + pipeline IA, subscrição realtime, políticas RLS e controles de acesso.

## 5. Serviços e Lógica de Negócio (`src/services/`)

-   **`supabaseService.ts`**: Centraliza todas as interações com o banco de dados Supabase (CRUD, queries).
-   **`aiProcessingService.ts`**: Orquestra o processo de análise de documentos, combinando upload seguro, OCR e NLP.
-   **`secureStorageService.ts`**: Gerencia o upload de arquivos com criptografia ponta-a-ponta.
-   **`rbacService.ts`**: Implementa a lógica de Controle de Acesso Baseado em Papéis (RBAC), definindo permissões para diferentes tipos de usuários.
-   **`databaseChecker.ts`**: Verifica a existência das tabelas no banco de dados e permite um fallback gracioso para modo de demonstração (usando `postgresql supabase`).

## 6. Fluxo de Dados e Autenticação

1.  **Autenticação**: O `useAuth` hook gerencia o estado de autenticação do usuário, utilizando o `AuthProvider` para prover o contexto para toda a aplicação.
2.  **Proteção de Rotas**: O `middleware.ts` intercepta as requisições, verifica a sessão do usuário com o Supabase e redireciona para `/login` se o acesso a uma rota protegida for negado.
3.  **Interação com API**: As chamadas para o `ai-service` são feitas através de um proxy de API no Next.js (`src/app/api/ai-proxy/**`), garantindo que as chaves de API do backend não sejam expostas no cliente.
4.  **Sincronização em Tempo Real**: O hook `useSupabaseRealtimeSync` utiliza os canais do Supabase para manter o quadro Kanban atualizado em tempo real entre diferentes usuários.

## 7. Como Executar o Projeto

1.  **Configurar Variáveis de Ambiente**:
    -   Copie o arquivo `.env.example` para `.env.local`.
    -   Preencha as variáveis com as suas chaves do Supabase.

2.  **Instalar Dependências**:
    ```bash
    npm install
    ```

3.  **Executar em Modo de Desenvolvimento**:
    ```bash
    npm run dev
    ```

4.  **Build de Produção**:
    ```bash
    npm run build
    ```
