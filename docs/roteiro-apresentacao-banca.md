# Roteiro de Apresentacao para a Banca

Projeto: Sistema Web para Venda de Equipamentos Medicos e Cursos

Tempo sugerido: 10 a 15 minutos

Participantes: 6 pessoas

## Pessoa 1 - Abertura e Objetivo

### Slide 1 - Titulo do Projeto

Fala:

"Boa noite. Nosso grupo vai apresentar o projeto desenvolvido para o PIM: um sistema web para venda de equipamentos medicos e cursos.

A ideia principal do sistema e simular uma plataforma de e-commerce voltada para a area da saude, onde o cliente consegue comprar equipamentos e tambem se inscrever em cursos.

Durante a apresentacao, vamos mostrar a modelagem do banco de dados, as tecnologias utilizadas e o sistema funcionando."

### Slide 2 - Objetivo do Sistema

Fala:

"O objetivo do projeto foi criar uma aplicacao web funcional, com cadastro de usuarios, autenticacao, catalogo de produtos, carrinho de compras, finalizacao de pedido e painel administrativo.

No lado do cliente, o sistema permite navegar pelos produtos, comprar equipamentos ou cursos e acompanhar seus pedidos.

No lado do administrador, o sistema permite gerenciar produtos, cursos, alunos, cupons promocionais e pedidos."

Transicao:

"Agora, vamos explicar melhor as funcionalidades disponiveis para cada tipo de usuario."

## Pessoa 2 - Funcionalidades do Sistema

### Slide 3 - Funcionalidades do Cliente

Fala:

"Para o cliente, o sistema possui cadastro e login, visualizacao do catalogo, detalhes dos produtos, carrinho de compras e checkout.

Durante o checkout, caso o usuario ainda nao tenha endereco cadastrado, o sistema solicita essas informacoes antes de finalizar o pedido.

Depois da compra, o cliente consegue acessar seu perfil, visualizar seus pedidos e, caso tenha comprado um curso, acessar a area de 'Meus Cursos'."

### Slide 4 - Funcionalidades do Administrador

Fala:

"Ja o administrador possui acesso a um painel separado, que nao aparece para usuarios comuns.

Nesse painel, o admin consegue cadastrar, editar e remover equipamentos e cursos. Tambem consegue visualizar alunos, gerenciar cupons promocionais e acompanhar os pedidos realizados.

Outra funcionalidade importante e a alteracao do status do pedido, que permite simular etapas como pendente, processando, concluido ou cancelado."

Transicao:

"Com essas funcionalidades definidas, vamos apresentar a modelagem do banco de dados."

## Pessoa 3 - Modelagem do Banco de Dados

### Slide 5 - Diagrama Entidade-Relacionamento

Fala:

"Nesta parte temos o diagrama entidade-relacionamento do projeto.

As principais tabelas do sistema sao: Users, Products, Orders, OrderItems, PromoCodes, CourseClasses, Students e Enrollments.

Essa modelagem foi pensada para representar tanto o fluxo de e-commerce quanto o fluxo de inscricao em cursos.

No diagrama, usamos a notacao pe de galinha para mostrar a cardinalidade dos relacionamentos. O lado com uma linha representa 'um', e o lado com o pe de galinha representa 'muitos'. Por isso, quando vemos Users ligado a Orders, a leitura e: um usuario pode realizar varios pedidos, mas cada pedido pertence a um usuario.

Tambem existem tabelas intermediarias, como OrderItems e Enrollments. Elas ajudam a representar relacoes que, na pratica, poderiam ser muitos para muitos. Por exemplo, um pedido pode ter varios produtos, e um produto pode aparecer em varios pedidos. Para organizar isso no banco, usamos OrderItems entre Orders e Products."

### Slide 6 - Explicacao das Relacoes

Fala:

"A tabela Users representa os usuarios do sistema, que podem ser clientes ou administradores.

Um usuario pode realizar varios pedidos, representados pela tabela Orders. Cada pedido possui itens, registrados em OrderItems, e esses itens estao relacionados aos produtos da tabela Products.

Quando o produto e um curso, ele tambem se relaciona com uma turma, representada por CourseClasses. Quando o cliente compra esse curso, o sistema cria uma inscricao na tabela Enrollments e registra o aluno na tabela Students.

Tambem temos a tabela PromoCodes, que representa cupons promocionais que podem ser aplicados aos pedidos. Na modelagem documentada, um cupom pode ser usado em varios pedidos, mas cada pedido pode ter nenhum ou apenas um cupom aplicado.

Resumindo as principais relacoes: Users possui varios Orders; Orders possui varios OrderItems; Products aparece em varios OrderItems; Products tambem pode possuir varias CourseClasses; CourseClasses possui varias Enrollments; Students possui varias Enrollments; e Orders tambem pode gerar varias Enrollments quando a compra envolve cursos.

