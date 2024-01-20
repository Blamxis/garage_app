import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" className="navbar-toggler" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand"
          aria-labelledby="offcanvasNavbarLabel-expand"
          placement="start"
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand" className="custom-link">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-5">
              <Link to="/" className="nav-link custom-link">
                - Accueil -
              </Link>
              <Link to="/parc-auto" className="nav-link custom-link">
                - Parc Automobile -
              </Link>
              <Link to="/contact" className="nav-link custom-link">
                - Contact -
              </Link>
              <NavDropdown title="- Services -" id="offcanvasNavbarDropdown-expand" className="custom-dropdown">
                <Link to="/mecanique" className="dropdown-item">
                  Mécanique
                </Link>
                <Link to="/carrosserie" className="dropdown-item">
                  Carrosserie
                </Link>
                <Link to="/revision" className="dropdown-item">
                  Révision
                </Link>
                <NavDropdown.Divider />
                <Link to="/parc-auto" className="dropdown-item">
                  Véhicules Occasions
                </Link>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className="text-right custom-text">
          <Link to="/connexion" className="btn btn-outline-custom">
            Connexion
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
