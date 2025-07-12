using GestionFacturas_be.Models;
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
            return Ok(monto_pendiente);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    [HttpGet("overdue-count")]
    public async Task<ActionResult<decimal>> GetCantidadVencidas()
    {
        try
        {
            decimal cantidad_vencidas = await _invoiceService.CantidadVencidas();
            return Ok(cantidad_vencidas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    [HttpGet("by-due-range")]
    public async Task<ActionResult<Dictionary<string, int>>> GetPorRango()
    {
        var resultado = await _invoiceService.GetFacturasAgrupadasPorRango();
        return Ok(resultado);
    }

    [HttpGet("overdue-no-credit")]
    public async Task<ActionResult<List<Invoice>>> GetVencidasSinNota()
    {
        var facturas = await _invoiceService.ObtenerFacturasVencidasSinNotaAsync();

        if (facturas == null || !facturas.Any())
            return NotFound("No hay facturas vencidas sin nota de crédito.");

        return Ok(facturas);
    }

    [HttpPost("add-credit-note")]
    public async Task<ActionResult<InvoiceCreditNote>> AddCreditNote([FromBody] CreateCreditNoteDto dto)
    {
        var nota = await _invoiceService.AgregarNotaDeCreditoAsync(dto);

        if (nota == null)
            return BadRequest("No se pudo agregar la nota. Verificá que el número de factura exista.");

        return Ok(nota);
    }

}