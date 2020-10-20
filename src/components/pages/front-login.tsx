import * as React from 'react';
import { useState, useEffect } from 'react';
import LoginForm from '../ui/login-form';
import {Container,Row,Col} from 'react-bootstrap';
import Slide from '../ui/slideshow';
const FrontLogin = (props: any) => {
    return (
    <Container className="page-wrap">
        <Row>
            <Col lg={5}>
                <LoginForm/>
            </Col>
            <Col lg={7} className="d-none d-lg-flex w-100">
                <Slide/>
            </Col>
        </Row>
    </Container>

    )
}
export default FrontLogin;