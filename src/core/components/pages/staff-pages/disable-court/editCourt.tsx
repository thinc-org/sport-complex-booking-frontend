import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useOption, useDate, withDeletable, useRow } from './disable-court-hook'
import { ErrorAlert } from './modals'
import DatePicker from 'react-datepicker'
import { FormAlert } from './modals'
import { ViewRowProps } from './disable-court-interface'
import { CourtTable, ViewRow } from './disabled-court-table'
import { client } from '../../../../../axiosConfig';
import { DeleteButton } from './button'

const EditCourt = () => {
    const location = useLocation()
    const { inProp, rowData, onAddRow, onDeleteRow, setInProp } = useRow()
    const { register, handleSubmit, setError, errors } = useForm()
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
    const onSubmit = (data) => {
        const formData = {
            ...data,
            sport_id: '5fe885d31c594a2084f7d3a4', //for testing purpose since there's no sport_id on the backend yet
            disable_time: rowData,
            starting_date: startDate,
            expired_date: endDate
        }
        console.log(formData)
        client.post('/courts/disable-courts', formData)
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    }
    React.useEffect(() => { console.log(location) }, [])
    return (
        <Container fluid>
            <FormAlert inProp={inProp} handleClose={() => setInProp(false)} onSubmit={onAddRow} />
            <ErrorAlert inProp={show} handleClose={handleAlert} header={'วันที่ไม่ถูกต้อง'} message={'วันที่ไม่ถูกต้อง'} />
            <div className='default-wrapper pt-3 pb-4' style={{ boxShadow: '0 0 0 0' }}>
                <h4 style={{ paddingBottom: '15px' }}>
                    เพิ่มการปิดคอร์ด
                </h4>
                <Form className='disable-court-form' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Form.Label>ประเภทกีฬา</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>เลขคอร์ด</Form.Label>

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
                    <div className='mt-3 small-table'>
                        {CourtTable<ViewRowProps>({
                            data: rowData,
                            header: ['Index', 'วัน', 'เวลาที่เริ่มปิด', 'เวลาสิ้นสุดการปิด'],
                            Row: ViewRow,
                            Button: withDeletable(DeleteButton, onDeleteRow)
                        })}
                    </div>
                    <Button className='w-100 ' variant='pink' onClick={() => setInProp(true)}>เพิ่มการปิดคอร์ดใหม่</Button>
                    <div className='d-flex flex-row justify-content-end w-100 mt-3'>
                        <Button variant='pink' className='mr-3' type='submit'>บันทึก</Button>
                        <Button variant='outline-pink'>ยกเลิก</Button>
                    </div>
                </Form>


            </div>
        </Container>
    )
}

export default EditCourt