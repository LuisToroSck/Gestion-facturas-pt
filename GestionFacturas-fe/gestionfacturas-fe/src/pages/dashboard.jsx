import { useEffect, useState } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardResume from '../components/cardResume';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BarChart from '../components/barChart';
import OverdueInvoicesTable from '../components/overdueInvoicesTable';

function Dashboard() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/invoices')
            .then((response) => {
                setInvoices(response.data);
                console.log('Facturas cargadas:', response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las facturas:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando facturas...</p>;

    return (
        <>
            <Container fluid>

                <Row className="mt-5">
                    <Col>
                        <h1>Dashboard</h1>
                        <p>Resumen del estado de las facturas y sus pagos.</p>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <h4>Resumen Facturas</h4>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CardResume title="Total Invoices" value={invoices.length} />
                    </Col>
                    <Col>
                        <CardResume title="Payment Status" value="85% Paid" />
                    </Col>
                    <Col>
                        <CardResume title="Monto pendiente" value="$215.000" />
                    </Col>
                    <Col>
                        <CardResume title="Facturas vencidas" value="12" />
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <h4>Overdue Invoices (30+ Days)</h4>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Overdue Invoices</Card.Subtitle>
                                <BarChart
                                    labels={['30-60 Days', '60-90 Days', '90+ Days']}
                                    dataValues={[15, 23, 12]}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <h4>Overdue invoices without credit note</h4>
                        <OverdueInvoicesTable invoices={invoices.filter(invoice => invoice.invoice_credit_note.length === 0)} />
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default Dashboard;