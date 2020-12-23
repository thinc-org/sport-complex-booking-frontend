
import { useState, useEffect } from 'react';
interface RowType {
    courtNum: string,
    sports: string,
    startDate: Date,
    endDate: Date,
    id: string
}
interface Option {
    sportType: string[],
    courtNum: string[]
}
export const useDate = (setError) => {
    const currentDate = new Date().setHours(0, 0, 0, 0)
    const [startDate, setStartDate] = useState(currentDate)
    const [endDate, setEndDate] = useState<Date>()
    const [show, setShow] = useState(false);
    const handleAlert = () => setShow(false)
    const onStartDateChange = (date) => {
        date.setHours(0, 0, 0, 0)
        if (date < currentDate || (endDate && date > endDate)) {
            setShow(true)
        }
        else setStartDate(date)
    }
    const onEndDateChange = (date) => {
        date.setHours(0, 0, 0, 0)
        if (date < startDate) setShow(true)
        else setEndDate(date)
    }
    return { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert }
}


export const useOption = () => {
    const [option, setOption] = useState<Option>()
    const fetchOption = async () => {
        await setOption({
            sportType: ['แบดมินตัน', 'บาสเกตบอล', 'วอลเลย์บอล'],
            courtNum: ['1', '2', '3']
        })
    }
    useEffect(() => {
        fetchOption()
    }, [])
    return { option }
}

export const useTable = () => {
    const [row, setRow] = useState<RowType>()
    useEffect(() => {

    }, [])
}

