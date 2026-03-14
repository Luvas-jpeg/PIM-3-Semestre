---

## 1. Storytelling (A Jornada do Usuário)

**O Personagem:** Dr. Roberto, um cardiologista que acabou de abrir sua própria clínica.
**O Conflito:** Ele precisa de um monitor cardíaco de alta precisão com urgência, mas está no meio de uma rodada de consultas e só tem o celular em mãos.
**A Jornada:** 1. Roberto acessa o site (que carrega perfeitamente em seu smartphone graças ao **CSS responsivo**).
2. Ele navega pelas categorias e encontra o monitor ideal. Sem perder tempo com cadastros, ele o adiciona ao **carrinho**.
3. Ao decidir finalizar a compra, o sistema solicita o **login**. Como ele é um novo usuário, ele se cadastra rapidamente.
4. O sistema valida suas credenciais e o leva diretamente para o checkout, onde seus itens já o aguardavam.
**O Desfecho:** Roberto finaliza a compra com segurança e recebe a confirmação por e-mail, voltando para seus pacientes sem estresse.

---

## 2. Análise de Requisitos

### Requisitos Funcionais (RF)

* **RF01:** O sistema deve permitir a navegação por produtos sem autenticação.
* **RF02:** O sistema deve permitir adicionar produtos ao carrinho de forma anônima.
* **RF03:** O sistema deve exigir login/cadastro para o fechamento do pedido.
* **RF04:** O sistema deve persistir os dados do carrinho após o login.

### Requisitos Não Funcionais (RNF)

* **RNF01:** O frontend deve utilizar tags semânticas (HTML5) para SEO e acessibilidade.
* **RNF02:** O layout deve ser responsivo (Mobile First).
* **RNF03:** O backend deve ser desenvolvido em ASP.NET Core (C#).
* **RNF04:** O banco de dados deve ser relacional (**PostgreSQL** é altamente recomendado pela integração nativa com o Entity Framework).

---

## 3. Diagrama UML (Casos de Uso)

Este diagrama ilustra como o usuário interage com o sistema e onde a barreira de autenticação se aplica.

---

## 4. Arquitetura Técnica Sugerida

Para este projeto, a estrutura ideal seria:

| Camada | Tecnologia | Motivo |
| --- | --- | --- |
| **Frontend** | HTML5 / CSS3 (Grid & Flexbox) | Semântica pura e performance. |
| **Backend** | ASP.NET Core MVC ou Web API | Escalabilidade e segurança do C#. |
| **ORM** | Entity Framework Core | Facilita a comunicação entre C# e o Banco de Dados. |
| **Banco de Dados** | PostgreSQL | Excelente suporte a tipos de dados complexos e robustez. |

---

## 5. Estrutura de Dados (Modelo de Entidade)

Para o seu banco de dados, você precisará de pelo menos quatro tabelas principais:

1. **Users:** `Id, Nome, Email, SenhaHash, Cargo`
2. **Products:** `Id, Nome, Descricao, Preco, Estoque, Categoria`
3. **CartItems:** `Id, UsuarioId (nullable), ProdutoId, Quantidade, SessaoTemporariaId`
4. **Orders:** `Id, UsuarioId, DataPedido, Status, Total`

---
