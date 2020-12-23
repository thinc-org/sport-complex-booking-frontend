import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Tab, Table } from 'react-bootstrap'
interface RowType {
    courtNum: string,
    sports: string,
    startDate: Date,
    endDate: Date,
    id: string
}


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
            <td>
                <div>
                    {endDate}
                </div>
                <Button>
                    ดูข้อมูล
                </Button>

            </td>
        </tr>
    )
}
export const CourtTable = () => {
    const [row, setRow] = useState<RowType[]>();
    useEffect(() => {

    }, [])
    return (
        <Table>
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
        </Table>
    )

}