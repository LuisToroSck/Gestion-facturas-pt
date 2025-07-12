import { useState, useEffect } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import { formatDate, formatAmount } from '../utils/utils';

function InvoiceSearch() {
    const [filters, setFilters] = useState({
        numero: '',
        estado: '',
        pago: ''
    });

    const [facturas, setFacturas] = useState([]);

    function buscarFacturas() {
        api.get('/invoices/search', { params: filters })
            .then((res) => setFacturas(res.data))
            .catch((err) => console.error("Error al buscar facturas:", err));
    }

    return (
        <Container className="mt-5">
            <h2>Invoice Search</h2>
            <Form className="mb-4">
                <Row>
                    <Col md={3}>
                        <Form.Control
                            placeholder="Invoice Number"
                            value={filters.numero}
                            onChange={(e) => setFilters({ ...filters, numero: e.target.value })}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Select
                            value={filters.estado}
                            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                        >
                            <option value="">Invoice Status</option>
                            <option>Issued</option>
                            <option>Inconsistent</option>
                            <option>Cancelled</option>
                            <option>Partial</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Select
                            value={filters.pago}
                            onChange={(e) => setFilters({ ...filters, pago: e.target.value })}
                        >
                            <option value="">Payment Status</option>
                            <option>Paid</option>
                            <option>Pending</option>
                            <option>Overdue</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Button variant="primary" onClick={buscarFacturas}>Search</Button>
                    </Col>
                </Row>
            </Form>

        </Container>
    );
}

export default InvoiceSearch;