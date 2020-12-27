import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

export const DeleteButton = ({ onClick, indx }) => {
    return (
        <Button variant='outline-transparent' style={{ color: 'red' }} onClick={onClick} data-indx={indx} className='ml-auto'>
            ลบ
        </Button>
    )

}

