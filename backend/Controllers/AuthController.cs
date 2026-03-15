using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EquipamentosMedicosApi.Data;
using EquipamentosMedicosApi.DTOs;
using EquipamentosMedicosApi.Models;

namespace EquipamentosMedicosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// <summary>Registra um novo usuário</summary>
        [HttpPost("cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] RegistroDTO request)
        {
            // Verifica se e-mail já existe
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return Conflict(new { message = "E-mail já cadastrado." });

            var user = new User
            {
                Nome = request.Nome,
                Email = request.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(request.Senha)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuário cadastrado com sucesso!", userId = user.ID });
        }

        /// <summary>Realiza login e retorna token JWT</summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Senha, user.SenhaHash))
                return Unauthorized(new { message = "E-mail ou senha inválidos." });

            var token = GerarToken(user);

            return Ok(new
            {
                token,
                user = new { id = user.ID, nome = user.Nome, email = user.Email }
            });
        }

        private string GerarToken(User user)
        {
            var secret = _config["Jwt:Secret"] ?? "FallbackSecretKeyWith32PlusChars!!!";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.ID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("name", user.Nome),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var expiration = double.TryParse(_config["Jwt:ExpirationHours"], out var h) ? h : 24;

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(expiration),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}