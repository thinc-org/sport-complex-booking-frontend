import React, { useState } from 'react';
import { Form, Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useForm } from 'react-hook-form'
import Axios from 'axios';
import { getCookie, setCookie } from '../../contexts/cookieHandler'


function StaffLogin() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onLogin = async (data) => {
        console.log(data)
        await Axios.post('http://localhost:3000/staffs/login', { username: data.username, password: data.password })
            .then((res) => {
                setCookie('token', res.data.jwt, 1)
            })
            .catch(err => console.log(err))
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
                            <Form onSubmit={handleSubmit(onLogin)}>
                                <div>
                                    <Form.Group>
                                        <Form.Label> Username </Form.Label>
                                        <Form.Control type='name' name='username' placeholder='' ref={register({ required: true })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control type='password' name='password' placeholder='' ref={register({ required: true })} />
                                    </Form.Group>
                                    <Form.Text>{(errors.username || errors.password) && 'กรุณากรอกทั้ง Username และ Password'}</Form.Text>
                                </div>
                                <div className='d-flex flex-column mt-5 button-group'>
                                    <Button variant='pink' type='submit'>
                                        เข้าสู่ระบบ
                                </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default StaffLogin