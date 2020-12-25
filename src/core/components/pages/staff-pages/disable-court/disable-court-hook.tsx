
import { useState, useEffect } from 'react';
import { Option, RowType, Pagination, QueryParams } from './disable-court-interface'
import { client } from '../../../../../axiosConfig'
export const useDate = (setError) => {
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
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
            courtNum: [1, 2, 3]
        })
    }
    useEffect(() => {
        fetchOption()
    }, [])
    return { option }
}

export const formatDate = (date: Date): string => {
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
export const useTable = () => {
    const [params, setParams] = useState<QueryParams>({
        sport_id: undefined,
        starting_date: new Date(),
        expired_date: undefined,
        court_num: undefined,
        start: 0,
        end: 9
    })
    const [data, setData] = useState<RowType[]>();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    function jumpUp() {
        const currentPage = page ?? 0
        setPage(5 * Math.ceil(currentPage / 5) + 1)
    }
    function jumpDown() {
        const currentPage = page ?? 0;
        if (currentPage % 5 == 0) setPage(5 * (Math.floor(currentPage / 5) - 1))
        else setPage(5 * (Math.floor(currentPage / 5)))
    }
    const fetchData = async (parameter) => {
        await client.post('/courts/disable-courts/search', parameter)
            .then(res => {
                console.log(res.data.total_found)
                setMaxPage(Math.ceil(res.data.total_found / 10))
                setData(res.data.sliced_results)


            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        console.log('change params')
        setParams(prev => {
            return {
                ...prev,
                start: ((10 * page) - 9) - 1, // page could actually be calculated from params state
                end: (10 * page) - 1
            }
        })
    }, [page])
    useEffect(() => {
        console.log('fetch')
        fetchData(params)
    }, [params])
    return { data, page, maxPage, setPage, jumpUp, jumpDown, setParams }
}

export const seed = () => {
    const arr: any[] = []
    for (let i = 1; i < 60; i++) {
        arr.push({
            sport_id: '5fe45df25f8cc3264d3a8895',
            court_num: i,
            starting_date: new Date(),
            expired_date: new Date(),
            description: 'hello',
            disable_time: [
                {
                    day: 4,
                    time_slot: [i, i + 1]
                }
            ]

        })
    }
    arr.forEach((val) => {
        console.log(val)
        client.post('/courts/disable-courts', val)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    })
}