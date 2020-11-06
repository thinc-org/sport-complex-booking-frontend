import * as React from "react"
import { useState, useEffect, useContext } from "react"
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap"
import { Link, useRouteMatch, useLocation, withRouter } from "react-router-dom"
import Logo from "../../../assets/images/logo.png"
import Toggler from '../../../assets/images/icons/hamburger.svg'
import { CSSTransition } from 'react-transition-group';
import Exit from '../../../assets/images/icons/exit.svg'
import { data } from './sidebarData';
import { NavHeader, useNavHeader } from './navbarSideEffect'
const NavigationBar = (props: any) => {
  return (
    <Navbar expand="lg" style={{ background: "var(--bg-color)", paddingTop: '60px' }}>
      <Container>
        <div className="w-100 d-flex">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand as="span" className="ml-5">
            <Link to='/'></Link>
          </Navbar.Brand>
        </div>
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
  )
}

const Sidebar = (props: any) => {
  let [inProp, setInProp] = useState(false);
  const { header } = useNavHeader()
  const listItems = data.map((item, index) => (
    <li key={index}>
      <Link className="styled-link" to={item.path} onClick={() => setInProp(false)}>
        {item.name}
      </Link>
    </li>));
  return (
    <>
      <div className="sidebar-toggler flex-row justify-content-center" style={{
        display: hide ? 'none' : 'flex'
      }}>
        <img src={Toggler} onClick={() => setInProp(true)} />
        <h1 className="d-flex flex-row justify-content-center w-100">
          {header ? header : 'CU Sports Complex'}
        </h1>
      </div>
      <CSSTransition in={inProp} timeout={300} classNames='fade'>
        <div className="sidebar" style={{ display: (hide) ? 'none' : '' }}>
          <nav>
            <div style={{
              paddingBottom: '64px'
            }}>
              <img src={Exit} onClick={() => setInProp(false)}></img>
            </div>
            <ul className="sidebar-menu d-flex flex-column justify-content-between h-100">
              <div>
                {listItems}
              </div>
              <div>
                <li>Language</li>
                <li>
                  <Link to="/login" className="styled-link" onClick={() => setInProp(false)}>
                    Sign In
                    </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </CSSTransition>
      <span className="backdrop" style={{ display: (inProp && !hide) ? 'flex' : 'none' }} />
    </>
  )
}
export default Sidebar
