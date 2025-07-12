using GestionFacturas_be.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Invoice> Invoices { get; set; }

    public DbSet<InvoiceBusquedaDto> vw_factura_busqueda { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Invoice>()
            .OwnsMany(i => i.InvoiceDetail, b =>
            {
                b.WithOwner().HasForeignKey("InvoiceNumber");
                b.Property<int>("Id");
                b.HasKey("Id");
            });

        modelBuilder.Entity<Invoice>()
            .OwnsMany(i => i.InvoiceCreditNote, b =>
            {
                b.WithOwner().HasForeignKey("InvoiceNumber");
                b.Property<int>("Id");
                b.HasKey("Id");
            });

        modelBuilder.Entity<Invoice>()
            .OwnsOne(i => i.InvoicePayment);

        modelBuilder.Entity<Invoice>()
            .OwnsOne(i => i.Customer);

        modelBuilder.Entity<InvoiceBusquedaDto>()
            .HasNoKey()
            .ToView("vw_factura_busqueda");
    }
}