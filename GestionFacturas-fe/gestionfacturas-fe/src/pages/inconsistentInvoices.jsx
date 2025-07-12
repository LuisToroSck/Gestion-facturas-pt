import { Container, Row, Col, Card, Table, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate, formatAmount } from '../utils/utils';

function InconsistentInvoices() {

    const [inconsistentInvoices, setInconsistentInvoices] = useState([]);

    function getInconsistentInvoices() {
        api.get('/invoices/inconsistent-invoices')
            .then((response) => {
                setInconsistentInvoices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching inconsistent invoices:", error);
            });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoices = inconsistentInvoices.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(inconsistentInvoices.length / itemsPerPage);

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
        getInconsistentInvoices();
    }, []);

    return (
        <>
            <Container fluid>
                <Row className="mt-5">
                    <Col>
                        <h1>Inconsistent invoices report</h1>
                        <p>This report shows inconsistent invoices</p>
                        <Card>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Invoice number</th>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Total amount declared</th>
                                            <th>Sum of subtotals</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentInvoices?.map((inv) => (
                                            <tr key={inv.id}>
                                                <td>{inv.invoiceNumber}</td>
                                                <td>{formatDate(inv.invoiceDate)}</td>
                                                <td>{inv.customerName}</td>
                                                <td>{formatAmount(inv.totalAmount)}</td>
                                                <td>{formatAmount(inv.sumSubtotals)}</td>
                                                <td>{inv.invoiceStatus}</td>
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

        </>
    );
}
export default InconsistentInvoices;