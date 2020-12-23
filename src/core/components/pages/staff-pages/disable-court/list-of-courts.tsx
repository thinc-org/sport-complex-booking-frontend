import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useDate, useOption } from './disable-court-hook'
import { ErrorAlert } from './errorModal'
const ListOfCourts = (props) => {
    let { register, handleSubmit, setError, errors, watch, setValue } = useForm();
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate(setError)
    const watchSports = watch('sports', 'ประเภทกีฬา')
    const { option } = useOption()
    const validateFilter = (event) => {
        if (event.target.value === 'ประเภทกีฬา') setValue('courtNum', 'เลขคอร์ด')
    }
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <ErrorAlert inProp={show} handleClose={handleAlert} header={'วันที่ไม่ถูกต้อง'} message={'วันที่ไม่ถูกต้อง'} />
            <div className="disable-court-wrapper px-1 py-2 mt-3">
                <Form className='disable-court-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <Form.Label srOnly={true}>ประเภทกีฬา</Form.Label>
                            <Form.Control name='sports' as='select' ref={register} onChange={validateFilter}>
                                <option value={undefined}>ประเภทกีฬา</option>
                                {option ? option['sportType'].map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                )) : <option>ประเภทกีฬา</option>}
                            </Form.Control>
                            <Form.Control name='courtNum' as='select' ref={register} disabled={watchSports === 'ประเภทกีฬา' ? true : false}>
                                <option value={undefined}>เลขคอร์ด</option>
                                {option ? option['courtNum'].map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                )) : <option>เลขคอร์ด</option>}
                            </Form.Control>
                            <div style={{ marginRight: '5px' }}>
                                <DatePicker className='form-control' selected={startDate} onChange={onStartDateChange} />
                            </div>
                            <div style={{ marginRight: '5px' }}>
                                <DatePicker className='form-control' selected={endDate} onChange={onEndDateChange} />
                            </div>
                        </div>
                        <Button type='submit' variant='mediumPink' style={{ fontSize: '1.2rem', padding: '0.375rem 0.75rem', minWidth: '120px', borderRadius: '15px' }}>
                            ค้นหา
                    </Button>
                    </div>
                </Form>

            </div>
        </>

    )
}
export default ListOfCourts