using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Invoice
{
    [Key]
    public int InvoiceNumber { get; set; }
    [JsonPropertyName("invoice_date")]
    public DateTime InvoiceDate { get; set; }
    [JsonPropertyName("invoice_status")]
    public string InvoiceStatus { get; set; }
    [JsonPropertyName("total_amount")]
    public decimal TotalAmount { get; set; }
    [JsonPropertyName("days_to_due")]
    public int DaysToDue { get; set; }
    [JsonPropertyName("payment_due_date")]
    public DateTime PaymentDueDate { get; set; }
    [JsonPropertyName("payment_status")]
    public string PaymentStatus { get; set; }

    [JsonPropertyName("invoice_detail")]
    public List<InvoiceDetail> InvoiceDetail { get; set; }
    [JsonPropertyName("invoice_payment")]
    public InvoicePayment InvoicePayment { get; set; }
    [JsonPropertyName("invoice_credit_note")]
    public List<InvoiceCreditNote>? InvoiceCreditNote { get; set; }
    [JsonPropertyName("customer")]
    public Customer Customer { get; set; }
}

public class InvoiceDetail
{
    [JsonPropertyName("product_name")]
    public string ProductName { get; set; }
    [JsonPropertyName("unit_price")]
    public decimal UnitPrice { get; set; }
    [JsonPropertyName("quantity")]
    public int Quantity { get; set; }
    [JsonPropertyName("subtotal")]
    public decimal Subtotal { get; set; }
}

public class InvoicePayment
{
    [JsonPropertyName("payment_method")]
    public string? PaymentMethod { get; set; }
    [JsonPropertyName("payment_date")]
    public DateTime? PaymentDate { get; set; }
}

public class InvoiceCreditNote
{
    [JsonPropertyName("credit_note_number")]
    public int? CreditNoteNumber { get; set; }
    [JsonPropertyName("credit_note_date")]
    public DateTime? CreditNoteDate { get; set; }
    [JsonPropertyName("credit_note_amount")]
    public decimal? CreditNoteAmount { get; set; }
}

public class Customer
{
    [JsonPropertyName("customer_run")]
    public string? CustomerRun { get; set; }
    [JsonPropertyName("customer_name")]
    public string? CustomerName { get; set; }
    [JsonPropertyName("customer_email")]
    public string? CustomerEmail { get; set; }
}