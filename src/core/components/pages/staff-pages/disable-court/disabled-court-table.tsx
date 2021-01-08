import React from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import { format } from "date-fns"
import addDays from "date-fns/addDays"
import { getMinute, getTime , dayArr } from "./mapTime"
import { RowProps, TableProps, ViewRowProps } from "./disable-court-interface"

export const CourtRow = (props: RowProps) => {
  const { url, path } = useRouteMatch()
  const history = useHistory()
  const onNavigate = () => history.push(`${path}/${props._id}`)
  const startingDate = addDays(new Date(props.starting_date), 1)
  const expiredDate = new Date(props.expired_date)
  return (
    <>
      {props._id && props.court_num ? (
        <tr>
          <td>{props.court_num}</td>
          <td>{props.sport_id.sport_name_th}</td>
          <td>{format(startingDate, "MM/dd/yyyy")}</td>
          <td className="d-flex flex-row justify-content-between align-items-center">
            {format(expiredDate, "MM/dd/yyyy")}
            <div className="d-flex flex-row">
              <Button variant="outline-transparent" className="mr-2" onClick={onNavigate}>
                ดูข้อมูล
              </Button>
              {props.button}
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
        {data?.map((val, indx) => {
          return <Row {...val} indx={indx} key={val._id ?? indx} button={Button ? <Button indx={val._id ?? indx} /> : null} />
        })}
      </tbody>
    </Table>
  )
}
