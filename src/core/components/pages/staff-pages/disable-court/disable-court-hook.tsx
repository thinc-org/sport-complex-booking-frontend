import React, { useState, useEffect, useRef, ComponentType, useCallback } from "react"
import axios from "axios"
import {
  RowProps,
  QueryParams,
  ViewResponse,
  ViewRowProps,
  disable_time,
  View,
  TimeSlotRow,
  DisabledCourtSearchBody,
  DisableCourtBody,
  OverlapData,
} from "../../../../dto/disableCourt.dto"
import { Sport } from "../../../../dto/sport.dto"
import add from "date-fns/addDays"
import { client } from "../../../../../axiosConfig"
import Axios from "axios"

export const toViewRowProps = (data: disable_time[] | undefined): ViewRowProps[] => {
  const result: ViewRowProps[] = []
  data?.forEach((element, indx) => {
    result.push({
      indx: indx,
      day: element.day,
      time_slot: element.time_slot,
    })
  })
  return result
}
export const useRow = (initial: ViewRowProps[] = []) => {
  const [overlapData, setOverlapData] = useState<OverlapData>()
  const [inProp, setInProp] = useState(false)
  const [rowData, setRowData] = useState<ViewRowProps[]>(initial)
  const validateTimeSlot = (row: TimeSlotRow) => {
    const newTimeSlot = [parseInt(row.timeSlotStart), parseInt(row.timeSlotEnd)]
    const rowWithSameDay = rowData.filter((r) => r.day === parseInt(row.day))
    if (rowWithSameDay.length === 0) return true
    for (let i = 0; i < rowWithSameDay.length; i++) {
      const currentTimeSlot = rowWithSameDay[i].time_slot
      if (
        (newTimeSlot[0] >= currentTimeSlot[0] && newTimeSlot[0] <= currentTimeSlot[currentTimeSlot.length - 1]) ||
        (newTimeSlot[0] <= currentTimeSlot[0] && newTimeSlot[1] >= currentTimeSlot[0])
      )
        return false
    }
    return true
  }
  const onAddRow = (f: TimeSlotRow) => {
    setRowData((prev) => {
      const timeSlot: number[] = []
      for (let i = parseInt(f.timeSlotStart); i <= parseInt(f.timeSlotEnd); i++) {
        timeSlot.push(i)
      }
      const newRow = { indx: prev?.length, day: parseInt(f.day), time_slot: timeSlot }
      return [...prev, newRow]
    })
    setInProp(false)
  }
  const onDeleteRow = (indx: number) => {
    setRowData((prev) => {
      const arr = [...prev]
      const found = arr.findIndex((element) => element["indx"] === indx)
      if (found > -1) arr.splice(found, 1)
      return arr
    })
  }
  return { inProp, rowData, onAddRow, onDeleteRow, setInProp, toViewRowProps, setRowData, validateTimeSlot, setOverlapData, overlapData }
}

export const useEditCourt = () => {
  const [error, setError] = useState<string>()
  const [isEdit, setIsEdit] = useState(false)
  return { isEdit, setIsEdit, error, setError }
}

export const useDate = (initialStartDate: Date | undefined = undefined, initialEndDate: Date | undefined = undefined) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate)
  const [show, setShow] = useState(false)
  const handleAlert = () => setShow(false)
  const onStartDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0)
    if (date < currentDate || (endDate && date > endDate)) {
      setShow(true)
    } else setStartDate(date)
  }
  const onEndDateChange = (date: Date) => {
    date.setHours(0, 0, 0, 0)
    if (startDate && date < startDate) setShow(true)
    else setEndDate(date)
  }
  return { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert, setStartDate, setEndDate }
}

