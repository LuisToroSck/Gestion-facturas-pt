namespace GestionFacturas_be.Models
{
    public class FacturaInconsistenteDto
    {
        public int InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string CustomerName { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal SumSubtotals { get; set; }
        public string InvoiceStatus { get; set; }
    }
}
