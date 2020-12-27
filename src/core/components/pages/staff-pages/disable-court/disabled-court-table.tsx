import * as React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { formatDate, useDeleteCourt } from './disable-court-hook'
import { getMinute, getTime } from './mapTime'
import { RowProps, TableProps, ViewRowProps } from './disable-court-interface'
import { ErrorAlert } from './modals'
import { dayArr } from './mapTime'
export const CourtRow = ({ court_num, sport_id, starting_date, expired_date, _id }: RowProps) => {
    const { url, path } = useRouteMatch()
    const history = useHistory()
    const { show, setShow, onDelete } = useDeleteCourt(_id)
    const onNavigate = () => history.push(`${path}/${_id}`)
    return (
        <>
            <ErrorAlert
                inProp={show}
                header='คำเตือน'
                message='ท่านต้องการยืนยันการลบการปิดคอร์ดนี้หรือไม่'
                canCancel={true}
                handleClose={onDelete}
                onCancel={() => setShow(false)}
            />
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
                        <Button variant='outline-transparent' className='mr-2' onClick={onNavigate} >
                            ดูข้อมูล
                        </Button>
                        <Button variant='outline-transparent' style={{ color: 'red' }} onClick={() => setShow(true)}>
                            ลบ
                    </Button>
                    </div>

                </td>
            </tr>
        </>
    )
}

export const ViewRow = (props: ViewRowProps) => {
    const minute = getMinute(props.time_slot)
    return (
        <tr>
            <td>
                {props.indx}
            </td>
            <td>
                {dayArr[props.day]}
            </td>
            <td>
                {getTime(minute.startTime)}
            </td>
            <td>
                {getTime(minute.endTime)}
            </td>
        </tr>
    )
}



export function CourtTable<T>({ data, header, Row }: TableProps<T>) {
    return (
        <Table className='disable-court-table'>
            <thead>
                <tr>
                    {header.map((val) => <th key={val}>{val}</th>)}
                </tr>
            </thead>
            <tbody>
                {data?.map((val, indx) => {
                    return (<Row
                        {...val}
                        indx={indx}
                        key={val._id}
                    />)

                })}

            </tbody>
        </Table>

    )

}

