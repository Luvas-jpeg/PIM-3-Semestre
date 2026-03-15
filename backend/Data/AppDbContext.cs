using Microsoft.EntityFrameworkCore;
using EquipamentosMedicosApi.Models;

namespace EquipamentosMedicosApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CourseClass> CourseClasses { get; set; }
        public DbSet<Inscricao> Inscricoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração de precisão decimal para SQLite
            modelBuilder.Entity<Product>()
                .Property(p => p.Preco)
                .HasColumnType("TEXT");

            modelBuilder.Entity<Order>()
                .Property(o => o.Total)
                .HasColumnType("TEXT");

            modelBuilder.Entity<Order>()
                .Property(o => o.ValorFrete)
                .HasColumnType("TEXT");

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.PrecoUnitario)
                .HasColumnType("TEXT");

            // Seed de dados — os mesmos produtos do frontend
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Nome = "Estetoscópio Profissional", Preco = 289.90m, TipoProduto = "equipment", Estoque = 15 },
                new Product { Id = 2, Nome = "Monitor de Sinais Vitais", Preco = 3599.00m, TipoProduto = "equipment", Estoque = 8 },
                new Product { Id = 3, Nome = "Luvas Cirúrgicas Estéreis - Caixa com 50 pares", Preco = 159.90m, TipoProduto = "equipment", Estoque = 50 },
                new Product { Id = 4, Nome = "Desfibrilador Automático Externo (DEA)", Preco = 8999.00m, TipoProduto = "equipment", Estoque = 5 },
                new Product { Id = 5, Nome = "Curso de Primeiros Socorros Básico", Preco = 450.00m, TipoProduto = "course", Estoque = 20 },
                new Product { Id = 6, Nome = "Curso de Suporte Avançado de Vida (ACLS)", Preco = 1200.00m, TipoProduto = "course", Estoque = 15 },
                new Product { Id = 7, Nome = "Workshop de Técnicas de Sutura", Preco = 890.00m, TipoProduto = "course", Estoque = 12 },
                new Product { Id = 8, Nome = "Curso de Biossegurança Hospitalar", Preco = 350.00m, TipoProduto = "course", Estoque = 25 }
            );
        }
    }
}