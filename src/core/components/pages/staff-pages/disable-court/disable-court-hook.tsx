
import * as React from 'react'
import { useState, useEffect, useRef, ComponentType } from 'react';
import { Option, RowProps, QueryParams, ViewResponse, ViewRowProps, disable_time, View } from './disable-court-interface'
import { client } from '../../../../../axiosConfig'

export const toViewRowProps = (data: disable_time[] | undefined): ViewRowProps[] => {
    const result: ViewRowProps[] = []
    data?.forEach((element, indx) => {
        result.push({
            indx: indx,
            day: element.day,
            time_slot: element.time_slot
        })
    })
    return result
}
export const useRow = (initial: ViewRowProps[] = []) => {
    const [inProp, setInProp] = useState(false)
    const [rowData, setRowData] = useState<ViewRowProps[]>(initial)

    const onAddRow = (f) => {
        setRowData(prev => {
            const timeSlot: number[] = []
            for (let i = parseInt(f.timeSlotStart); i <= f.timeSlotEnd; i++) {
                timeSlot.push(i)
            }
            const newRow = { indx: prev?.length, day: parseInt(f.day), time_slot: timeSlot }
            return [...prev, newRow]
        })
        setInProp(false)
    }
    const onDeleteRow = (indx) => {

        setRowData(prev => {
            const arr = [...prev]
            const found = arr.findIndex(element => element['indx'] == indx)
            if (found > -1) arr.splice(found, 1)
            return arr;
        })
    }
    return { inProp, rowData, onAddRow, onDeleteRow, setInProp, toViewRowProps, setRowData }
}

export const useEditCourt = () => {
    const [error, setError] = useState<string>()
    const [isEdit, setIsEdit] = useState(false);

    return { isEdit, setIsEdit, error, setError }

}


export const useDate = (initialStartDate: Date | undefined = undefined, initialEndDate: Date | undefined = undefined) => {
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate)
    const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate)
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
    return { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert, setStartDate, setEndDate }
}



export const useOption = () => {
    const [option, setOption] = useState<Option>()
    const [currentSport, setCurrentSport] = useState<string>()
    const fetchOption = async () => {
        await client.get('/court-manager')
            .then((res) => {
                setOption(res.data)

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchOption()
    }, [])
    return { option, currentSport, setCurrentSport }
}

export const formatDate = (date: Date): string => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
export const incrementDate = (date: Date): Date => {
    date.setDate(date.getDate() + 1);
    return date;
}

export const useViewTable = (params) => {
    const [viewData, setViewData] = useState<View>()
    const [error, setError] = useState<string>()
    const { inProp, rowData, onAddRow, onDeleteRow, setInProp, setRowData } = useRow()
    async function fetchViewData() {
        await client.get<ViewResponse>(`/courts/disable-courts/${params}`,)
            .then((res) => {
                setViewData(res.data)
                setRowData(toViewRowProps(res.data.disable_time))
            })
            .catch(err => setError(err.response.message))
    }
    useEffect(() => {
        fetchViewData()
    }, [])
    return { viewData, inProp, rowData, onAddRow, onDeleteRow, setInProp, error }

}

export const useTableWithPagination = () => {
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
    const onDelete = (id: string) => {
        client.delete(`/courts/disable-courts/${id}`)
            .then((res) => {
                setParams(prev => {
                    return {
                        ...prev,
                        start: ((10 * page) - 9) - 1,
                        end: (10 * page) - 1,
                        shouldChange: prev.shouldChange ? !prev.shouldChange : true
                    }
                })

            })
            .catch((err) => alert('ไม่สามารถลบได้ กรุณาลองใหม่อีกครั้ง'))
    }
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
                const result = res.data.sliced_results
                setMaxPage(Math.ceil(res.data.total_found / 10))
                setData(result)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setParams(prev => {
            return {
                ...prev,
                start: ((10 * page) - 9) - 1,
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
    return { data, page, maxPage, setPage, jumpUp, jumpDown, setParams, pageArr, onDelete }
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

