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

                // Incoherencia entre subtotales de productos y "total_amount"
                if (MontoTotal(invoice) != invoice.TotalAmount)
                {
                    invoice.InvoiceStatus = "Inconsistent";
                }

                // Calcular estado de la factura
                invoice.InvoiceStatus = CalcularEstadoFactura(invoice);

                // Calcular estado de pago de la factura
                invoice.PaymentStatus = CalcularEstadoPagoFactura(invoice);

                _context.Invoices.Add(invoice);
            }

            _context.SaveChanges();
        }
        catch (JsonException ex)
        {
            throw new InvalidOperationException("Error al deserializar el JSON.", ex);
        }
    }

    public decimal MontoTotal(Invoice invoice)
    {
        decimal total = invoice.InvoiceDetail.Sum(d => d.Subtotal);
        return total;
    }

    public string CalcularEstadoFactura(Invoice invoice)
    {
        string estado_factura = "Issued";

        if (invoice.InvoiceCreditNote != null && invoice.InvoiceCreditNote.Any())
        {
            decimal? suma_montos_nc = invoice.InvoiceCreditNote.Sum(cna => cna.CreditNoteAmount);

            if (suma_montos_nc != null)
            {
                if (suma_montos_nc == invoice.TotalAmount)
                {
                    estado_factura = "Cancelled";
                }

                else if (suma_montos_nc < invoice.TotalAmount)
                {
                    estado_factura = "Partial";
                }
            }
        }

        return estado_factura;
    }

    public string CalcularEstadoPagoFactura(Invoice invoice)
    {
        string estado_pago_factura = string.Empty;

        if (invoice.InvoicePayment != null)
        {
            if (invoice.InvoicePayment.PaymentDate.HasValue)
            {
                estado_pago_factura = "Paid";
            } else if (DateTime.Now > invoice.PaymentDueDate)
            {
                estado_pago_factura = "Overdue";
            } else
            {
                estado_pago_factura = "Pending";
            }
        } else
        {
            estado_pago_factura = "Pending";
        }

        return estado_pago_factura;

    }

    public async Task<List<Invoice>> GetInvoicesValidas()
    {
        return await _context.Invoices
            .Where(i => i.InvoiceStatus != "Inconsistent")
            .ToListAsync();
    }

    public async Task<double> GetPorcentajePagadas()
    {
        var total = await _context.Invoices.CountAsync(i => i.InvoiceStatus != "Inconsistent");

        if (total == 0)
        {
            return 0;
        }

        var pagadas = await _context.Invoices.CountAsync(i => i.PaymentStatus == "Paid" && i.InvoiceStatus != "Inconsistent");
        return Math.Round((double)pagadas/total*100, 2);
    }

    public async Task<decimal> CalcularMontoPendiente()
    {
        var facturasPendientes = await _context.Invoices
            .Where(i =>
                i.InvoiceStatus != "Inconsistent" &&
                (i.PaymentStatus == "Pending" || i.PaymentStatus == "Overdue"))
            .ToListAsync();

        decimal total = facturasPendientes.Sum(i => i.TotalAmount);
        return total;
    }

    public async Task<decimal> CantidadVencidas()
    {
        var cantidad_venciadas = await _context.Invoices.CountAsync(i => i.PaymentStatus == "Overdue" && i.InvoiceStatus != "Inconsistent");

        return cantidad_venciadas;
    }
}