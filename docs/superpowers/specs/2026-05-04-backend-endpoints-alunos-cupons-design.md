# Backend Endpoints para Alunos e Cupons

## Contexto

O frontend ainda possui dados mockados para alunos e codigos promocionais em `AdminContext.tsx`. Produtos, autenticacao e pedidos ja possuem cliente HTTP em `frontend/src/app/lib/api.ts`, mas a aplicacao ainda cai para `frontend/src/app/data/products.ts` quando a API falha.

O objetivo aprovado e remover os mocks do frontend criando endpoints reais no backend para alunos e cupons promocionais, mantendo o escopo pragmatica e compativel com o painel administrativo existente.

## Escopo

- Criar persistencia backend para alunos administrativos.
- Criar persistencia backend para codigos promocionais.
- Expor CRUD HTTP para alunos e cupons.
- Expor validacao de cupom para o checkout.
- Atualizar o frontend para consumir esses endpoints.
- Remover fallback de produtos mockados no fluxo principal.

## Fora de Escopo

- Refatorar alunos para usar `Inscricao` e `CourseClass`.
- Criar controle de perfil administrativo.
- Implementar processamento real de pagamento.
- Migrar hospedagem; Netlify continua sendo apenas candidato para frontend, enquanto Supabase/Postgres e usado pelo backend via connection string.

## Arquitetura

O backend adicionara modelos `Student` e `PromoCode`, ambos registrados no `AppDbContext` e versionados por migration do Entity Framework. Os controllers seguirao o padrao existente de `ProductsController`: leitura via `GET`, criacao via `POST`, edicao via `PUT` e remocao via `DELETE`, com escrita protegida por JWT.

O frontend manterá `AdminContext` como fachada de estado para as telas atuais, mas suas listas de produtos, alunos e cupons serao carregadas via `frontend/src/app/lib/api.ts`. Operacoes de criacao, edicao e exclusao passarao a ser async e refletirao a resposta do backend.

## Contratos

### Students

`Student` tera:

- `id`
- `name`
- `email`
- `phone`
- `courseId`
- `courseName`
- `enrollmentDate`
- `status`: `active`, `completed` ou `cancelled`

Endpoints:

- `GET /api/Students`
- `POST /api/Students`
- `PUT /api/Students/{id}`
- `DELETE /api/Students/{id}`

### PromoCodes

`PromoCode` tera:

- `id`
- `code`
- `discount`
- `discountType`: `percentage` ou `fixed`
- `startDate`
- `endDate`
- `isActive`
- `usageLimit`
- `usageCount`

Endpoints:

- `GET /api/PromoCodes`
- `POST /api/PromoCodes`
- `PUT /api/PromoCodes/{id}`
- `DELETE /api/PromoCodes/{id}`
- `GET /api/PromoCodes/validate?code=CODIGO`
- `POST /api/PromoCodes/{id}/use`

## Erros

O backend retornara `400` para dados invalidos, `404` para registros inexistentes, `409` para codigos promocionais duplicados e `401` quando uma rota protegida for chamada sem JWT valido.

O frontend exibira erros via `toast` onde ja existe esse padrao e manterá listas vazias quando uma carga inicial falhar, sem voltar para dados mockados.

## Testes e Verificacao

O repositorio nao possui projeto de testes backend nem runner de testes frontend configurado. A implementacao deve ser verificada com:

- `dotnet build backend/backend.csproj`
- `npm run build` dentro de `frontend`

Quando possivel, validacoes criticas devem ficar isoladas em metodos pequenos para facilitar testes futuros.
