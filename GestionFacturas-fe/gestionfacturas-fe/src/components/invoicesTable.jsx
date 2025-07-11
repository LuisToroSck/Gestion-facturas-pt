import Table from 'react-bootstrap/Table';
import { formatDate, formatAmount } from '../utils/utils';

function InvoicesTable({ invoices }) {
    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Days to Due</th>
                    <th>Payment Due Date</th>
                    <th>Payment Status</th>
                    <th>Detail</th>
                    <th>Payment Method</th>
                    <th>Payment Date</th>
                    <th>CN Number</th>
                    <th>CN Date</th>
                    <th>CN Amount</th>
                    <th>Customer Run</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (
                    <tr key={invoice.invoiceNumber}>
                        <td>{formatDate(invoice.invoice_date)}</td>
                        <td>{invoice.invoice_status}</td>
                        <td>{formatAmount(invoice.total_amount)}</td>
                        <td>{invoice.days_to_due}</td>
                        <td>{formatDate(invoice.payment_due_date)}</td>
                        <td>{invoice.payment_status}</td>
                        {/*<td>
                                        {invoice.invoice_detail.map(p => p.product_name).join(', ')}
                                    </td>*/}
                        <td>
                            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                                {invoice.invoice_detail.map((p, idx) => (
                                    <li key={idx}>{p.product_name} x{p.quantity}</li>
                                ))}
                            </ul>
                        </td>
                        <td>{invoice.invoice_payment.payment_method}</td>
                        <td>{formatDate(invoice.invoice_payment.payment_date)}</td>
                        <td>
                            {invoice.invoice_credit_note?.length > 0
                                ? invoice.invoice_credit_note[0].credit_note_number
                                : '—'}
                        </td>
                        <td>
                            {invoice.invoice_credit_note?.length > 0
                                ? formatDate(invoice.invoice_credit_note[0].credit_note_date)
                                : '—'}
                        </td>
                        <td>
                            {invoice.invoice_credit_note?.length > 0
                                ? formatAmount(invoice.invoice_credit_note[0].credit_note_amount)
                                : '—'}
                        </td>
                        <td>{invoice.customer.customer_run}</td>
                        <td>{invoice.customer.customer_name}</td>
                        <td>{invoice.customer.customer_email}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default InvoicesTable;