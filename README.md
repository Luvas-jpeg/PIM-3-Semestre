# MediShop - PIM 3o Semestre

MediShop e uma aplicacao web full stack desenvolvida como projeto academico do PIM 3o Semestre. A plataforma simula um e-commerce para venda de equipamentos medicos e cursos presenciais na area da saude.

O projeto possui frontend em React, backend em ASP.NET Core Web API, autenticacao JWT, banco de dados relacional com Entity Framework Core e painel administrativo para gestao de produtos, cursos, alunos, pedidos e cupons promocionais.

> Este repositorio representa a versao academica/MVP do projeto. Uma evolucao para o PIM 4o Semestre esta planejada com foco em produto real, melhorias de seguranca, deploy, mobile, DevOps, pagamentos e SEO.

## Objetivo

Criar uma solucao digital para uma empresa ficticia/cliente do setor de saude, permitindo:

- Exibir equipamentos medicos e cursos presenciais.
- Permitir cadastro e login de usuarios.
- Gerenciar carrinho de compras.
- Registrar pedidos.
- Aplicar cupons promocionais.
- Administrar produtos, cursos, alunos e pedidos.
- Demonstrar integracao entre frontend, backend e banco de dados.

## Funcionalidades

### Area do cliente

- Catalogo de produtos e cursos.
- Busca e filtros por tipo de item.
- Pagina de detalhes.
- Carrinho persistido no navegador.
- Cadastro e login.
- Checkout com formas de pagamento simuladas.
- Aplicacao de cupom promocional.
- Perfil do usuario.
- Historico de pedidos.
- Visualizacao de cursos adquiridos.

### Area administrativa

- CRUD de equipamentos.
- CRUD de cursos.
- Gerenciamento de alunos.
- Gerenciamento de cupons promocionais.
- Acompanhamento de pedidos.
- Controle basico de usuarios autenticados.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI, lucide-react |
| Backend | ASP.NET Core Web API, C# |
| Banco de dados | PostgreSQL |
| ORM | Entity Framework Core |
| Autenticacao | JWT, BCrypt |
| Documentacao | Markdown |

## Estrutura

```txt
.
|-- backend/              # API ASP.NET Core
|   |-- Controllers/      # Rotas da API
|   |-- Data/             # DbContext
|   |-- DTOs/             # Contratos de entrada e saida
|   |-- Migrations/       # Migrations do Entity Framework
|   |-- Models/           # Entidades do dominio
|   `-- Program.cs        # Configuracao da aplicacao
|
|-- frontend/             # Aplicacao React/Vite
|   |-- src/app/components
|   |-- src/app/context
|   |-- src/app/lib
|   |-- src/app/pages
|   `-- src/app/routes.tsx
|
|-- docs/                 # Roteiros e documentos de apoio
`-- PIM-3-Semestre.sln
```

## Pre-requisitos

- .NET SDK compativel com o projeto.
- Node.js 20 ou superior.
- PostgreSQL.
- Git.

Use a versao de Node indicada em `.nvmrc`, quando aplicavel.

## Configuracao do backend

O backend nao deve versionar credenciais reais. Configure a connection string e o segredo JWT por variaveis de ambiente, user-secrets ou arquivo local nao versionado.

Exemplo de variaveis de ambiente:

```bash
ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=medishop;Username=postgres;Password=postgres"
Jwt__Secret="TroquePorUmaChaveLocalComMaisDe32Caracteres"
```

Tambem existe um modelo em:

```txt
backend/appsettings.Example.json
```

Para rodar o backend:

```bash
dotnet run --project backend/backend.csproj
```

Por padrao, a API roda em:

```txt
http://localhost:5278
```

## Configuracao do frontend

Instale as dependencias:

```bash
cd frontend
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrao, o frontend roda em:

```txt
http://localhost:5173
```

A URL da API pode ser configurada com:

```txt
VITE_API_BASE_URL=http://localhost:5278/api
```

## Endpoints principais

| Metodo | Rota | Descricao |
| --- | --- | --- |
| POST | `/api/Auth/cadastrar` | Cria usuario |
| POST | `/api/Auth/login` | Autentica usuario |
| GET | `/api/Products` | Lista produtos/cursos |
| GET | `/api/Products/{id}` | Busca produto/curso por ID |
| POST | `/api/Products` | Cria produto/curso |
| PUT | `/api/Products/{id}` | Atualiza produto/curso |
| DELETE | `/api/Products/{id}` | Remove produto/curso |
| POST | `/api/Orders` | Cria pedido |
| GET | `/api/Orders/my` | Lista pedidos do usuario |
| GET | `/api/Students` | Lista alunos |
| POST | `/api/Students` | Cria aluno |
| PUT | `/api/Students/{id}` | Atualiza aluno |
| DELETE | `/api/Students/{id}` | Remove aluno |
| GET | `/api/PromoCodes` | Lista cupons |
| GET | `/api/PromoCodes/validate` | Valida cupom |
| POST | `/api/PromoCodes` | Cria cupom |
| PUT | `/api/PromoCodes/{id}` | Atualiza cupom |
| DELETE | `/api/PromoCodes/{id}` | Remove cupom |

## Verificacao

Backend:

```bash
dotnet build backend/backend.csproj
```

Frontend:

```bash
cd frontend
npm run build
```

## Observacoes de seguranca

- Nao versionar senhas, tokens, secrets ou connection strings reais.
- Usar variaveis de ambiente ou user-secrets para configuracoes sensiveis.
- Trocar qualquer senha que ja tenha sido commitada antes de publicar o repositorio.
- Nao armazenar dados de cartao no sistema.
- Para uma versao comercial, integrar pagamentos por gateway externo e webhook.

## Limitacoes conhecidas

- O checkout atual e academico/simulado.
- A integracao real com pagamento ainda nao foi implementada.
- O design sera revisado na evolucao do PIM 4o Semestre.
- O SEO ainda precisa ser preparado para uma versao publica.
- O controle de permissoes pode ser fortalecido para producao.
- O projeto ainda precisa de uma estrategia formal de deploy, backup e monitoramento.

## Evolucao prevista para o PIM 4

- Redesign da interface.
- Melhorias no backend .NET.
- App mobile.
- Integracao com pagamento externo.
- Preparacao para hospedagem em VPS.
- SEO tecnico.
- Documentacao de projeto agil.
- Plano de negocio e proposta comercial.
- Melhorias de seguranca e permissao.

## Licenca

Projeto desenvolvido para fins academicos.
