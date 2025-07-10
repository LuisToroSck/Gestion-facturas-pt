using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Invoice
{
    [Key]
    public int InvoiceNumber { get; set; }
    public DateTime InvoiceDate { get; set; }
    public string InvoiceStatus { get; set; }
    public decimal TotalAmount { get; set; }
    public int DaysToDue { get; set; }
    public DateTime PaymentDueDate { get; set; }
    public string PaymentStatus { get; set; }

    public List<InvoiceDetail> InvoiceDetail { get; set; }
    public InvoicePayment InvoicePayment { get; set; }
    public List<InvoiceCreditNote> InvoiceCreditNote { get; set; }
    public Customer Customer { get; set; }
}

public class InvoiceDetail
{
    public string ProductName { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}

public class InvoicePayment
{
    public string PaymentMethod { get; set; }
    public DateTime? PaymentDate { get; set; }
}

public class InvoiceCreditNote
{
    public int CreditNoteNumber { get; set; }
    public DateTime CreditNoteDate { get; set; }
    public decimal CreditNoteAmount { get; set; }
}

public class Customer
{
    public string CustomerRun { get; set; }
    public string CustomerName { get; set; }
    public string CustomerEmail { get; set; }
}