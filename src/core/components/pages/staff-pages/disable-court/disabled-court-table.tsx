import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap'
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
                {startDate.toString()}
            </td>
            <td className='d-flex flex-row justify-content-between'>
                <div>
                    bro
                </div>
                <Button>
                    ดูข้อมูล
                </Button>

            </td>
        </tr>
    )
}
export const CourtTable = () => {
    const [data, setData] = useState<RowType[]>();
    const [page, setPage] = useState(0);
    const fetchData = async () => {
        await setData([
            {
                courtNum: '1',
                sports: 'Basketball',
                startDate: new Date(),
                endDate: new Date(),
                id: '12345'
            }
        ])
    }
    useEffect(() => {
        fetchData()
    }, [page])
    return (
        <>
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