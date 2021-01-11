import React from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import { format } from "date-fns"
import addDays from "date-fns/addDays"
import { getMinute, getTime, dayArr } from "./mapTime"
import { RowProps, TableProps, ViewRowProps } from "../../../../dto/disableCourt.dto"

export const CourtRow = ({ _id, starting_date, expired_date, court_num, sport_id, button }: RowProps) => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const onNavigate = () => history.push(`${path}/${_id}`)
  const startingDate = addDays(new Date(starting_date), 1)
  const expiredDate = new Date(expired_date)
  return (
    <>
      {_id && court_num ? (
        <tr>
          <td>{court_num}</td>
          <td>{sport_id.sport_name_th}</td>
          <td>{format(startingDate, "MM/dd/yyyy")}</td>
          <td className="d-flex flex-row justify-content-between align-items-center">
            {format(expiredDate, "MM/dd/yyyy")}
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
      <td>{indx}</td>
      <td>{dayArr[day]}</td>
      <td>{getTime(minute.startTime)}</td>
      <td className={button ? "d-flex flex-row justify-content-end align-items-center" : ""}>
        {getTime(minute.endTime)}
        {button}
      </td>
    </tr>
  )
}

export function CourtTable<T>({ data, header, Row, Button }: TableProps<T>) {
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
          <Row
            {...val}
            indx={index}
            key={val._id || index}
            button={Button ? <Button indx={typeof val._id === "number" ? val._id : index} /> : undefined}
          />
        ))}
      </tbody>
    </Table>
  )
}
