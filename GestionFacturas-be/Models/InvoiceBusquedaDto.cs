namespace GestionFacturas_be.Models
{
    public class InvoiceBusquedaDto
    {
        public int Id { get; set; }
        public int InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public string InvoiceStatus { get; set; }
        public string PaymentStatus { get; set; }
        public decimal TotalAmount { get; set; }
        public string CustomerName { get; set; }
    }
}
