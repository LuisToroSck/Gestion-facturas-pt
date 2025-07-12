import Table from 'react-bootstrap/Table';
import { formatDate, formatAmount } from '../utils/utils';
import { Pagination, Badge } from 'react-bootstrap';
import { useState } from 'react';
import InvoiceDetail from './invoiceDetail';
import CreditNoteModal from './creditNoteModal';

function InvoicesTable({ invoices, onSuccess }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = invoices.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(invoices.length / itemsPerPage);

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

    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalCreditNote, setShowModalCreditNote] = useState(false);

    return (
        <>

            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Payment Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((invoice) => (
                        <tr key={invoice.invoiceNumber}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{formatDate(invoice.invoice_date)}</td>
                            <td>{invoice.customer.customer_name}</td>
                            <td>{formatAmount(invoice.total_amount)}</td>
                            <td><Badge bg={invoice.payment_status === 'Paid' ? 'success' : invoice.payment_status === 'Pending' ? 'warning' : 'danger'}>{invoice.payment_status}</Badge></td>
                            <td>{invoice.invoice_status}</td>
                            <td>{formatDate(invoice.payment_due_date)}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setShowModalDetail(true);
                                }}>View</button>
                                <button className="btn btn-success btn-sm ms-2" onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setShowModalCreditNote(true);
                                }}>+ Credit note</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>{paginationItems}</Pagination>

            <InvoiceDetail
                show={showModalDetail}
                onHide={() => setShowModalDetail(false)}
                invoice={selectedInvoice}
            />

            <CreditNoteModal
                show={showModalCreditNote}
                onHide={() => setShowModalCreditNote(false)}
                invoice={selectedInvoice}
                onSuccess={onSuccess}
            />
        </>
    );
}

export default InvoicesTable;