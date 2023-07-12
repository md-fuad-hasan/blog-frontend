import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem,Collapse, NavbarToggler } from 'reactstrap';
import './Header.css';
import Logo from '../../asset/Logo/blogger-logo.jpg';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='Navigation'>
        <Navbar  className='Navi py-2 py-xxl-3' expand="md" >
     
            <NavbarBrand href="/" className='ms-md-5 Brand'>
                <img src={Logo} alt='Logo' width="70px" />
            </NavbarBrand>

            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={isOpen} navbar >
                <Nav className='ms-auto me-md-5' navbar>
                <NavItem>
                    <NavLink to="/login" className='NavLink'>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/signup" className='NavLink'>SignUp</NavLink>
                </NavItem>
                
                </Nav>
            </Collapse>

        </Navbar>
    </div>
    
  );
};

export default Header;