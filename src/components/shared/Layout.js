import Navbar from "react-bootstrap/Navbar";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "./../../assets/images/login-logo.png";
import AuthContext from "./AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navbar = { backgroundColor: "#9152a2", fontFamily: "Vazir" };
  return (
    <>
      <Navbar dir="rtl" style={navbar} variant="dark">
        <Navbar.Brand> <a class="navbar-brand" href="#"><img  src={logo} height="28" alt="TJ" /></a></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              صفحه اصلی
            </Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <Nav.Link as={Link} to="/partylogs">
                لاگ ها
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/jobs">
              مشاغل
            </Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <Nav.Link as={Link} to="/patientBillSnapshot">
                پرونده های هاب درمان تکمیلی
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link as={Link} to="/login">
                <h6>ورود</h6>
              </Nav.Link>
            )}
            {user && <Nav.Link href="#">{user?.username}</Nav.Link>}
          </Nav>
          {user && (
            <Button
              style={{ fontFamily: "Shabnam" , marginLeft:7 }}
              variant="danger"
              type="button"
              onClick={() => {
                logout();
              }}
            >
              <h6>خروج</h6>
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
