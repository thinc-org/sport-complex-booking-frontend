import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
import { NavHeader } from "../../ui/navbar/navbarSideEffect";
import { useForm } from 'react-hook-form'
const PersonalInfo = (props: any) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }
    useEffect(() => {
        // TODO: if user not first logged in, redirect to account page
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
export default PersonalInfo;