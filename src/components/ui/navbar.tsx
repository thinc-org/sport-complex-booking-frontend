import * as React from "react";
import { useState, useEffect } from "react";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
const NavigationBar = (props: any) => {
  return (
    <Navbar expand="lg" style={{ background: "var(--grey-color)" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={Logo} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav-link-group">
            <Nav.Link as="span">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Account</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">My reservation</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Waiting Room</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/">Reserve Now</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as="span" className="nav-right">
              <Link to="/login">Sign in</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
