import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Row, Col, Form, Button, Table } from "react-bootstrap"
import ReservationRoom from "../interfaces/reservationSchemas"
import fetch from "../interfaces/axiosTemplate"

const AllReservation: FunctionComponent<RouteComponentProps> = (props) => {
  // Page state
  let [jwt, set_jwt] = useState<String>("")
  let [page_no, set_page_no] = useState<number>(1)
  let [sport_type, set_sport_type] = useState<string>("")
  let [cord_no, set_cord_no] = useState<number>(1)
  let [search_datetime, set_search_datetime] = useState<Date>()
  // Reservation room state
  let [reserve_info, set_reserve_info] = useState<ReservationRoom[]>([{}, {}])

  // functions //
  useEffect(() => {
    fetch({
      method: "GET",
      url: "/account_info/testing/adminToken",
    })
      .then(({ data }) => {
        set_jwt(data.token.token)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [])
  useEffect(() => {
    requestInfo()
  }, [jwt])

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

  // renders //
  const renderFilterSection = () => {
    return (
      <Form.Row className="align-items-center">
        <Col>
          <Form.Control custom as="select" defaultValue={"ไม่มี"}>
            <option value="ไม่มี" disabled>
              ประเภทกีฬา
            </option>
            <option value="แบตมินตัน">แบตมินตัน</option>
          </Form.Control>
        </Col>
        <Col sm={2}>
          <Form.Control custom as="select" defaultValue={0}>
            <option value={0} disabled>
              เลขคอร์ด
            </option>
            <option value={1}>1</option>
          </Form.Control>
        </Col>
        <Col sm={3}>
          <Form.Control className="border" type="date" style={{ backgroundColor: "white" }} />
        </Col>
        <Col sm={2}>
          <Form.Control className="border" type="time" style={{ backgroundColor: "white" }} />
        </Col>
      </Form.Row>
    )
  }

  const renderTable = () => {
    let index = (page_no - 1) * 10 + 1
    let usersList = reserve_info.map((info) => {
      return (
        <tr key={index++} className="tr-normal">
          <td>sss</td>
          <td>sss </td>
          <td> ss</td>
          <td> ss</td>
          <td> sss</td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={String(index)} onClick={handleInfo}>
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
      <div className="mt-2">
        <Table responsive className="text-center" size="md">
          <thead className="bg-light">
            <tr className="tr-pink">
              <th>ประเภทกีฬา</th>
              <th>เลขคอร์ด</th>
              <th>วันที่</th>
              <th>เวลา</th>
              <th>สถานะ</th>
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
