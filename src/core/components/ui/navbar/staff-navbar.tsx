import React from 'react';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

function StaffNavbar() {

    const onLogout = async (e) => {

    }

    return (
        <Navbar>
            <NavbarBrand className='mr-auto'>
                <img className='logo' src={logo} />
            </NavbarBrand>
            <NavbarBrand>
                <Button className='d-flex align-items-center' style={{ backgroundColor: 'black', borderColor: 'black', borderRadius: '15px', maxHeight: '52px', minWidth: '170px', marginRight: '8vw' }}>
                    <Link to='/stafflogin' onClick={onLogout} className='styled-link' style={{ textAlign: 'center', width: '100%' }}>
                        ออกจากระบบ
                    </Link>
                </Button>
            </NavbarBrand>
        </Navbar>
    )
}

export default StaffNavbar;