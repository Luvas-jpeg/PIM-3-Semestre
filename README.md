# MediShop - PIM 3º Semestre

MediShop é uma aplicação web para venda de equipamentos médicos e cursos presenciais na área da saúde. O projeto combina um frontend em React com uma API ASP.NET Core, usando PostgreSQL via Entity Framework Core.

## Funcionalidades

- Catálogo público de equipamentos e cursos.
- Busca e filtro por tipo de item.
- Detalhe de produto/curso.
- Carrinho de compras persistido no navegador.
- Cadastro e login com autenticação JWT.
- Fechamento de pedido somente para usuários autenticados.
- Painel administrativo para criar, editar e excluir equipamentos e cursos.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Radix UI, lucide-react |
| Backend | ASP.NET Core Web API, C# |
| Banco de dados | PostgreSQL |
| ORM | Entity Framework Core |
| Autenticação | JWT + BCrypt |

## Estrutura do Projeto

```text
.
├── backend/              # API ASP.NET Core
│   ├── Controllers/      # Auth, Products e Orders
│   ├── Data/             # AppDbContext
│   ├── DTOs/             # Contratos de entrada/saida
│   ├── Migrations/       # Migrations do Entity Framework
│   └── Models/           # Entidades do dominio
├── frontend/             # Aplicacao React/Vite
│   ├── src/app/components
│   ├── src/app/context
│   ├── src/app/lib       # Cliente HTTP da API
│   └── src/app/pages
└── PIM-3-Semestre.sln
```

## Pré-requisitos

- .NET SDK 10.
- Node.js 20 ou superior. O projeto usa Vite 6 e React Router 7, que não funcionam corretamente em Node 16.
- PostgreSQL acessível pela connection string do backend.

## Configuração do Backend

O backend lê a connection string em `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Port=5432;Database=...;User Id=...;Password=...;"
  }
}
```

Para ambiente local, o ideal é mover credenciais sensíveis para `appsettings.Development.json`, variáveis de ambiente ou user-secrets do .NET.

Ao iniciar, a API executa automaticamente as migrations:

```bash
dotnet run --project backend/backend.csproj
```

Por padrão, a API sobe em:

```text
http://localhost:5278
```

## Configuração do Frontend

Instale as dependências:

```bash
cd frontend
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrão, o frontend sobe em:

```text
http://localhost:5173
```

O frontend usa `http://localhost:5278/api` como URL padrão da API. Para alterar:

```bash
VITE_API_BASE_URL=http://localhost:5278/api npm run dev
```

## Como Rodar o Projeto

Em um terminal, inicie o backend:

```bash
dotnet run --project backend/backend.csproj
```

Em outro terminal, inicie o frontend:

```bash
cd frontend
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Endpoints Principais

### Autenticação

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/Auth/cadastrar` | Cria um novo usuário |
| POST | `/api/Auth/login` | Autentica e retorna JWT |

### Produtos e Cursos

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api/Products` | Lista todos os produtos/cursos |
| GET | `/api/Products?tipo=equipment` | Lista equipamentos |
| GET | `/api/Products?tipo=course` | Lista cursos |
| GET | `/api/Products/{id}` | Busca item por ID |
| POST | `/api/Products` | Cria item autenticado |
| PUT | `/api/Products/{id}` | Atualiza item autenticado |
| DELETE | `/api/Products/{id}` | Remove item autenticado |

### Pedidos

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/Orders` | Cria pedido autenticado |
| GET | `/api/Orders/my` | Lista pedidos do usuário autenticado |

## Fluxo da Aplicação

1. O usuário navega pelo catálogo sem login.
2. O usuário adiciona equipamentos ou cursos ao carrinho.
3. O carrinho fica salvo no navegador.
4. Ao finalizar a compra, se não estiver autenticado, o usuário é enviado para login/cadastro.
5. Após autenticação, o carrinho continua disponível.
6. O frontend envia o pedido para a API com o JWT.
7. A API grava o pedido e seus itens no banco.

## Observações

- O painel administrativo ainda não possui controle de perfil. Qualquer usuário autenticado consegue usar as rotas protegidas de produtos.
- A gestão de alunos/inscrições foi removida da interface administrativa até existirem endpoints completos no backend.
- O arquivo `backend/medishop.db` existe no repositório, mas a aplicação atual usa PostgreSQL via Npgsql.
- As imagens iniciais dos produtos usam URLs externas.

## Verificação

Backend:

```bash
dotnet build backend/backend.csproj
```

Frontend:

```bash
cd frontend
npm run build
```
