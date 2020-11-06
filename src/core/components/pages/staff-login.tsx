import React, { useState } from 'react';
import { Form, Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';



function StaffLogin() {

    let [password, setPassword] = useState("")
    let [username, setUsername] = useState("")
    const onChangePassword = (e: any) => {
        setPassword(e.target.value)
    }
    const onChangeUsername = (e: any) => {
        setUsername(e.target.value)
    }
    const onLogin = async () => {

    }

    return (
        <React.Fragment>
            <Navbar style={{ backgroundColor: '#F1E2E3' }}>
                <NavbarBrand className='mr-auto'>
                    <img className='logo' src={logo} />
                </NavbarBrand>
            </Navbar>
            <div className='container staff-login' style={{ height: '90vh' }}>

                <div className='row justify-content-center h-100'>
                    <div className='my-auto col-10'>

                        <div className='default-wrapper' style={{ padding: '100px 250px' }}>
                            <header style={{ padding: '0 0 20px 0', fontSize: '36px', fontWeight: 'lighter' }}>
                                เข้าสู่ระบบจัดการ Sports Center ของเจ้าหน้าที่
                            </header>
                            <div>
                                <Form.Group>
                                    <Form.Label> Username </Form.Label>
                                    <Form.Control type='name' placeholder='' onChange={onChangeUsername} value={username} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label> Password </Form.Label>
                                    <Form.Control type='password' placeholder='' onChange={onChangePassword} value={password} />
                                </Form.Group>
                            </div>
                            <div className='d-flex flex-column mt-5 button-group'>
                                <Button variant='pink' onClick={onLogin}>
                                    <Link to='/staffprofile' className='styled-link'>
                                        เข้าสู่ระบบ
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default StaffLogin