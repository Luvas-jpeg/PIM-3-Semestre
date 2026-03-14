namespace EquipamentosMedicosApi.DTOs
{
    // O que o Front-end envia quando alguém se regista
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
}