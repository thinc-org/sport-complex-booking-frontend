import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Row, Col, Form, Button, Table } from "react-bootstrap"
import SuccessfulReservation, { Sport, Court } from "../interfaces/reservationSchemas"
// import {convertDate} from "../list-of-all-users-pages/"
import { client } from "../../../../../axiosConfig"

const AllReservation: FunctionComponent<RouteComponentProps<{ pagename: string }>> = (props) => {
  // Page state
  let [pagename] = useState<string>(props.match.params.pagename)
  let [pageNo, setPageNo] = useState<number>(1)
  let [maxUser, setMaxUser] = useState<number>(1)
  // Search state
  let [sportType, setSportType] = useState<string>("") // id
  let [sportIdx, setSportIdx] = useState<number>(-2)
  let [courtNo, setCourtNo] = useState<number>(-2) // -2 is default
  let [searchDate, setSearchDate] = useState<Date>(new Date())
  let [searchTime, setSearchTime] = useState<number>(1)
  // Reservation room state
  let [reserveInfo, setReserveInfo] = useState<SuccessfulReservation[]>([])
  let [allSports, setAllSports] = useState<Sport[]>([])

  // useEffects //
  useEffect(() => {
    client({
      method: "GET",
      url: "/court-manager/",
    })
      .then(({ data }) => {
        console.log(data)
        setAllSports(data.sport_list)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [])

  useEffect(() => {
    requestInfo()
  }, [sportIdx, courtNo, searchDate, searchTime])

  useEffect(() => {
    if (allSports.length !== 0 && sportIdx >= 0) {
      setSportType(allSports[sportIdx]._id)
    }
    setCourtNo(-2)
  }, [sportIdx])

  // useEffect(() => {
  //   console.log(courtNo + " ubub")
  // }, [courtNo])

  useEffect(() => {
    console.log(searchDate)
  }, [searchDate])

  // handles //
  const handleInfo = (e) => {
    props.history.push({
      pathname: "/reservationDetail/" + pagename + "/" + e.target.id,
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

  // handles //

  // renders //
  const renderSportTypeFilter = () => {
    let i = 0
    let sportList = allSports.map((info) => <option value={i++}>{info.sport_name_th}</option>)
    return (
      <Form.Control
        className="form-pink"
        as="select"
        value={sportIdx}
        onChange={(e) => {
          setSportIdx(parseInt(e.target.value))
        }}
      >
        <option value={-2} disabled>
          ประเภทกีฬา
        </option>
        <option value={-1}>ทั้งหมด</option>
        {sportList}
      </Form.Control>
    )
  }

  const renderCourtNumberFilter = () => {
    if (sportType !== "" && sportIdx >= 0) {
      let allCourts: Court[] = allSports[sportIdx].list_court
      let courtList = allCourts.map((info) => <option value={info.court_num}>{info.court_num}</option>)
      return (
        <Form.Control
          className="form-pink"
          as="select"
          value={courtNo}
          onChange={(e) => {
            setCourtNo(parseInt(e.target.value))
          }}
        >
          <option value={-2} disabled>
            เลขคอร์ด
          </option>
          <option value={-1}>ทั้งหมด</option>
          {courtList}
        </Form.Control>
      )
    }
    return (
      <Form.Control className="form-pink" as="select" onChange={() => {}} value={courtNo}>
        <option disabled value={-2}>
          กรุณาเลือกประเภทกีฬาก่อน
        </option>
      </Form.Control>
    )
  }

  const renderTimeFilter = () => {
    let timeList = [
      <option value={-1} disabled>
        เลือกเวลา
      </option>,
      <option value={0}>ทั้งหมด</option>,
    ]
    for (let i = 1; i <= 48; i++)
      timeList.push(
        <option value={i}>{i % 2 === 0 ? i / 2 - 1 + ":30 - " + i / 2 + ":00" : Math.floor(i / 2) + ":00 - " + Math.floor(i / 2) + ":30"}</option>
      )
    return (
      <Form.Control className="form-pink" as="select" defaultValue={-1}>
        {timeList}
      </Form.Control>
    )
  }

  const renderFilterSection = () => {
    return (
      <Form.Row className="align-items-center mt-3">
        <Col>{renderSportTypeFilter()}</Col>
        <Col>{renderCourtNumberFilter()}</Col>
        <Col>
          <Form.Control
            className="form-pink"
            type="date"
            // value={convertDate(searchDate)}
            value={searchDate.getFullYear() + "-" + searchDate.getMonth() + "-" + searchDate.getDate()}
            onChange={(e) => {
              let today = new Date()
              let incom = new Date(e.target.value)
              // console.log(today, incom)
              // console.log(incom < today)
              setSearchDate(incom < today ? today : incom)
            }}
          />
        </Col>
        <Col>{renderTimeFilter()}</Col>
      </Form.Row>
    )
  }

  const renderTable = () => {
    let index = (pageNo - 1) * 10 + 1
    let usersList = reserveInfo.map((info) => {
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
    <div className="allReservation mr-4">
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
