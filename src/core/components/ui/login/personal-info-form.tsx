import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
import { NavHeader } from "../../ui/navbar/navbarSideEffect";
const PersonalInfo = (props: any) => {
    let [lang, setLang] = useState('EN')
    let [telnum, setTelnum] = useState('');
    let [pemail, setPEmail] = useState('');
    const onChangeTel = (e: any) => {
        setTelnum(e.target.value)
    }
    const onChangeEmail = (e: any) => {
        setPEmail(e.target.value)
    }
    return (
        <>
            <NavHeader header="Tell us about yourself" />
            <Container>
                <div className="page-wrap">
                    <Form>
                        <Form.Label>
                            Prefered Language
                    </Form.Label>
                        <div style={{ marginBottom: '24px' }}>
                            <ToggleButtonGroup type="radio" name="lang" defaultValue={1}>
                                <ToggleButton variant="toggle" value={1}>Thai</ToggleButton>
                                <ToggleButton variant="toggle" value={2}>English</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div style={{ marginBottom: "40px" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Personal Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={pemail} onChange={onChangeEmail} />
                            </Form.Group>
                            <Form.Group controlId="formBasicTelNum">
                                <Form.Label>Mobile Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Mobile Number" value={telnum} onChange={onChangeTel} />
                            </Form.Group>
                        </div>
                        <div className="button-group">
                            <Button variant="pink">Continue</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
export default PersonalInfo;