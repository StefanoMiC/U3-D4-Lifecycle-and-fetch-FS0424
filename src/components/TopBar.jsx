// questo è un sistema più "pratico" che permette di importare più cose sulla stessa linea
// import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

// import singolo di navbar che sfrutta il cosiddetto "tree shaking", ovvero prende la minima parte che serve dalla libreria
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// questa è la sintassi abbreviata che sfrutta il return IMPLICITO delle arrow functions,
// da ricordarsi che NON CI DEVONO essere le graffe dopo la freccia! (altrimenti servirà un return esplicito)
const TopBar = props => (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid="md">
      <Navbar.Brand href="#home">EpicStaurant — {props.claim}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Prenota Tavolo</Nav.Link>
          <Nav.Link href="#link">Prenotazioni</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopBar;
