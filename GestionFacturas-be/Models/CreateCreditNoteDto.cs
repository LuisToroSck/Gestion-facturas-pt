namespace GestionFacturas_be.Models
{
    public class CreateCreditNoteDto
    {
        public int InvoiceNumber { get; set; }
        public decimal CreditNoteAmount { get; set; }
    }
}
