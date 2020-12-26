import * as React from 'react';
import { useViewTable } from './disable-court-hook'
import { useParams } from 'react-router-dom'
import { ViewRow, CourtTable } from './disabled-court-table'
import { ViewRowProps } from './disable-court-interface'
import { formatDate } from './disable-court-hook'
import { Row, Col, Container } from 'react-bootstrap'
import { domainToASCII } from 'url';
interface Params {
    id: string
}
const ViewCourt = () => {
    const params = useParams<Params>()
    const { data } = useViewTable(params.id)
    return (
        <Container fluid>
            <div className='default-wrapper' style={{ boxShadow: '0 0 0 0', paddingTop: '30px' }}>
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
                                {data?.sport_id}
                            </p>
                        </Col>
                        <Col>
                            <h5>
                                หมายเลขคอร์ด
                            </h5>
                            <p>
                                {data?.court_num}
                            </p>
                        </Col>
                    </Row>
                    <Row className='list-data'>
                        <Col>
                            <h5>
                                วันเริ่มต้นการปิด
                            </h5>
                            <p>
                                {data?.starting_date ? formatDate(new Date(data?.starting_date)) : ''}
                            </p>
                        </Col>
                        <Col>
                            <h5>
                                วันสิ้นสุดการปิด
                            </h5>
                            <p>
                                {data?.expired_date ? formatDate(new Date(data?.expired_date)) : ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className='list-data'>
                        <Col>
                            <h5>
                                คำอธิบาย
                            </h5>
                            <p>
                                {data?.description}
                            </p>
                        </Col>
                    </Row>

                </div>
                <div>
                    {CourtTable<ViewRowProps>({
                        data: data?.disable_time,
                        header: ['Index', 'วัน', 'เวลาที่เริ่มปิด', 'เวลาสิ้นสุดการปิด'],
                        Row: ViewRow
                    })}
                </div>
            </div>
        </Container>

    )
}
export default ViewCourt