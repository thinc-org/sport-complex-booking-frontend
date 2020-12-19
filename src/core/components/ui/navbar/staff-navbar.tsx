import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

function StaffNavbar() {
    let location = useLocation()
    let [hide, setHidden] = useState(false);
    useEffect(() => {
        if (!(location.pathname.toLowerCase().includes('staff')) || location.pathname.toLowerCase() === "/stafflogin") setHidden(true)
        else setHidden(false)
    }, [location])
    const onLogout = async (e) => {

    }

    return (
        <Navbar style={{ display: hide ? 'none' : '' }}>
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