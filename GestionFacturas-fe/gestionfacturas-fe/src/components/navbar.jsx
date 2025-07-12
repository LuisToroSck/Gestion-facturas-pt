import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary px-4 fixed-top w-100 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">Invoice Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/invoices">Invoices</Nav.Link>
                        <NavDropdown title="Reports" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/consistent-invoices">Consistent Invoices</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/total-summary">Total Summary</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/inconsistent-invoices">Inconsistent Invoices</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;