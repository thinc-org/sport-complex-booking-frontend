
import * as React from 'react'
import { useState, useEffect, useLayoutEffect, useRef, ComponentType } from 'react';
import { Option, RowProps, Pagination, QueryParams, ViewResponse, DisableFormData, ViewRowProps } from './disable-court-interface'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { client } from '../../../../../axiosConfig'
import { AxiosResponse } from 'axios';


export const useRow = () => {
    const [inProp, setInProp] = useState(false)
    const [rowData, setRowData] = useState<ViewRowProps[]>([])
    const onAddRow = (f) => {
        setRowData(prev => {
            const timeSlot: number[] = []
            for (let i = parseInt(f.timeSlotStart); i <= f.timeSlotEnd; i++) {
                timeSlot.push(i)
            }
            const newRow = { indx: prev?.length, day: f.day, time_slot: timeSlot }
            console.log(newRow)
            return [...prev, newRow]
        })
        setInProp(false)
    }
    const onDeleteRow = (e) => {
        const i = e.target.dataset.indx
        setRowData(prev => {
            const arr = [...prev]
            const found = arr.findIndex(element => element['indx'] == i)
            if (found > -1) arr.splice(found, 1)
            return arr;
        })
    }
    return { inProp, rowData, onAddRow, onDeleteRow, setInProp }
}
export const useDeleteCourt = (id) => {
    const [show, setShow] = useState(false);
    const onDelete = () => {
        client.delete('/courts/disable-courts', {
            params: {
                id: id
            }
        })
            .then((res) => {
                console.log(res)
                setShow(false)


            })
            .catch((err) => console.log(err))
    }
    return { show, setShow, onDelete }
}
export const useDate = () => {
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const [startDate, setStartDate] = useState<Date>()
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
        if (startDate && date < startDate) setShow(true)
        else setEndDate(date)
    }
    return { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert }
}

export const handleDelete = (id: string) => {
    client.delete('/courts/disable-courts', {
        params: {
            id: id
        }
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
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

export const useViewTable = (params) => {
    const [data, setData] = useState<ViewResponse>()
    async function fetchViewData() {
        await client.get<ViewResponse>(`/courts/disable-courts/${params}`,)
            .then((res) => {
                console.log(res)
                setData(res.data)

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchViewData()
    }, [])
    return { data }

}

export const useTable = () => {
    const [params, setParams] = useState<QueryParams>({
        sport_id: undefined,
        starting_date: undefined,
        expired_date: undefined,
        court_num: undefined,
        start: 0,
        end: 9
    })
    const [data, setData] = useState<RowProps[]>();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const firstEffect = useRef(true);
    const nearestFiveFloor = (page % 5 == 0 && page != 1) ? page - 4 : (5 * Math.floor(page / 5)) + 1
    const nearestFiveCeil = (5 * Math.ceil((page) / 5)) > maxPage ? maxPage : (5 * Math.ceil((page) / 5))
    const pageArr = Array.from(Array(nearestFiveCeil + 1).keys()).slice(nearestFiveFloor, nearestFiveCeil + 1)
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
        console.log('fetch')
        await client.post('/courts/disable-courts/search', parameter)
            .then(res => {
                console.log(res.data.total_found)
                setMaxPage(Math.ceil(res.data.total_found / 10))
                setData(res.data.sliced_results)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setParams(prev => {
            return {
                ...prev,
                start: ((10 * page) - 9) - 1, // page could actually be calculated from params state
                end: (10 * page) - 1
            }
        })
    }, [page])
    useEffect(() => {
        if (firstEffect.current) {
            firstEffect.current = false;
            return;
        }
        fetchData(params)
    }, [params])
    return { data, page, maxPage, setPage, jumpUp, jumpDown, setParams, pageArr }
}


export const seed = () => {
    const arr: any[] = []
    for (let i = 1; i < 40; i++) {
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
    for (let k = 1; k < 40; k++) {
        arr.push({
            sport_id: '5fe45df25f8cc3264d3a8895',
            court_num: k + 40,
            starting_date: new Date(),
            expired_date: new Date(),
            description: 'hello',
            disable_time: [
                {
                    day: 3,
                    time_slot: [k, k + 1]
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

export function withDeletable<P>(Component: ComponentType<P>, F: any): React.FC<P> {
    return function WithDeletable(props: P) {
        return (
            <Component {...props} onClick={F} />
        )
    }
}

