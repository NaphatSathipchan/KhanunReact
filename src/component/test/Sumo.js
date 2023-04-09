import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function SumoNavbar() {
  return (
    <Navbar bg="warning " expand="lg">
      <Container>
        <Navbar.Brand href="/Home">ทรงพระเจริญ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Siao">ลงนามถวายพระพร</Nav.Link>
            <Nav.Link href="/Bisection">Bisection</Nav.Link>
            <Nav.Link href="/FalsePosition">FalsePosition</Nav.Link>
            <Nav.Link href="/Newton_raphson">Newton_raphson</Nav.Link>
            <Nav.Link href="/Secant">Secant</Nav.Link>
            <Nav.Link href="/Bublesort">Bublesort</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SumoNavbar;
