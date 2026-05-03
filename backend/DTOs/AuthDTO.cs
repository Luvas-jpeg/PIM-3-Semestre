namespace EquipamentosMedicosApi.DTOs
{
    // O que o Front-end envia quando alguém se registra
    public class RegistroDTO
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Cargo { get; set; } = "Cliente";
    }

    // O que o Front-end envia quando alguém faz login
    public class LoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    // Resposta de produto (evita referências circulares)
    public class ProductResponseDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string TipoProduto { get; set; } = string.Empty;
        public int Estoque { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
    }

    public class ProductRequestDTO
    {
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string TipoProduto { get; set; } = string.Empty;
        public int Estoque { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
    }

    // DTO para criar um pedido
    public class CreateOrderDTO
    {
        public List<OrderItemDTO> Itens { get; set; } = new();
        public decimal ValorFrete { get; set; }
    }

    public class OrderItemDTO
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
    }
}
