import * as React from 'react';
import { useState, useEffect } from 'react';
import Slide from "./slideshow"
import LoginForm from "./login-form"
import { Container, Row, Col } from "react-bootstrap"
const FrontLoginMain = (props: any) => {

    return (
        <Container style={{
            position: 'relative'
        }} className="d-flex flex-column">
            <div className="page-wrap">
                <Row>
                    <Col lg={5}>
                        <LoginForm />
                    </Col>
                    <Col lg={7} className="d-none d-lg-flex w-100">
                        <Slide />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
export default FrontLoginMain;