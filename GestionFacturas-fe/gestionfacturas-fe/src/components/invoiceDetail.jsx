import { Modal, Card, Row, Col, Table, Badge, Button } from 'react-bootstrap';
import { formatDate, formatAmount } from '../utils/utils';

function InvoiceDetail({ show, onHide, invoice, onSuccess }) {
    if (!invoice) return null;

    return (
        <>
            <Modal show={show} onHide={onHide} size='xl' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Invoice #{invoice.invoiceNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Issued on {formatDate(invoice.invoice_date)} | Status: <Badge bg={invoice.payment_status === 'Paid' ? 'success' : invoice.payment_status === 'Pending' ? 'warning' : 'danger'}>{invoice.payment_status}</Badge></p>
                    <br></br>
                    <h5>Customer Details</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{invoice.customer.customer_name}</td>
                            </tr>
                            <tr>
                                <td>Run</td>
                                <td>{invoice.customer.customer_run}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{invoice.customer.customer_email}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br></br>
                    <h5>Invoice Information</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Total Amount</td>
                                <td>{formatAmount(invoice.total_amount)}</td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td>{formatDate(invoice.payment_due_date)}</td>
                            </tr>
                            <tr>
                                <td>Payment Status</td>
                                <td>{invoice.payment_status}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br></br>
                    <h5>Product Breakdown</h5>
                    <Card>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.invoice_detail.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.product_name}</td>
                                            <td>{formatAmount(product.unit_price)}</td>
                                            <td>{product.quantity}</td>
                                            <td>{formatAmount(product.subtotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    {invoice.invoice_payment.payment_method && invoice.invoice_payment.payment_date && (
                        <>
                            <br></br>
                            <h5>Payment Details</h5>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Método de pago</td>
                                        <td>{invoice.invoice_payment.payment_method}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha de pago</td>
                                        <td>{formatDate(invoice.invoice_payment.payment_date) || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                    )}
                    {invoice.invoice_credit_note?.length > 0 && (
                        <>
                            <br></br>
                            <h5>Credit Notes</h5>
                            <Table>
                                <tbody>
                                    {invoice.invoice_credit_note.map((note, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <p>Credit Note #{note.credit_note_number}</p>
                                            </td>
                                            <td>
                                                <p>Issued on {formatDate(note.credit_note_date)} | Amount {formatAmount(note.credit_note_amount)}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InvoiceDetail;