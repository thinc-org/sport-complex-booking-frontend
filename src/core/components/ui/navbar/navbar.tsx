import * as React from "react"
import { useState, useEffect, useContext } from "react"
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "../../../assets/images/logo.png"
import Toggler from '../../../assets/images/icons/hamburger.svg'
import { CSSTransition } from 'react-transition-group';
import Exit from '../../../assets/images/icons/exit.svg'
import { data } from './sidebarData';
import { NavHeader } from '../../../routes/index.route'
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

export const Sidebar = (props: any) => {
  let { head, setHead } = useContext(NavHeader)
  let [header, setHeader] = useState(head)
  useEffect(() => {
    setHeader(head)
  }, [head])
  const listItems = data.map((item, index) => (
    <li key={index}>
      <Link className="styled-link" to={item.path} onClick={() => setInProp(false)}>
        {item.name}
      </Link>
    </li>));
  let [sidebar, setSidebar] = useState(false);
  let [inProp, setInProp] = useState(false);
  return (
    <>
      <div className="sidebar-toggler d-flex flex-row justify-content-center">
        <img src={Toggler} onClick={() => setInProp(true)} />
        <h1 className="d-flex flex-row justify-content-center w-100">
          {header}
        </h1>
      </div>
      <CSSTransition in={inProp} timeout={300} classNames='fade'>
        <div className="sidebar">
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
      <span className="backdrop" style={{ display: inProp ? 'flex' : 'none' }} />
    </>
  )
}
export default NavigationBar
