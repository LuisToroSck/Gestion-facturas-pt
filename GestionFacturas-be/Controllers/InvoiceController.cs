using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/invoices")]
public class InvoiceController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly InvoiceService _invoiceService;

    public InvoiceController(AppDbContext context, InvoiceService invoiceService)
    {
        _context = context;
        _invoiceService = invoiceService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetFacturasValidas()
    {
        var facturas = await _invoiceService.GetInvoicesValidas();
        return Ok(facturas);
    }


    /*[HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
        var invoices = await _context.Invoices.ToListAsync();
        return Ok(invoices);
    }*/

    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
            return NotFound();

        return Ok(invoice);
    }

    [HttpGet("paid-percentage")]
    public async Task<ActionResult<double>> GetPaidInvoicesPercentage()
    {
        try
        {
            double porcentaje = await _invoiceService.GetPorcentajePagadas();
            return Ok(porcentaje);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    [HttpGet("pending-amount")]
    public async Task<ActionResult<decimal>> GetMontoPendiente()
    {
        try
        {
            decimal monto_pendiente = await _invoiceService.CalcularMontoPendiente();
            Console.WriteLine(monto_pendiente);
            return Ok(monto_pendiente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

}