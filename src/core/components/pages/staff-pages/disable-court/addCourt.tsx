import * as React from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useOption, useDate, withDeletable, useRow } from './disable-court-hook'
import { ErrorAlert } from './modals'
import DatePicker from 'react-datepicker'
import { FormAlert } from './modals'
import { ViewRowProps } from './disable-court-interface'
import { CourtTable, ViewRow } from './disabled-court-table'
import { client } from '../../../../../axiosConfig';
import { DeleteButton } from './button'
const AddCourt = () => {
    const history = useHistory()
    const { inProp, rowData, onAddRow, onDeleteRow, setInProp } = useRow()
    const { register, handleSubmit, setError, errors, getValues, setValue, watch } = useForm()
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
    const { option } = useOption()
    const watchSports = watch('sport_id', '')
    const onSubmit = async (data) => {
        const formData = {
            ...data,
            court_num: parseInt(data.court_num),
            disable_time: rowData,
            starting_date: startDate?.toUTCString(),
            expired_date: endDate?.toUTCString()
        }
        console.log(formData)
        await client.post('/courts/disable-courts', formData)
            .then((res) => {
                console.log(res)
                history.goBack()
            })
            .catch(err => console.log(err))
    }



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
                            <Form.Control name='sport_id' as='select' ref={register({ required: true })}>
                                {option ? option['sport_list'].map((sport) => {
                                    return <option value={sport._id} key={sport._id}>{sport.sport_name_th}</option>
                                }) : <option value={''}>ประเภทกีฬา</option>
                                }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>เลขคอร์ด</Form.Label>
                            <Form.Control name='court_num' as='select' ref={register({ required: true })}>
                                {getValues('sport_id') && option ? option['sport_list']
                                    .find(sport => sport._id == getValues('sport_id')).list_court
                                    .map((court) => {
                                        return <option value={court.court_num} key={court._id}>{court.court_num}</option>
                                    }) : <option>เลขคอร์ด</option>}
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
                            <Form.Control ref={register({ required: true })} name='description' type='text'></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        {(errors.required || startDate || endDate) && 'กรุณากรอกข้อมูลให้ครบ'}
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
                        <Button variant='outline-pink' onClick={() => history.goBack()}>ยกเลิก</Button>
                    </div>
                </Form>


            </div>
        </Container>
    )
}

export default AddCourt