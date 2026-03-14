using Microsoft.AspNetCore.Mvc;
//using EquipamentosMedicosApi.Models;
using EquipamentosMedicosApi.DTOs;
//using EquipamentosMedicosApi.Data;

namespace EquipamentosMedicosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthContorller: ControllerBase
    {
        private static List<User> _usuario = new List<User>();
        [HttpPost("cadastrar")]
        public IActionResult Cadastrar(RegistroDTO request)
        {
            
        }
    }
}