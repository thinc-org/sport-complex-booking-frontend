import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const CancelCourt = (props) => {
    return (
        <div className='default-wrapper cancel-court'>
            <Form>
                <Form.Group>
                    <Form.Label>ชื่อกีฬา</Form.Label>
                    <Form.Control type='text' name='sport' className='cancel-court field'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>หมายเลขคอร์ด</Form.Label>
                    <Form.Control type='text' name='sport' className='cancel-court field'></Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}
export default CancelCourt