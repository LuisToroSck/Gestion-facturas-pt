import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { formatDate, formatAmount } from '../utils/utils';

function OverdueInvoices({ invoices }) {
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

    return (
        <>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Client</th>
                        <th>Due Date</th>
                        <th>Payment Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((invoice) => (
                        <tr key={invoice.invoiceNumber}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.customer.customer_name}</td>
                            <td>{formatDate(invoice.payment_due_date)}</td>
                            <td>{invoice.payment_status}</td>
                            <td>{formatAmount(invoice.total_amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>{paginationItems}</Pagination>
        </>
    );
}

export default OverdueInvoices;