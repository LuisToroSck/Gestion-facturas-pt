import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary px-4 fixed-top w-100 shadow-sm">
            <Container>
                <Navbar.Brand href="#home">Invoice Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Dashboard</Nav.Link>
                        <Nav.Link href="#link">Invoices</Nav.Link>
                        <Nav.Link href="#link">Reports</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;