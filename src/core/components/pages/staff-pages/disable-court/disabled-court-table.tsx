import React, { useEffect, useState } from "react"
import { usePagination } from "./disable-court-hook"
import { useRouteMatch, useHistory } from "react-router-dom"
import { Pagination, Button, Table } from "react-bootstrap"

import { format } from "date-fns"
import subDays from "date-fns/subDays"
import { client } from "../../../../../axiosConfig"
import { getMinute, getTime, dayArr } from "./mapTime"
import { DeleteButton } from "./button"
import { RowProps, TableProps, ViewRowProps, ConflictRowProps, OverlapDataTableProps } from "../../../../dto/disableCourt.dto"

export const CourtRow = ({ _id, starting_date, expired_date, court_num, sport_id, button, description }: RowProps) => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const onNavigate = () => history.push(`${path}/${_id}`)
  const startingDate = new Date(starting_date)
  const expiredDate = subDays(new Date(expired_date), 1)
  return (
    <>
      {_id && (court_num || court_num === 0) ? (
        <>
          <tr className="border-bottom-0">
            <td>{court_num}</td>
            <td>{sport_id.sport_name_th}</td>
            <td>{format(startingDate, "dd/MM/yyyy")}</td>
            <td className="d-flex flex-row justify-content-between align-items-center border-0">
              {format(expiredDate, "dd/MM/yyyy")}
              <div className="d-flex flex-row">
                <Button variant="outline-transparent" className="mr-2" onClick={onNavigate}>
                  ดูข้อมูล
                </Button>
                {button}
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={5} className="border-0 py-0">
              <span>คำอธิบาย:</span> {`${description}`}
            </td>
          </tr>
        </>
      ) : (
        <tr>ข้อมูลถูกลบไปแล้ว</tr>
      )}
    </>
  )
}

export const ViewRow = ({ time_slot, indx, day, button }: ViewRowProps) => {
  const minute = getMinute(time_slot)
  return (
    <tr>
      <td>{indx + 1}</td>
      <td>{dayArr[day]}</td>
      <td>{getTime(minute.startTime)}</td>
      <td className={button ? "d-flex flex-row justify-content-end align-items-center" : ""}>
        {getTime(minute.endTime)}
        {button}
      </td>
    </tr>
  )
}

export const ErrorRow = ({ date, phone, indx, time_slot, button, _id, type, name_th, name_en, court_num }: ConflictRowProps) => {
  const [hidden, setHidden] = useState(false)
  const onDelete = (id: number | string, type = "") => {
    const path = type === "reservation" ? "all-reservation" : "all-waiting-room"
    client
      .delete(`${path}/${id}`)
      .then((res) => {
        setHidden(true)
      })
      .catch((err) => console.log(err))
  }
  const time = getMinute(time_slot)
  const overlapDate = format(new Date(date), "dd/MM/yyyy")
  return (
    <>
      {!hidden && (
        <tr>
          <td>{indx + 1}</td>
          <td>{name_th}</td>
          <td>{name_en}</td>
          <td>{phone}</td>
          <td>{overlapDate}</td>
          {court_num && <td>{court_num}</td>}
          <td className={button ? "d-flex flex-row justify-content-end align-items-center" : ""}>
            <span className="mr-2 d-inline-flex flex-row justify-content-center align-items-center">
              {`${getTime(time.startTime)}-${getTime(time.endTime)}`}
            </span>
            <DeleteButton onClick={onDelete} indx={_id} type={type} phone={phone} />
          </td>
        </tr>
      )}
    </>
  )
}

export function CourtTable<T>({ data, header, Row, Button }: TableProps<T>): React.ReactElement<TableProps<T>> {
  return (
    <Table className="disable-court-table">
      <thead>
        <tr>
          {header.map((val) => (
            <th key={val}>{val}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((val, index) => (
          <Row {...val} indx={index} key={val._id || index} button={Button ? <Button indx={val._id ?? index} /> : undefined} />
        ))}
      </tbody>
    </Table>
  )
}
export function OverlapDataTable<T>({ data, header, Row }: OverlapDataTableProps<T>): React.ReactElement<OverlapDataTableProps<T>> {
  const { page, setPage, maxPage, setMaxPage, pageArr, jumpDown, jumpUp } = usePagination()
  const [displayData, setDisplayData] = useState<T[]>(data ? data.slice(0, 10) : [])
  useEffect(() => {
    setMaxPage(Math.ceil(data ? data.length / 10 : 0))
  }, [setMaxPage, data])
  useEffect(() => {
    setDisplayData(data ? data.slice(10 * page - 10, 10 * page - 1) : [])
  }, [page, setDisplayData, data])
  return (
    <div>
      {CourtTable<T>({
        data: displayData,
        header: header,
        Row: Row,
      })}
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            if (page > 1) setPage((prev) => prev - 1)
          }}
        />
        {page > 5 && <Pagination.Ellipsis onClick={jumpDown} />}
        {pageArr.map((val) => (
          <Pagination.Item
            key={val}
            onClick={() => {
              setPage(val)
            }}
          >
            {val}
          </Pagination.Item>
        ))}
        {page > Math.floor(maxPage / 5) * 5 || page === maxPage || maxPage <= 5 ? "" : <Pagination.Ellipsis onClick={jumpUp} />}
        <Pagination.Next
          onClick={() => {
            if (page < maxPage) setPage((prev) => prev + 1)
          }}
        />
      </Pagination>
    </div>
  )
}
