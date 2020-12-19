import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const CancelCourt = (props) => {
    return (
        <div className="disable-court-wrapper px-2 py-2 mt-3">
            <Form>
                <div className="d-flex flex-row">
                    <DropdownButton title="ประเภทกีฬา" className='disable-court-dropdown'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="เลขคอร์ด" className='disable-court-dropdown'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="วันที่เริ่มการปิด" className='disable-court-dropdown'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="วันที่สิ้นสุดการปิด" className='disable-court-dropdown'>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </div>
            </Form>
        </div>

    )
}
export default CancelCourt