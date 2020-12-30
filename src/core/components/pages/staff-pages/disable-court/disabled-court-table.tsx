import * as React from 'react';
import { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { formatDate, useDeleteCourt } from './disable-court-hook'
import { getMinute, getTime } from './mapTime'
import { RowProps, TableProps, ViewRowProps } from './disable-court-interface'
import { ErrorAlert } from './modals'
import { DeleteButton } from './button'
import { dayArr } from './mapTime'
export const CourtRow = (props: RowProps) => {
    const { url, path } = useRouteMatch()
    const history = useHistory()
    const { show, setShow, onDelete } = useDeleteCourt(props._id)
    const onNavigate = () => history.push(`${path}/${props._id}`)
    const startingDate = new Date(props.starting_date)
    const expiredDate = new Date(props.expired_date)
    startingDate.setDate(startingDate.getDate() + 1);
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
            { props._id && props.court_num ?
                <tr>
                    <td>
                        {props.court_num}
                    </td>
                    <td>
                        {props.sport_id}
                    </td>
                    <td>
                        {formatDate(startingDate)}
                    </td>
                    <td className='d-flex flex-row justify-content-between align-items-center'>
                        {formatDate(expiredDate)}
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
                :
                <tr>
                    ข้อมูลถูกลบไปแล้ว
                </tr>
            }
        </>
    )
}

export const ViewRow = ({ time_slot, indx, day, button }: ViewRowProps) => {
    const minute = getMinute(time_slot)
    return (
        <tr>
            <td>
                {indx}
            </td>
            <td>
                {dayArr[day]}
            </td>
            <td>
                {getTime(minute.startTime)}
            </td>
            <td className={button ? 'd-flex flex-row justify-content-end align-items-center' : ''}>
                {getTime(minute.endTime)}
                {button}
            </td>

        </tr>
    )
}



export function CourtTable<T>({ data, header, Row, Button }: TableProps<T>) {
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
                        key={val._id ?? indx}
                        button={Button ? <Button indx={indx} /> : null}
                    />)

                })}

            </tbody>
        </Table>

    )

}

