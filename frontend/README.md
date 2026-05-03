# E-commerce de Equipamentos e Cursos Médicos

Plataforma completa de e-commerce desenvolvida com React, TypeScript e Tailwind CSS para venda de equipamentos médicos e cursos presenciais na área da saúde.

## 🚀 Tecnologias

- **React 18.3.1** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **React Router 7.13.0** - Roteamento
- **Tailwind CSS 4.1.12** - Estilização
- **Radix UI** - Componentes acessíveis
- **Sonner** - Notificações toast
- **Lucide React** - Ícones
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/app/
├── components/
│   ├── admin/              # Componentes do painel admin
│   │   ├── CoursesManager.tsx
│   │   ├── ProductsManager.tsx
│   │   ├── PromoCodesManager.tsx
│   │   └── StudentsManager.tsx
│   ├── ui/                 # Componentes UI reutilizáveis
│   ├── Header.tsx          # Cabeçalho global
│   └── ProductCard.tsx     # Card de produto
├── context/
│   ├── AdminContext.tsx    # Estado global do admin
│   ├── CartContext.tsx     # Estado global do carrinho
│   └── UserContext.tsx     # Estado global do usuário
├── data/
│   └── products.ts         # Dados mock dos produtos
├── pages/
│   ├── Admin.tsx           # Painel administrativo
│   ├── Cart.tsx            # Carrinho de compras
│   ├── Checkout.tsx        # Finalização de pedido
│   ├── Home.tsx            # Página inicial
│   ├── Login.tsx           # Login
│   ├── ProductDetail.tsx   # Detalhes do produto
│   └── Profile.tsx         # Perfil do usuário
├── utils/
│   └── formatters.ts       # Funções de formatação
├── App.tsx                 # Componente raiz
└── routes.tsx              # Configuração de rotas
```

## 🎯 Funcionalidades

### Cliente
- ✅ Navegação e busca de produtos/cursos
- ✅ Filtros (Todos, Equipamentos, Cursos)
- ✅ Carrinho de compras com ajuste de quantidade
- ✅ Checkout com múltiplas formas de pagamento
- ✅ Sistema de códigos promocionais
- ✅ Perfil do usuário editável
- ✅ Histórico de pedidos com status

### Administrador
- ✅ CRUD completo de produtos e cursos
- ✅ Gerenciamento de alunos inscritos
- ✅ Sistema de códigos promocionais
  - Desconto percentual ou valor fixo
  - Datas de validade
  - Limite de uso
  - Ativar/desativar códigos

## 🎨 Paleta de Cores

```css
Primária: Vermelho (#DC2626)
Secundária: Roxo (#9333EA)
Terciária: Rosa (#EC4899)
```

Gradientes aplicados em:
- Títulos principais
- Botões de ação
- Ícones e badges

## 📱 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Homepage com lista de produtos |
| `/login` | Página de login |
| `/product/:id` | Detalhes do produto/curso |
| `/cart` | Carrinho de compras |
| `/checkout` | Finalização de pedido |
| `/profile` | Perfil do usuário |
| `/admin` | Painel administrativo |

## 🔧 Contextos

### AdminContext
Gerencia:
- Produtos (equipamentos)
- Cursos
- Alunos
- Códigos promocionais

### CartContext
Gerencia:
- Itens no carrinho
- Quantidades
- Total

### UserContext
Gerencia:
- Dados do usuário
- Autenticação
- Pedidos

## 💳 Formas de Pagamento

1. **Cartão de Débito** - À vista
2. **Cartão de Crédito** - Parcelamento em até 12x
3. **PIX** - Pagamento instantâneo

## 🎁 Sistema de Promoções

Os códigos promocionais podem ter:
- Tipo de desconto (% ou R$)
- Período de validade
- Limite de uso
- Status ativo/inativo

Validações automáticas:
- Data atual dentro do período
- Limite de uso não excedido
- Código ativo

## 🔐 Dados Mock

### Produtos
- 4 equipamentos médicos
- 4 cursos presenciais

### Códigos Promocionais
- `MEDICO10`: 10% de desconto
- `PRIMEIRACOMPRA`: R$ 50,00 de desconto

### Usuário Padrão
```
Nome: João Silva
Email: joao.silva@email.com
CPF: 123.456.789-00
```

## 🛠️ Formatação

Funções de formatação disponíveis em `utils/formatters.ts`:
- `formatCPF()` - Formata CPF (123.456.789-00)
- `formatPhone()` - Formata telefone ((11) 98765-4321)
- `formatCEP()` - Formata CEP (01234-567)
- `formatCurrency()` - Formata moeda (R$ 1.234,56)
- `formatDate()` - Formata data

## 📝 Componentes UI

Todos os componentes UI são baseados em Radix UI com:
- Suporte a `forwardRef` para refs
- Acessibilidade (ARIA)
- Tema consistente
- Responsividade

## 🚀 Como Usar

O projeto está configurado para rodar no ambiente Figma Make. 

### Fluxo de Uso

1. **Cliente**:
   - Navegue pelos produtos na homepage
   - Adicione itens ao carrinho
   - Vá para o checkout
   - Aplique código promocional (opcional)
   - Escolha forma de pagamento
   - Finalize o pedido
   - Visualize no perfil

2. **Admin**:
   - Acesse `/admin`
   - Gerencie produtos, cursos, alunos e promoções
   - Todas as alterações são refletidas imediatamente

## 📄 Licença

Projeto desenvolvido para fins educacionais.
