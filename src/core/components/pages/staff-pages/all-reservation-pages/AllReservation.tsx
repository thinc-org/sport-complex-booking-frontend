import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Row, Col, Form, Button, Table } from "react-bootstrap"
import SuccessfulReservation from "../interfaces/reservationSchemas"
import fetch from "../interfaces/axiosTemplate"

const AllReservation: FunctionComponent<RouteComponentProps> = (props) => {
  // Page state
  let [jwt, set_jwt] = useState<String>("")
  let [page_no, set_page_no] = useState<number>(1)
  let [max_user, set_max_user] = useState<number>(1)
  let [sport_type, set_sport_type] = useState<string>("")
  let [cord_no, set_cord_no] = useState<number>(1)
  let [search_datetime, set_search_datetime] = useState<Date>(new Date(""))
  // Reservation room state
  let [reserve_info, set_reserve_info] = useState<SuccessfulReservation[]>([])

  // useEffects //
  useEffect(() => {
    fetch({
      method: "GET",
      url: "/......",
    })
      .then(({ data }) => {
        console.log(data)
        // set_reserve_info(data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [])
  // useEffect(() => {
  //   requestInfo()
  // }, [jwt])

  // handles //
  const handleInfo = (e) => {
    props.history.push({
      pathname: "/reservationDetail/" + "1",
    })
  }

  // requests //
  const requestInfo = () => {
    // request reservation_info //
    // fetch({
    //   method: "GET",
    //   url: "/account_info/testing/adminToken",
    // })
    //   .then(({ data }) => {
    //     set_jwt(data.token.token)
    //   })
    //   .catch(({ response }) => {
    //     console.log(response)
    //   })
  }

  // other functions //
  const sportIdToName = (id: string) => {
    // convert sport id to sport name //
    let name = "123"
    return name
  }

  // renders //
  const renderSportTypeFilter = () => {
    if (sport_type !== "")
      return (
        <Form.Control className="form-pink" as="select" defaultValue={0}>
          <option value={0} disabled>
            เลขคอร์ด
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Form.Control>
      )
    return (
      <Form.Control className="form-pink" as="select" defaultValue={0}>
        <option value={0} disabled>
          กรุณาเลือกประเภทกีฬาก่อน
        </option>
      </Form.Control>
    )
  }

  const renderFilterSection = () => {
    return (
      <Form.Row className="align-items-center mt-3">
        <Col>
          <Form.Control className="form-pink" as="select" defaultValue={"ไม่มี"}>
            <option value="ไม่มี" disabled>
              ประเภทกีฬา
            </option>
          </Form.Control>
        </Col>
        <Col sm={2}>{renderSportTypeFilter()}</Col>
        <Col sm={3}>
          <Form.Control className="form-pink" type="date" />
        </Col>
        <Col sm={2}>
          <Form.Control className="form-pink" type="time" />
        </Col>
      </Form.Row>
    )
  }

  const renderTable = () => {
    let index = (page_no - 1) * 10 + 1
    let usersList = reserve_info.map((info) => {
      return (
        <tr key={index++} className="tr-normal">
          <td>{sportIdToName(info.sport_id)}</td>
          <td>{info.court_num}</td>
          <td>{info.date.getDate()}</td>
          <td>{info.time_slot[0].start_time + " - " + info.time_slot[info.time_slot.length - 1].end_time}</td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={info._id} onClick={handleInfo}>
              ดูข้อมูล
            </Button>
          </td>
        </tr>
      )
    })
    return usersList
  }

  return (
    <div className="allReservation">
      {renderFilterSection()}
      <div className="mt-4">
        <Table responsive className="text-center" size="md">
          <thead className="bg-light">
            <tr className="tr-pink">
              <th>ประเภทกีฬา</th>
              <th>เลขคอร์ด</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </Table>
      </div>
    </div>
  )
}

export default AllReservation
