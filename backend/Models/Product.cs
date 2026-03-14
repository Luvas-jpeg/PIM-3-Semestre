namespace EquipamentosMedicosApi.Models
{
    public  class Product
    {
        public int Id {get; set;}
        public string Nome {get; set;} = string.Empty;
        public decimal Preco {get; set;}
        public string TipoProduto {get; set;} = string.Empty;
        public int? Estoque {get; set;}

        public ICollection<CourseClass>  Turmas {get; set;} = new List<CourseClass>();
    }
}