using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using EquipamentosMedicosApi.Data;
using EquipamentosMedicosApi.DTOs;
using EquipamentosMedicosApi.Models;

namespace EquipamentosMedicosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Cria um novo pedido para o usuário autenticado</summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
                           ?? User.FindFirst("sub");

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
                return Unauthorized();

            var order = new Order
            {
                UsuarioId = userId,
                DataPedido = DateTime.UtcNow,
                Status = "Pendente",
                ValorFrete = request.ValorFrete,
                Itens = request.Itens.Select(i => new OrderItem
                {
                    ProdutoId = i.ProdutoId,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario
                }).ToList()
            };

            order.Total = order.Itens.Sum(i => i.PrecoUnitario * i.Quantidade) + request.ValorFrete;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMyOrders), new { id = order.Id },
                new { message = "Pedido criado com sucesso!", orderId = order.Id, total = order.Total });
        }

        /// <summary>Lista os pedidos do usuário autenticado</summary>
        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
                           ?? User.FindFirst("sub");

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
                return Unauthorized();

            var orders = await _context.Orders
                .Where(o => o.UsuarioId == userId)
                .Include(o => o.Itens)
                    .ThenInclude(i => i.Produto)
                .OrderByDescending(o => o.DataPedido)
                .Select(o => new
                {
                    o.Id,
                    o.DataPedido,
                    o.Status,
                    o.Total,
                    o.ValorFrete,
                    Itens = o.Itens.Select(i => new
                    {
                        i.ProdutoId,
                        Nome = i.Produto != null ? i.Produto.Nome : string.Empty,
                        TipoProduto = i.Produto != null ? i.Produto.TipoProduto : "equipment",
                        i.Quantidade,
                        i.PrecoUnitario
                    })
                })
                .ToListAsync();

            return Ok(orders);
        }
    }
}
