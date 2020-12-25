import * as React from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import { Button, Pagination, Table } from 'react-bootstrap'
import { useTable, seed } from './disable-court-hook'
import { formatDate } from './disable-court-hook'
import { RowType } from './disable-court-interface'
export const CourtRow = ({ court_num, sport_id, starting_date, expired_date, _id }: RowType) => {
    const { url, path } = useRouteMatch()
    return (
        <tr>
            <td>
                {court_num}
            </td>
            <td>
                {sport_id}
            </td>
            <td>
                {formatDate(new Date(starting_date))}
            </td>
            <td className='d-flex flex-row justify-content-between align-items-center'>
                {formatDate(new Date(expired_date))}
                <div className='d-flex flex-row'>
                    <Button variant='outline-transparent' className='mr-2' >
                        <Link to={`${path}/${_id}`}>ดูข้อมูล</Link>
                    </Button>
                    <Button variant='outline-transparent' style={{ color: 'red' }}>
                        ลบ
                    </Button>
                </div>

            </td>
        </tr>
    )
}
export const CourtTable = ({ data }: any) => {
    return (
        <>
            <Table className='disable-court-table'>
                <thead>
                    <tr>
                        <th>
                            เลขคอร์ด
                    </th>
                        <th>
                            ประเภทกีฬา
                    </th>
                        <th>
                            วันที่เริ่มปิด
                    </th>
                        <th>
                            วันที่สิ้นสุดการปิด
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((val, indx) => (
                        <CourtRow
                            court_num={val.court_num}
                            sport_id={val.sport_id}
                            starting_date={val.starting_date}
                            expired_date={val.expired_date}
                            _id={val._id}
                            key={val._id}
                        />

                    ))}

                </tbody>
            </Table>
        </>
    )

}
