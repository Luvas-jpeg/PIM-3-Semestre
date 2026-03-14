namespace EquipamentosMedicosApi.Models
{
    public class User
    {
        public int ID {get; set;}
        public string Nome {get; set;} = string.Empty;
        public string Email {get; set;} = string.Empty;
        public string SenhaHash {get; set;} = string.Empty;

        public ICollection<Order> Pedidos {get; set;} = new List<Order>();
    }
}