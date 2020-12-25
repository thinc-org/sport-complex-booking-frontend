import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Modal, Button, Pagination } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useDate, useOption, seed } from './disable-court-hook'
import { ErrorAlert } from './errorModal'
import { CourtTable } from './disabled-court-table'
import { QueryParams } from './disable-court-interface'
import { useTable } from './disable-court-hook'
const ListOfCourts = (props) => {
    const { data, page, maxPage, setPage, jumpUp, jumpDown, setParams } = useTable()
    const { register, handleSubmit, setError, errors, watch, setValue } = useForm();
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate(setError)
    const watchSports = watch('sports', '')
    const { option } = useOption()
    const nearestFiveFloor = (page % 5 == 0 && page != 1) ? page - 4 : (5 * Math.floor(page / 5)) + 1
    const nearestFiveCeil = (5 * Math.ceil((page) / 5)) > maxPage ? maxPage : (5 * Math.ceil((page) / 5))
    const validateFilter = (event) => {
        if (event.target.value === 'ประเภทกีฬา' || !event.target.value) setValue('courtNum', 'เลขคอร์ด')
    }
    const onSubmit = (form) => {
        setParams({
            sport_id: form.sports ? form.sports : undefined,
            starting_date: startDate,
            expired_date: endDate ?? undefined,
            court_num: form.courtNum ? parseInt(form.courtNum) : undefined,
            start: 0,
            end: 9
        })
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
                                <option value={''}>ประเภทกีฬา</option>
                                {option ? option['sportType'].map((val) => (
                                    <option value={val} key={val}>{val}</option>
                                )) : <option value={''}>ประเภทกีฬา</option>}
                            </Form.Control>
                            <Form.Control name='courtNum' as='select' ref={register} disabled={watchSports === 'ประเภทกีฬา' ? true : false}>
                                <option value={''}>เลขคอร์ด</option>
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
            <CourtTable data={data} />
            <div className="d-flex flex-row justify-content-between align-content-center">
                <Button variant='mediumPink'>เพิ่มการปิดคอร์ด</Button>
                <Pagination>
                    <Pagination.Prev onClick={() => { if (page > 1) setPage(prev => prev - 1) }} />
                    {
                        page <= 5 ? '' : <Pagination.Ellipsis onClick={jumpDown} />
                    }
                    {
                        Array.from(Array(nearestFiveCeil + 1).keys()).slice(nearestFiveFloor, nearestFiveCeil + 1).map((val) => {
                            return <Pagination.Item key={val} onClick={() => setPage(val)}>{val}</Pagination.Item>
                        })
                    }
                    {
                        (page > (5 * Math.floor(maxPage))) || page === maxPage || maxPage <= 5 ? '' : <Pagination.Ellipsis onClick={jumpUp} />
                    }
                    <Pagination.Next onClick={() => { if (page < maxPage) setPage(prev => prev + 1) }} />
                </Pagination>
            </div>
        </>

    )
}
export default ListOfCourts
