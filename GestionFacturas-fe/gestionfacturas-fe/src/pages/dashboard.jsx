import { useEffect, useState } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardResume from '../components/cardResume';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BarChart from '../components/barChart';
import OverdueInvoicesTable from '../components/overdueInvoicesTable';
import { formatAmount } from '../utils/utils';

function Dashboard() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paidPercentage, setPaidPercentage] = useState(0.0);
    const [montoPendiente, setMontoPendiente] = useState(0.0);
    const [cantidadVencidas, setCantidadVencidas] = useState(0);
    const [cantidadVencidasPorDias, setCantidadVencidasPorDias] = useState({});
    const [overdueInvoicesSinNC, setOverdueInvoicesSinNC] = useState([]);

    function getInvoices() {
        api.get('/invoices')
            .then((response) => {
                setInvoices(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las facturas:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function getPorcentajePaid() {
        api.get('/invoices/paid-percentage')
            .then((response) => {
                setPaidPercentage(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar el porcentaje de facturas pagadas:', error);
            });
    }

    function getMontoPendiente() {
        api.get('/invoices/pending-amount')
            .then((response) => {
                setMontoPendiente(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar el monto pendiente:', error);
            });
    }

    function getCantidadVencidas() {
        api.get('/invoices/overdue-count')
            .then((response) => {
                setCantidadVencidas(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar la cantidad de facturas vencidas:', error);
            });
    }

    function getCantidadVencidasPorDias() {
        api.get('/invoices/by-due-range')
            .then((response) => {
                setCantidadVencidasPorDias(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar la cantidad de facturas vencidas por días:', error);
            });
    }

    function getOverdueInvoicesSinNC() {
        api.get('/invoices/overdue-no-credit')
            .then((response) => {
                setOverdueInvoicesSinNC(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las facturas vencidas sin nota de crédito:', error);
            });
    }

    useEffect(() => {
        getInvoices();
        getPorcentajePaid();
        getMontoPendiente();
        getCantidadVencidas();
        getCantidadVencidasPorDias();
        getOverdueInvoicesSinNC();
    }, []);

    if (loading) return <p>Cargando facturas...</p>;

    return (
        <>
            <Container fluid>

                <Row className="mt-5">
                    <Col>
                        <h1>Dashboard</h1>
                        <p>Resumen del estado de las facturas y sus estados de pago</p>
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
                        <CardResume title="Payment Status" value={`${paidPercentage}% Paid`} />
                    </Col>
                    <Col>
                        <CardResume title="Monto pendiente" value={`${formatAmount(montoPendiente)}`} />
                    </Col>
                    <Col>
                        <CardResume title="Facturas vencidas" value={`${cantidadVencidas}`} />
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <h4>Invoice distribution by due range</h4>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Invoice distribution by due range</Card.Subtitle>
                                <BarChart
                                    labels={['0-19 Days', '20-39 Days', '40-59 Days', '60+ Days']}
                                    dataValues={[cantidadVencidasPorDias['0-19 days'], cantidadVencidasPorDias['20-39 days'], cantidadVencidasPorDias['40-59 days'], cantidadVencidasPorDias['60+ days']]}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col>
                        <h4>Overdue invoices without credit note</h4>
                        <OverdueInvoicesTable 
                        invoices={overdueInvoicesSinNC} 
                        onSuccess={getOverdueInvoicesSinNC}
                        updateMontoPendiente={getMontoPendiente}/>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default Dashboard;