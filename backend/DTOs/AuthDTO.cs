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

    public class StudentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CourseId { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public string EnrollmentDate { get; set; } = string.Empty;
        public string Status { get; set; } = "active";
    }

    public class StudentRequestDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CourseId { get; set; } = string.Empty;
        public string CourseName { get; set; } = string.Empty;
        public string EnrollmentDate { get; set; } = string.Empty;
        public string Status { get; set; } = "active";
    }

    public class PromoCodeDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public decimal Discount { get; set; }
        public string DiscountType { get; set; } = "percentage";
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int? UsageLimit { get; set; }
        public int UsageCount { get; set; }
    }

    public class PromoCodeRequestDTO
    {
        public string Code { get; set; } = string.Empty;
        public decimal Discount { get; set; }
        public string DiscountType { get; set; } = "percentage";
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int? UsageLimit { get; set; }
        public int UsageCount { get; set; }
    }
}
