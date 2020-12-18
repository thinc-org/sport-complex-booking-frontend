import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const CancelCourt = (props) => {
    return (
        <div className='default-wrapper cancel-court'>
            <Form>
                <DropdownButton title="Dropdown button" size='sm'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </Form>
        </div>
    )
}
export default CancelCourt