Caso aparecam campos adicionais na implementacao, como telefone ou endereco do usuario, eles sao detalhes complementares do cadastro e do checkout. Eles nao mudam os relacionamentos principais apresentados na modelagem."

Transicao:

"Agora vamos explicar rapidamente as tecnologias usadas e como o sistema foi estruturado."

## Pessoa 4 - Tecnologias e Arquitetura

### Slide 7 - Tecnologias Utilizadas

Fala:

"O sistema foi desenvolvido com uma arquitetura separada entre frontend, backend e banco de dados.

No frontend, utilizamos React com Vite e TypeScript, criando uma interface dinamica para o usuario.

No backend, utilizamos ASP.NET Core, responsavel pelas regras de negocio e pelas APIs.

Para o banco de dados, utilizamos PostgreSQL hospedado no Supabase, com Entity Framework Core para mapear as entidades e controlar as migrations.

Tambem utilizamos autenticacao com JWT, permitindo controlar o acesso de clientes e administradores."

### Slide 8 - Fluxo Geral do Sistema

Fala:

"O fluxo principal do sistema comeca quando o cliente acessa o catalogo e escolhe um equipamento ou curso.

Depois, ele adiciona o item ao carrinho e finaliza a compra. Nesse momento, o sistema valida o estoque ou as vagas disponiveis.

Se for um equipamento, a quantidade em estoque diminui. Se for um curso, a quantidade de vagas diminui e o sistema cria uma inscricao para o aluno.

Depois disso, o administrador consegue acompanhar o pedido pelo painel administrativo."

Transicao:

"Com isso explicado, vamos demonstrar o sistema rodando."

## Pessoa 5 - Demonstracao do Sistema

### Slide 9 - Sistema Web Rodando

Fala antes da demonstracao:

"Agora vamos mostrar o sistema funcionando na pratica.

Primeiro, vamos acessar como cliente. Vamos navegar pelo catalogo, escolher um produto ou curso, adicionar ao carrinho e finalizar a compra.

Depois, vamos mostrar que o pedido aparece no perfil do cliente e que o curso comprado aparece na area de 'Meus Cursos'."

Passos da demonstracao:

1. Abrir o site.
2. Mostrar a tela inicial/catalogo.
3. Fazer login com usuario cliente.
4. Abrir um equipamento ou curso.
5. Adicionar ao carrinho.
6. Finalizar a compra.
7. Mostrar pedido criado.
8. Mostrar area "Meus Cursos", se a compra for de curso.
9. Sair da conta cliente.
10. Entrar como administrador.
11. Abrir painel administrativo.
12. Mostrar produtos, cursos, alunos, cupons e pedidos.
13. Alterar o status de um pedido.

Falas durante a demonstracao:

"Aqui podemos ver que o cliente comum nao tem acesso ao painel administrativo."

"Ao finalizar a compra, o sistema atualiza automaticamente o estoque ou a quantidade de vagas."

"Quando a compra e de um curso, o sistema tambem registra o aluno e gera uma inscricao."

"Agora, entrando como administrador, conseguimos visualizar os dados de gestao da plataforma."

"Na aba de pedidos, o administrador consegue acompanhar as compras realizadas e alterar o status."

Transicao:

"Para finalizar, vamos comentar algumas melhorias futuras que poderiam transformar o projeto em um e-commerce real."

## Pessoa 6 - Melhorias Futuras e Encerramento

### Slide 10 - Melhorias Futuras

Fala:

"Como melhoria futura, o sistema poderia receber integracao com um gateway de pagamento real, como Mercado Pago, Stripe ou PagSeguro.

Tambem seria importante implementar calculo de frete por CEP, integracao com transportadoras, envio automatico de e-mails, recuperacao de senha e emissao de nota fiscal.

Outra melhoria seria criar um dashboard com metricas de vendas, produtos mais vendidos, cursos com mais inscritos e relatorios administrativos.

Para deixar o sistema mais proximo de um e-commerce real, tambem seria interessante adicionar upload real de imagens, avaliacoes de produtos, controle de entrega e logs de auditoria."

Fala de encerramento:

"Concluindo, o projeto atende a proposta do PIM porque apresenta a modelagem do banco de dados e um sistema web funcional.

O sistema possui fluxo de cadastro, login, compra, controle de estoque, controle de vagas, inscricoes em cursos e painel administrativo.

Obrigado pela atencao. Estamos a disposicao para perguntas."

## Observacoes Para o Grupo

- Deixar o backend e o frontend rodando antes da apresentacao.
- Deixar um usuario cliente e um usuario administrador prontos.
- Testar uma compra antes da banca.
- Testar login de admin antes da banca.
- Deixar o slide da modelagem aberto ou facil de acessar.
- Evitar explicar codigo em excesso; foquem no fluxo, na modelagem e nas regras de negocio.
- Se algo demorar, mostrar dados ja populados pelas migrations.
