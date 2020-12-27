import * as React from 'react';
import { useRef } from 'react'
import { Form, Modal, Button, Pagination } from 'react-bootstrap';
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useDate, useOption, seed } from './disable-court-hook'
import { ErrorAlert } from './modals'
import { CourtTable, CourtRow } from './disabled-court-table'
import { RowProps } from './disable-court-interface'
import { useTable } from './disable-court-hook'
const ListOfCourts = () => {
    const history = useHistory()
    const startDateRef = useRef<DatePicker>()
    const endDateRef = useRef<DatePicker>()
    const { path } = useRouteMatch()
    const { data, maxPage, page, setPage, jumpUp, jumpDown, setParams, pageArr } = useTable()
    const { register, handleSubmit, setError, errors, watch, setValue } = useForm();
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
    const watchSports = watch('sports', '')
    const { option } = useOption()
    const onSelectStartDate = () => {
        startDateRef.current?.setOpen(true)
    }
    const onSelectEndDate = () => {
        endDateRef.current?.setOpen(true)
    }
    const validateFilter = (event) => {
        if (event.target.value === 'ประเภทกีฬา' || !event.target.value) setValue('courtNum', 'เลขคอร์ด')
    }
    const onSubmit = (form) => {
        setParams({
            sport_id: form.sports ? form.sports : undefined,
            starting_date: startDate ?? undefined,
            expired_date: endDate ?? undefined,
            court_num: form.courtNum ? parseInt(form.courtNum) : undefined,
            start: 0,
            end: 9
        })
    }
    const onAdd = () => history.push(`${path}/add`)
    return (
        <>
            <ErrorAlert inProp={show} handleClose={handleAlert} header={'วันที่ไม่ถูกต้อง'} message={'วันที่ไม่ถูกต้อง'} />
            <div className="disable-court-wrapper px-1 py-2 mt-3">
                <Form className='disable-court-filter' onSubmit={handleSubmit(onSubmit)}>
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
                                <label
                                    className='floating-label'
                                    onClick={onSelectStartDate}
                                    style={{ display: startDate ? 'none' : '' }}>
                                    วันเริ่มต้นการปิด
                                </label>
                                <DatePicker className='form-control' selected={startDate} onChange={onStartDateChange} ref={startDateRef} />
                            </div>
                            <div style={{ marginRight: '5px' }}>
                                <label
                                    className='floating-label'
                                    onClick={onSelectEndDate}
                                    style={{ display: endDate ? 'none' : '' }}>
                                    วันสิ้นสุดการปิด
                                </label>
                                <DatePicker className='form-control' selected={endDate} onChange={onEndDateChange} ref={endDateRef} />
                            </div>
                        </div>
                        <Button className='disable-court-button' type='submit' variant='pink'>
                            ค้นหา
                        </Button>
                    </div>
                </Form>
            </div>
            {CourtTable<RowProps>({
                Row: CourtRow,
                data: data,
                header: ['เลขคอร์ด', 'ประเภทกีฬา', 'วันที่เริ่มปิด', 'วันสิ้นสุดการปิด']
            })}
            <div className="d-flex flex-row justify-content-between align-content-center">
                <Button variant='pink' className='disable-court-button' onClick={onAdd}>
                    เพิ่มการปิดคอร์ด
                </Button>
                <Button onClick={seed}>Seed</Button>
                <Pagination>
                    <Pagination.Prev onClick={() => { if (page > 1) setPage(prev => prev - 1) }} />
                    {
                        page <= 5 ? '' : <Pagination.Ellipsis onClick={jumpDown} />
                    }
                    {
                        pageArr.map((val) => {
                            return <Pagination.Item key={val} onClick={() => { setPage(val) }}>{val}</Pagination.Item>
                        })
                    }
                    {
                        (page > Math.floor(maxPage / 5) * 5) || page === maxPage || maxPage <= 5 ? '' : <Pagination.Ellipsis onClick={jumpUp} />
                    }
                    <Pagination.Next onClick={() => { if (page < maxPage) setPage(prev => prev + 1) }} />
                </Pagination>
            </div>
        </>

    )
}
export default ListOfCourts
