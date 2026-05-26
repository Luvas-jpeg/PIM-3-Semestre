
namespace EquipamentosMedicosApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataPedido { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pedente";
        public decimal Total { get; set; }
        public decimal ValorFrete { get; set; }

        // Relacionamentos
        public User? Usuario {get; set;}
        public ICollection<OrderItem> Itens {get; set;} = new List<OrderItem>();
        public ICollection<Enrollment> Enrollments {get; set;} = new List<Enrollment>();
    }
}
