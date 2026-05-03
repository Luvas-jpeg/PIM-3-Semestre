# Guia do E-commerce Médico

## 🏥 Visão Geral
Plataforma completa de e-commerce para venda de equipamentos médicos e cursos presenciais na área da saúde.

## 📋 Funcionalidades Principais

### Para Clientes

#### 1. **Navegação e Compras**
- **Homepage** (`/`): Visualize todos os produtos e cursos disponíveis
  - Filtros: Todos, Equipamentos, Cursos
  - Busca por nome ou descrição
  - Cards com informações e preços

#### 2. **Carrinho de Compras** (`/cart`)
- Adicione produtos e inscrições em cursos
- Ajuste quantidades (apenas para equipamentos)
- Visualize o total
- Botão "Finalizar Compra" leva ao checkout

#### 3. **Checkout** (`/checkout`)
- **Resumo do pedido** com todos os itens
- **Código Promocional**:
  - Digite o código
  - Clique em "Aplicar"
  - Veja o desconto aplicado automaticamente
  - Códigos podem ser percentuais ou valor fixo
- **Formas de Pagamento**:
  - **Débito**: Pagamento à vista
  - **Crédito**: Escolha parcelas (1x até 12x)
  - **PIX**: Pagamento instantâneo
- Resumo final com subtotal, desconto e total

#### 4. **Perfil do Usuário** (`/profile`)
Acesse clicando no ícone de usuário no header (após login)

**Aba Dados Pessoais:**
- Visualize suas informações
- Clique em "Editar" para modificar:
  - Nome, CPF, Email, Telefone
  - Endereço completo
- Clique em "Salvar" para confirmar alterações

**Aba Meus Pedidos:**
- Visualize histórico completo de pedidos
- Status: Pendente, Em Processamento, Concluído, Cancelado
- Detalhes de cada pedido:
  - Itens comprados
  - Valores e descontos aplicados
  - Forma de pagamento
  - Data do pedido

### Para Administradores

#### Painel Admin (`/admin`)

**1. Aba Equipamentos:**
- Listar todos os equipamentos
- Adicionar novo equipamento:
  - Nome, Preço, Descrição
  - Categoria, Estoque
  - URL da imagem
- Editar equipamentos existentes
- Excluir equipamentos

**2. Aba Cursos:**
- Listar todos os cursos presenciais
- Adicionar novo curso:
  - Nome, Valor, Descrição
  - Data do curso
  - Local e Instrutor
  - Vagas disponíveis
  - URL da imagem
- Editar cursos existentes
- Excluir cursos

**3. Aba Alunos:**
- Listar alunos inscritos
- Buscar por nome, email, curso ou telefone
- Adicionar novo aluno:
  - Dados pessoais
  - Curso selecionado
  - Status (Ativo, Concluído, Cancelado)
- Editar informações dos alunos
- Excluir registros

**4. Aba Promoções:**
- Gerenciar códigos promocionais
- Criar novo código:
  - Código alfanumérico (ex: MEDICO10)
  - Tipo: Porcentagem (%) ou Valor Fixo (R$)
  - Valor do desconto
  - Data de início e término
  - Limite de uso (opcional)
  - Ativar/Desativar
- Editar códigos existentes
- Excluir códigos
- Visualizar:
  - Status (Ativo, Expirado, Desativado, Agendado)
  - Quantidade de usos

## 🎨 Paleta de Cores
- Vermelho (#DC2626)
- Roxo (#9333EA)
- Rosa (#EC4899)
- Gradientes entre essas cores em botões e títulos

## 🔐 Autenticação
- Login: `/login`
- Após autenticado, acesse seu perfil pelo ícone de usuário
- Logout disponível no menu mobile

## 💳 Códigos Promocionais de Exemplo
- **MEDICO10**: 10% de desconto (válido até 31/12/2026)
- **PRIMEIRACOMPRA**: R$ 50,00 de desconto (válido até 31/12/2026)

## 📱 Responsividade
- Layout adaptado para desktop, tablet e mobile
- Menu hamburger em dispositivos móveis
- Cards e tabelas responsivos

## 🛠️ Tecnologias
- React + TypeScript
- React Router para navegação
- Radix UI + Tailwind CSS para componentes
- Context API para gerenciamento de estado
- Sonner para notificações toast
