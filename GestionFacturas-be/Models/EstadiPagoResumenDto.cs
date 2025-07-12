namespace GestionFacturas_be.Models
{
    public class EstadoPagoResumenDto
    {
        public string Estado { get; set; }
        public int Total { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal MontoAcumulado { get; set; }
    }
}
