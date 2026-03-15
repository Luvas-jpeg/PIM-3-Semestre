using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EquipamentosMedicosApi.Data;
using EquipamentosMedicosApi.DTOs;

namespace EquipamentosMedicosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Lista todos os produtos (com filtro opcional por tipo)</summary>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? tipo)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(tipo))
                query = query.Where(p => p.TipoProduto == tipo);

            var products = await query
                .Select(p => new ProductResponseDTO
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Preco = p.Preco,
                    TipoProduto = p.TipoProduto,
                    Estoque = p.Estoque ?? 0
                })
                .ToListAsync();

            return Ok(products);
        }

        /// <summary>Retorna um produto pelo ID</summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products
                .Where(p => p.Id == id)
                .Select(p => new ProductResponseDTO
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Preco = p.Preco,
                    TipoProduto = p.TipoProduto,
                    Estoque = p.Estoque ?? 0
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound(new { message = "Produto não encontrado." });

            return Ok(product);
        }
    }
}
