import api from '../services/api';
import { useEffect, useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import InvoicesTable from '../components/invoicesTable';

function Invoices() {

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
						<h1>Invoices</h1>
						<InvoicesTable invoices={invoices} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Invoices;