export const useOption = () => {
  const [option, setOption] = useState<Sport[]>()
  const [currentSport, setCurrentSport] = useState<string>()
  const fetchOption = () => {
    client
      .get("/court-manager/sports")
      .then((res) => {
        setOption(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchOption()
  }, [])
  return { option, currentSport, setCurrentSport }
}

export const useViewTable = (params: string) => {
  const [viewData, setViewData] = useState<View>()
  const [error, setError] = useState<string>()
  const { inProp, rowData, onAddRow, onDeleteRow, setInProp, setRowData, validateTimeSlot } = useRow()
  const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert, setStartDate, setEndDate } = useDate()
  const source = axios.CancelToken.source()
  const fetchViewData = useCallback(() => {
    client
      .get<ViewResponse>(`/courts/disable-courts/${params}`, { cancelToken: source.token })
      .then((res) => {
        setViewData(res.data)
        setRowData(toViewRowProps(res.data.disable_time))
        setStartDate(add(new Date(res.data.starting_date), 1))
        setEndDate(new Date(res.data.expired_date))
      })
      .catch((err) => {
        if (!Axios.isCancel(err)) setError(err.response.message)
      })
  }, [params, setEndDate, setRowData, setStartDate])

  useEffect(() => {
    fetchViewData()
    return () => source.cancel()
  }, [fetchViewData])
  return {
    viewData,
    inProp,
    rowData,
    onAddRow,
    onDeleteRow,
    setInProp,
    error,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    show,
    handleAlert,
    validateTimeSlot,
  }
}

export const useTableWithPagination = () => {
  const [params, setParams] = useState<QueryParams>({
    sportObjId: undefined,
    starting_date: undefined,
    expired_date: undefined,
    court_num: undefined,
    start: 0,
    end: 9,
  })
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<RowProps[]>()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const firstEffect = useRef(true)
  const nearestFiveFloor = page % 5 === 0 && page !== 1 ? page - 4 : 5 * Math.floor(page / 5) + 1
  const nearestFiveCeil = 5 * Math.ceil(page / 5) > maxPage ? maxPage : 5 * Math.ceil(page / 5)
  const pageArr = Array.from(Array(nearestFiveCeil + 1).keys()).slice(nearestFiveFloor, nearestFiveCeil + 1)
  const onDelete = (id: number) => {
    client
      .delete(`/courts/disable-courts/${id}`)
      .then(() => {
        setParams((prev) => {
          return {
            ...prev,
            start: 10 * page - 9 - 1,
            end: 10 * page - 1,
            shouldChange: prev.shouldChange ? !prev.shouldChange : true,
          }
        })
      })
      .catch(() => setIsError(true))
  }
  function jumpUp() {
    const currentPage = page ?? 0
    setPage(5 * Math.ceil(currentPage / 5) + 1)
  }
  function jumpDown() {
    const currentPage = page ?? 0
    if (currentPage % 5 === 0) setPage(5 * (Math.floor(currentPage / 5) - 1))
    else setPage(5 * Math.floor(currentPage / 5))
  }
  const fetchData = (parameter: DisabledCourtSearchBody) => {
    client
      .post("/courts/disable-courts/search", parameter)
      .then((res) => {
        const result = res.data.sliced_results
        setMaxPage(Math.ceil(res.data.total_found / 10))
        setData(result)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        start: 10 * page - 9 - 1,
        end: 10 * page - 1,
      }
    })
  }, [page])

  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false
      return
    }
    fetchData({
      sport_id: params.sportObjId,
      starting_date: params.starting_date,
      expired_date: params.expired_date,
      court_num: params.court_num,
      start: params.start,
      end: params.end,
    })
  }, [params])

  return { data, page, maxPage, setPage, jumpUp, jumpDown, setParams, pageArr, onDelete, isError, setIsError }
}

export const seed = () => {
  const arr: DisableCourtBody[] = []
  for (let i = 1; i < 40; i++) {
    arr.push({
      sport_id: "5fe45df25f8cc3264d3a8895",
      court_num: i,
      starting_date: new Date(),
      expired_date: new Date(),
      description: "hello",
      disable_time: [
        {
          day: 4,
          time_slot: [i, i + 1],
        },
      ],
    })
  }
  for (let k = 1; k < 40; k++) {
    arr.push({
      sport_id: "5fe45df25f8cc3264d3a8895",
      court_num: k + 40,
      starting_date: new Date(),
      expired_date: new Date(),
      description: "hello",
      disable_time: [
        {
          day: 3,
          time_slot: [k, k + 1],
        },
      ],
    })
  }
  arr.forEach((val) => {
    client
      .post("/courts/disable-courts", val)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  })
}

export function withDeletable<P>(Component: ComponentType<P>, F: (indx: number) => void): React.FC<P> {
  return function WithDeletable(props: P) {
    return <Component {...props} onClick={F} />
  }
}
