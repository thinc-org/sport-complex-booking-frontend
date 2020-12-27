import * as React from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useOption, useDate } from './disable-court-hook'
import { ErrorAlert } from './modals'
import DatePicker from 'react-datepicker'
import { client } from '../../../../../axiosConfig';
const AddCourt = () => {
    const { register, handleSubmit, setError, errors } = useForm()
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
    const { option } = useOption()
    const onSubmit = (form) => {
    }
    return (
        <Container fluid>
            <ErrorAlert inProp={show} handleClose={handleAlert} header={'วันที่ไม่ถูกต้อง'} message={'วันที่ไม่ถูกต้อง'} />
            <div className='default-wrapper pt-3 pb-4' style={{ boxShadow: '0 0 0 0' }}>
                <h4 style={{ paddingBottom: '15px' }}>
                    เพิ่มการปิดคอร์ด
                </h4>
                <Form className='disable-court-form' onSubmit={handleSubmit(() => { })}>
                    <Row>
                        <Col>
                            <Form.Label>ประเภทกีฬา</Form.Label>
                            <Form.Control name='sports' as='select' ref={register}>
                                {option ? option['sportType'].map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                )) : <option value={''}>ประเภทกีฬา</option>}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>เลขคอร์ด</Form.Label>
                            <Form.Control name='courtNum' as='select' ref={register}>
                                {option ? option['courtNum'].map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                )) : <option>เลขคอร์ด</option>}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex flex-column'>
                            <Form.Label>วันที่เริ่มปิด</Form.Label>
                            <DatePicker className='form-control' selected={startDate} onChange={onStartDateChange} required />
                        </Col>
                        <Col className='d-flex flex-column'>
                            <Form.Label>วันสิ้นสุดการปิด</Form.Label>
                            <DatePicker className='form-control' selected={endDate} onChange={onEndDateChange} required />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>คำอธิบาย</Form.Label>
                            <Form.Control ref={register} name='description' type='text'></Form.Control>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}

export default AddCourt