import * as React from 'react';
import { ErrorAlert } from './modals'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export const DeleteButton = ({ onClick, indx }) => {
    const [show, setShow] = useState(false)
    const onDelete = () => {
        onClick(indx)
    }
    return (
        <>
            <ErrorAlert
                canCancel={true}
                inProp={show}
                header='กรุณายืนยันการลบ'
                message='ต้องการลบการปิดคอร์ดนี้หรือไม่'
                handleClose={onDelete}
                onCancel={() => setShow(false)}
            />
            <Button variant='outline-transparent' style={{ color: 'red' }} onClick={() => setShow(true)} className='ml-auto'>
                ลบ
            </Button>
        </>
    )

}

