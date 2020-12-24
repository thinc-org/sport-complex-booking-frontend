import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap'
import { useTable } from './disable-court-hook'
import { RowType } from './disable-court-interface'
import { client } from '../../../../../axiosConfig'
export const CourtRow = ({ courtNum, sports, startDate, endDate, id }: RowType) => {
    return (
        <tr>
            <td>
                {courtNum}
            </td>
            <td>
                {sports}
            </td>
            <td>
                {startDate}
            </td>
            <td className='d-flex flex-row justify-content-between align-items-center'>
                {endDate}
                <div className='d-flex flex-row'>
                    <Button variant='outline-transparent' className='mr-2' >
                        ดูข้อมูล
                    </Button>
                    <Button variant='outline-transparent' style={{ color: 'red' }}>
                        ลบ
                    </Button>
                </div>

            </td>
        </tr>
    )
}
export const CourtTable = () => {
    const { data, page } = useTable();
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
                    {data?.map((val) => (
                        <CourtRow
                            courtNum={val.courtNum}
                            sports={val.sports}
                            startDate={val.startDate}
                            endDate={val.endDate}
                            id={val.id}
                            key={val.id}
                        />
                    ))}

                </tbody>
            </Table>
            <div className="d-flex flex-row justify-content-between align-content-center">
                <Button variant='mediumPink'>เพิ่มการปิดคอร์ด</Button>
                <Pagination>

                </Pagination>
            </div>
        </>
    )

}