namespace EquipamentosMedicosApi.Models
{
    public class Inscricao
    {
        public int Id { get; set; }
        public int PedidoId { get; set; }
        public int TurmaId { get; set; }
        public string NomeParticipante { get; set; } = string.Empty;
        public string DocumentoParticipante { get; set; } = string.Empty;
        public string StatusInscricao { get; set; } = "Confirmada";

        //Relacionamentos
        public Order? Pedido { get; set; }
        public CourseClass? Turma { get; set; }
    }
}