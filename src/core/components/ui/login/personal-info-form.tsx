import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { NavHeader } from '../../../routes/index.route'
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
const PersonalInfo = (props: any) => {
    let { head, setHead } = useContext(NavHeader)
    let [lang, setLang] = useState('EN')
    let [telnum, setTelnum] = useState('');
    let [pemail, setPEmail] = useState('')
    const onChangeTel = (e: any) => {
        setTelnum(e.target.value)
    }
    const onChangeEmail = (e: any) => {
        setPEmail(e.target.value)
    }
    return (
        <Container>
            <div className="page-wrap">
                <Form>
                    <Form.Label>
                        Prefered Language
                    </Form.Label>
                    <div style={{ marginBottom: '24px' }}>
                        <ToggleButtonGroup type="radio" name="lang" defaultValue="EN">
                            <ToggleButton variant="toggle" value="TH">Thai</ToggleButton>
                            <ToggleButton variant="toggle" value="EN">English</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div style={{ marginBottom: "40px" }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Personal Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={telnum} onChange={onChangeEmail} />
                        </Form.Group>
                        <Form.Group controlId="formBasicTelNum">
                            <Form.Label>Mobile Phone Number</Form.Label>
                            <Form.Control type="number" placeholder="Mobile Number" value={pemail} onChange={onChangeTel} />
                        </Form.Group>
                    </div>
                    <div className="button-group">
                        <Button variant="pink">Continue</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}
export default PersonalInfo;