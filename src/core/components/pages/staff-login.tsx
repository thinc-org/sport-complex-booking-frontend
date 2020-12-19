import React, { useState } from 'react';
import { Form, Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useForm } from 'react-hook-form'
import Axios from 'axios';
import { setCookie } from '../../contexts/cookieHandler'
import { useAuthContext } from '../../controllers/auth.controller'
import { useHistory } from 'react-router-dom'


function StaffLogin() {
    const { register, handleSubmit, setError, errors } = useForm();
    const { setToken } = useAuthContext()
    let history = useHistory()
    const onLogin = async (data) => {
        console.log(data)
        await Axios.post('http://localhost:3000/staffs/login', { 'username': data.username, 'password': data.password })
            .then((res) => {
                console.log('done')
                setCookie('token', res.data.token, 1)
                setToken(res.data.token)
                history.push('/staffprofile')
            })
            .catch((err) => {
                setError('invalid', { type: 'async', message: 'Username หรือ Password ไม่ถูกต้อง' })
            })
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
                                    <Form.Text>{errors.invalid && errors.invalid.message}</Form.Text>
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