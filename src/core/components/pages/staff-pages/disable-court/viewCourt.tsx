import * as React from 'react';
import { useViewTable } from './disable-court-hook'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { ViewRow, CourtTable } from './disabled-court-table'
import { ViewRowProps } from './disable-court-interface'
import { DeleteButton } from './button'
import { formatDate, useDate, useRow, toViewRowProps, useEditCourt, withDeletable } from './disable-court-hook'
import { FormAlert, ErrorAlert } from './modals'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { client } from '../../../../../axiosConfig';

interface Params {
    id: string
}
const ViewCourt = () => {
    const { path } = useRouteMatch()
    const history = useHistory()
    const params = useParams<Params>()
    const { viewData, inProp, rowData, onAddRow, onDeleteRow, setInProp } = useViewTable(params.id)
    const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
    const { isEdit, setIsEdit } = useEditCourt()
    const onSubmit = () => {
        const formData = {
            sport_id: viewData?.sport_id,
            disable_time: rowData,
            starting_date: startDate,
            expired_date: endDate
        }
        console.log(formData)
        client.put(`/courts/disable-courts/${viewData?.sport_id}`, formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    return (
        <Container fluid>
            <ErrorAlert inProp={show} handleClose={handleAlert} header={'วันที่ไม่ถูกต้อง'} message={'วันที่ไม่ถูกต้อง'} />
            <FormAlert inProp={inProp} handleClose={() => setInProp(false)} onSubmit={onAddRow} />
            <div className='default-wrapper pt-3 pb-4' style={{ boxShadow: '0 0 0 0' }}>
                <h4 style={{ paddingBottom: '15px' }}>
                    ฟิลเตอร์
                </h4>
                <div>
                    <Row className='list-data'>
                        <Col>
                            <h5>
                                ชื่อกีฬา
                            </h5>
                            <p>
                                {viewData?.sport_id}
                            </p>
                        </Col>
                        <Col>
                            <h5>
                                หมายเลขคอร์ด
                            </h5>
                            <p>
                                {viewData?.court_num}
                            </p>
                        </Col>
                    </Row>
                    <Row className='list-data mb-2'>
                        {!isEdit ? <>
                            <Col>
                                <h5>
                                    วันเริ่มต้นการปิด
                            </h5>
                                <p>
                                    {viewData?.starting_date ? formatDate(new Date(viewData?.starting_date)) : ''}
                                </p>
                            </Col>
                            <Col>
                                <h5>
                                    วันสิ้นสุดการปิด
                            </h5>
                                <p>
                                    {viewData?.expired_date ? formatDate(new Date(viewData?.expired_date)) : ''}
                                </p>
                            </Col>
                        </>
                            :
                            <>
                                <Col className='d-flex flex-column'>
                                    <Form.Label>วันที่เริ่มปิด</Form.Label>
                                    <DatePicker className='form-control' selected={startDate} onChange={onStartDateChange} required />
                                </Col>
                                <Col className='d-flex flex-column'>
                                    <Form.Label>วันสิ้นสุดการปิด</Form.Label>
                                    <DatePicker className='form-control' selected={endDate} onChange={onEndDateChange} required />
                                </Col>
                            </>}
                    </Row>
                    <Row className='list-data'>
                        <Col>
                            <h5>
                                คำอธิบาย
                            </h5>
                            <p>
                                {viewData?.description}
                            </p>
                        </Col>
                    </Row>

                </div>
                <div>
                    {CourtTable<ViewRowProps>({
                        data: rowData,
                        header: ['Index', 'วัน', 'เวลาที่เริ่มปิด', 'เวลาสิ้นสุดการปิด'],
                        Row: ViewRow,
                        Button: isEdit ? withDeletable(DeleteButton, onDeleteRow) : undefined
                    })}
                </div>
                {isEdit && <Button className='w-100 mb-2' variant='pink' onClick={() => setInProp(true)}>เพิ่มการปิดคอร์ดใหม่</Button>}
                <div className='d-flex flex-row justify-content-end'>
                    {!isEdit ?
                        <>
                            <Button variant='outline-pink' className='mr-2' onClick={() => history.goBack()} style={{ fontSize: '20px' }}>
                                กลับ
                    </Button>
                            <Button variant='pink' onClick={() => setIsEdit(true)}>
                                แก้ไข
                    </Button>
                        </>
                        :
                        <>
                            <Button variant='outline-pink mr-2' onClick={() => setIsEdit(false)}>
                                ยกเลิก
                            </Button>
                            <Button variant='pink' onClick={onSubmit} >
                                บันทึก
                            </Button>
                        </>
                    }
                </div>
            </div>
        </Container>

    )
}
export default ViewCourt