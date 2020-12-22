import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form,Modal,Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
interface Option {
    sportType: string[],
    courtNum: string[]
}
const ListOfCourts = (props) => {
    let {register,handleSubmit,setError,errors,getValues} =useForm();
    const currentDate = new Date()
    const [option,setOption] = useState<Option>()
    const [startDate, setStartDate] = useState<Date>(currentDate);
    const [endDate, setEndDate] = useState<Date>();
    const fetchData = async () => {
        await setOption({
            sportType: ['แบดมินตัน','บาสเกตบอล','วอลเลย์บอล'],
            courtNum: ['1','2','3']
        })
    }
    useEffect(() => {
        fetchData()
    },[])
    const onStartDateChange = (date) => {
        console.log('this runs')
        if (date < currentDate) {
            
        }
        else setStartDate(date)
    }
    const onEndDateChange = (date) => {

    }
    return (
        <div className="disable-court-wrapper px-2 py-2 mt-3">
            <Form className='disable-court-form'>
                <div className="d-flex flex-row">
      
                        <Form.Label srOnly={true}>ประเภทกีฬา</Form.Label>
                        <Form.Control name='sports' as='select' ref={register}>
                            <option value={undefined}>ทั้งหมด</option>
                            {option ? option['sportType'].map((val) => (
                                <option value={val}>{val}</option>
                            )) : <option>ประเภทกีฬา</option>}
                        </Form.Control>
                        <Form.Control name='courtNum' as='select' ref={register} disabled={getValues('sports') ? false: true}>
                            <option value={undefined}>ทั้งหมด</option>
                            {option ? option['courtNum'].map((val) => (
                                <option value={val}>{val}</option>
                            )) : <option>เลขคอร์ด</option>}
                        </Form.Control>
                    <div>
                        <DatePicker className='form-control' selected={startDate} onChange={onStartDateChange} />
                        <Form.Text>{errors.startDateInvalid && "วันที่ไม่ถูกต้อง"}</Form.Text>
                    </div>
                    <div>
                        <DatePicker selected={null} onChange={onEndDateChange} />
                        <Form.Text>{errors.endDateInvalid && "วันที่ไม่ถูกต้อง"}</Form.Text>
                    </div>
                    <Button type='submit'>
                        ค้นหา
                    </Button>
                </div>
            </Form>
            
        </div>

    )
}
export default ListOfCourts