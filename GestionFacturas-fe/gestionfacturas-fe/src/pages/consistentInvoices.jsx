import { Container, Row, Col, Card, Table, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate, formatAmount } from '../utils/utils';
import InvoiceDetail from '../components/invoiceDetail';
import CreditNoteModal from '../components/creditNoteModal';

function ConsistentInvoices() {

    const [consistentInvoices, setConsistentInvoices] = useState([]);

    function getConsistentInvoices() {
        api.get('/invoices/consistent-invoices')
            .then((response) => {
                setConsistentInvoices(response.data);
                console.log('Consistent Invoices:', response.data);
            })
            .catch((error) => {
                console.error("Error fetching consistent invoices:", error);
            });
    }

    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalCreditNote, setShowModalCreditNote] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = consistentInvoices.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(consistentInvoices.length / itemsPerPage);

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        getConsistentInvoices();
    }, []);

    return (
        <>
            <Container fluid>
                <Row className="mt-5">
                    <Col>
                        <h1>Consistent overdue invoices report</h1>
                        <p>This report shows consistent invoices, with more than 30 days past due, without payment or credit note</p>
                        <Card>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Invoice number</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Due Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentInvoices?.map((inv) => (
                                            <tr key={inv.id}>
                                                <td>{inv.invoiceNumber}</td>
                                                <td>{inv.customer.customer_name}</td>
                                                <td>{formatDate(inv.invoice_date)}</td>
                                                <td>{formatDate(inv.payment_due_date)}</td>
                                                <td>{formatAmount(inv.total_amount)}</td>
                                                <td>{inv.invoice_status}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                                        setSelectedInvoice(inv);
                                                        setShowModalDetail(true);
                                                    }}>View</button>
                                                    <button className="btn btn-success btn-sm ms-2" onClick={() => {
                                                        setSelectedInvoice(inv);
                                                        setShowModalCreditNote(true);
                                                    }}>+ Credit note</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Pagination>{paginationItems}</Pagination>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <InvoiceDetail
                show={showModalDetail}
                onHide={() => setShowModalDetail(false)}
                invoice={selectedInvoice}
            />

            <CreditNoteModal
                show={showModalCreditNote}
                onHide={() => setShowModalCreditNote(false)}
                invoice={selectedInvoice}
                onSuccess={getConsistentInvoices}
            />

        </>
    );
}
export default ConsistentInvoices;