import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Row, Container, Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "./../../assets/images/login-logo.png";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Login from "./../../pages/Login";

const signIn = <FontAwesomeIcon icon={faSignInAlt} />;
const signOut = <FontAwesomeIcon icon={faSignOutAlt} />;

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navbar = { backgroundColor: "#9152a2", fontFamily: "Shabnam" };
  return (
    <>
      {localStorage.getItem("tokens") ? (
        <>
          <Navbar dir="rtl" style={navbar} variant="dark">
            <Navbar.Brand>
              {" "}
              <a className="navbar-brand" href="#">
                <img src={logo} height="28" alt="TJ" />
              </a>
            </Navbar.Brand>
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
                    لاگ شرکت های بیمه
                  </Nav.Link>
                )}
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/jobs">
                  فرصت های شغلی
                </Nav.Link>
              </Nav>

              <Nav>
                {user && (
                  <Nav.Link as={Link} to="/PatientBillSnapshot">
                    پرونده های هاب سلامت
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
            <Form className="form-inline my-2 my-lg-0">
              <Nav className="ms-auto">
                {!user && (
                  <Nav.Link as={Link} to="/login">
                    {signIn}
                  </Nav.Link>
                )}
                {user && <Nav.Link href="#">{user?.username}</Nav.Link>}

                {user && (
                  <Nav.Link as={Link}>
                    <FontAwesomeIcon
                      onClick={() => {
                        logout();
                      }}
                      icon={faSignOutAlt}
                    />
                  </Nav.Link>
                )}
              </Nav>
            </Form>
          </Navbar>
          <Row className="m-4">{children}</Row>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Layout;
