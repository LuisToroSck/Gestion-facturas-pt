import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatAmount } from '../utils/utils';
import BarChart from '../components/barChart';

function TotalSummary() {

    const [totalSummary, setTotalSummary] = useState([]);

    function getTotalSummary() {
        api.get('/invoices/total-summary')
            .then(response => {
                setTotalSummary(response.data);
            })
            .catch(error => {
                console.error('Error fetching total summary:', error);
            });
    }

    useEffect(() => {
        getTotalSummary();
    }, []);

    return (
        <>
            <Container fluid>
                <Row className="mt-5">
                    <h1>Invoice payment status report</h1>
                    <p>Total summary and percentage of invoices by payment status</p>
                    {totalSummary?.map((item, index) => (
                        <Col key={index}>
                            <Card style={{ backgroundColor: "#f5f5f5", border: "none" }}>
                                <Card.Body>
                                    <h5 style={{}}>{item.estado}</h5>
                                    <h2>{formatAmount(item.montoAcumulado)}</h2>
                                    <p>{item.porcentaje} %</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Payment Status Distribution</Card.Subtitle>
                                <BarChart
                                    labels={totalSummary.map(item => item.estado)}
                                    dataValues={totalSummary.map(item => item.total)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TotalSummary;