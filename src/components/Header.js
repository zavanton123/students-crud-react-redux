import React, {useState} from 'react';
import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <div className="container">
            <Nav className="me-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">Students</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/add">Add</Link>
              </NavItem>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
