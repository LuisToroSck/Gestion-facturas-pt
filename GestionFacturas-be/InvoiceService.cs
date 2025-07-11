using System.IO;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
public class InvoiceService
{
    private readonly AppDbContext _context;
    public InvoiceService(AppDbContext context)
    {
        _context = context;
    }

    public void LoadInvoicesFromJson(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"El archivo {filePath} no fue encontrado.");
        }

        var jsonString = File.ReadAllText(filePath);

        if (string.IsNullOrEmpty(jsonString))
        {
            throw new InvalidOperationException("El archivo JSON está vacío.");
        }

        try
        {
            var invoiceContainer = JsonSerializer.Deserialize<InvoiceContainer>(jsonString);

            if (invoiceContainer?.invoices == null || !invoiceContainer.invoices.Any())
            {
                throw new InvalidOperationException("No se pudieron deserializar las facturas.");
            }

            _context.Invoices.RemoveRange(_context.Invoices);

            foreach (var invoice in invoiceContainer.invoices)
            {
                _context.Invoices.Add(invoice);
            }

            _context.SaveChanges();
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("Error al deserializar el JSON.", ex);
        }
    }



}