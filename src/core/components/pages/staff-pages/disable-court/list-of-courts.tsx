import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
const ListOfCourts = (props) => {
    const currentDate = new Date()
    const [startDate, setStartDate] = useState<Date>(currentDate);
    const [endDate, setEndDate] = useState<Date>();
    const onStartDateChange = (date) => {
        if (date < currentDate) {

        }
        else setStartDate(date)
    }
    const onEndDateChange = (date) => {

    }
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
                    <DatePicker selected={startDate} onDateChange={onStartDateChange} />
                    <DatePicker selected={null} onDateChange={onEndDateChange} />

                </div>
            </Form>
        </div>

    )
}
export default ListOfCourts