using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Invoice> Invoices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Invoice>()
            .OwnsMany(i => i.InvoiceDetail, b =>
            {
                b.WithOwner().HasForeignKey("InvoiceId");
                b.Property<int>("Id");
                b.HasKey("Id");
            });

        modelBuilder.Entity<Invoice>()
            .OwnsMany(i => i.InvoiceCreditNote, b =>
            {
                b.WithOwner().HasForeignKey("InvoiceId");
                b.Property<int>("Id");
                b.HasKey("Id");
            });

        modelBuilder.Entity<Invoice>()
            .OwnsOne(i => i.InvoicePayment);

        modelBuilder.Entity<Invoice>()
            .OwnsOne(i => i.Customer);
    }
}