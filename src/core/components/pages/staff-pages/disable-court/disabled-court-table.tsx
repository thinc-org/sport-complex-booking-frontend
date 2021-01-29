import React, { useState } from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import { format } from "date-fns"
import subDays from "date-fns/subDays"
import { client } from "../../../../../axiosConfig"
import { getMinute, getTime, dayArr } from "./mapTime"
import { useDisplayOverlapData } from "./disable-court-hook"
import { DeleteButton } from "./button"
import { RowProps, TableProps, ViewRowProps, ErrorRowProps, OverlapDataTableProps } from "../../../../dto/disableCourt.dto"

export const CourtRow = ({ _id, starting_date, expired_date, court_num, sport_id, button }: RowProps) => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const onNavigate = () => history.push(`${path}/${_id}`)
  const startingDate = new Date(starting_date)
  const expiredDate = subDays(new Date(expired_date), 1)
  return (
    <>
      {_id && (court_num || court_num === 0) ? (
        <tr>
          <td>{court_num}</td>
          <td>{sport_id.sport_name_th}</td>
          <td>{format(startingDate, "dd/MM/yyyy")}</td>
          <td className="d-flex flex-row justify-content-between align-items-center">
            {format(expiredDate, "dd/MM/yyyy")}
            <div className="d-flex flex-row">
              <Button variant="outline-transparent" className="mr-2" onClick={onNavigate}>
                ดูข้อมูล
              </Button>
              {button}
            </div>
          </td>
        </tr>
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

export const ErrorRow = ({ date, phone, indx, time_slot, button, _id, type }: ErrorRowProps) => {
  const [hidden, setHidden] = useState(false)
  const onDelete = (id: number | string, type = "") => {
    const path = type === "reservation" ? "all-reservation" : "all-waiting-room"
    client
      .delete(`${path}/${id}`)
      .then((res) => {
        console.log(res)
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
          <td>{phone}</td>
          <td>{overlapDate}</td>
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
export const OverlapDataTable: React.FC<OverlapDataTableProps> = ({ overlapData }) => {
  const { data } = useDisplayOverlapData(overlapData)
  return (
    <div>
      {CourtTable<ErrorRowProps>({
        data: data,
        header: ["index", "เบอร์ติดต่อ", "วันที่ทับซ้อน", "เวลาที่ทับซ้อน"],
        Row: ErrorRow,
      })}
    </div>
  )
}
