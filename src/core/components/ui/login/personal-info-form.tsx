import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
import { NavHeader } from "../../ui/navbar/navbarSideEffect";
import { useForm } from 'react-hook-form'
import { getCookie } from '../../../contexts/cookieHandler'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../../controllers/auth.controller'
import withUserGuard from '../../../guards/user.guard'
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
const PersonalInfo = (props: any) => {
    const { token } = useAuthContext()
    const history = useHistory()
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        Axios.put('http://localhost:3000/users/validation', {
            is_thai_language: data.is_thai_language,
            personal_email: data.personal_email,
            phone: data.phone
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res)
                localStorage.setItem('is_first_login', '')
                history.push('/account')

            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        // TODO: if user not first logged in, redirect to account page
        console.log(localStorage.getItem('is_first_login') ?? 'none')
        if (!localStorage.getItem('is_first_login') || localStorage.getItem('is_first_login') == "false") {
            history.push('/account')
        }
    }, [])
    return (
        <>
            <NavHeader header="Tell us about yourself" />
            <Container>
                <div className="page-wrap">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Label>
                            Prefered Language
                    </Form.Label>
                        <div style={{ marginBottom: '24px' }}>
                            <ToggleButtonGroup type="radio" name="is_thai_language" defaultValue={false}>
                                <ToggleButton variant="toggle" inputRef={register} value={true}>Thai</ToggleButton>
                                <ToggleButton variant="toggle" inputRef={register} value={false}>English</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div style={{ marginBottom: "40px" }}>
                            <Form.Group >
                                <Form.Label>Personal Email</Form.Label>
                                <Form.Control type="email" name='personal_email' placeholder="Email" ref={register({ required: true })} />
                                <Form.Text>{errors.personal_email && 'Email is required'}</Form.Text>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Mobile Phone Number</Form.Label>
                                <Form.Control type="text" name='phone' placeholder="Mobile Number" ref={register({ required: true, minLength: 10, maxLength: 15 })} />
                                <Form.Text>{errors.phone && 'Invalid Length'}</Form.Text>
                            </Form.Group>
                        </div>
                        <div className="button-group">
                            <Button variant="pink" type='submit'>Continue</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
export default withUserGuard(PersonalInfo);