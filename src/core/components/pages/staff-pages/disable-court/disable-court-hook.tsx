
import { useState, useEffect } from 'react';
import { Option, RowType } from './disable-court-interface'
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
    const [params, setParams] = useState()
    const [data, setData] = useState<RowType[]>();
    const [page, setPage] = useState(0);
    const formatDate = (date: Date): string => {
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    }
    const fetchData = async () => {
        await setData([
            {
                courtNum: '1',
                sports: 'Basketball',
                startDate: formatDate(new Date()),
                endDate: formatDate(new Date()),
                id: '12345'
            },
            {
                courtNum: '1',
                sports: 'Basketball',
                startDate: formatDate(new Date()),
                endDate: formatDate(new Date()),
                id: '12345'
            },
            {
                courtNum: '1',
                sports: 'Basketball',
                startDate: formatDate(new Date()),
                endDate: formatDate(new Date()),
                id: '12345'
            }
        ])
    }
    useEffect(() => {
        fetchData()
    }, [page])
    return { data, page }
}

