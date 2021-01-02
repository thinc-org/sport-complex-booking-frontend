import React, { FunctionComponent, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Col, Form, Button, Table } from "react-bootstrap"
import SuccessfulReservation, { Sport, Court } from "../interfaces/reservationSchemas"
import format from "date-fns/format"
import { convertSlotToTime, getTimeText } from "./ReservationDetail"
import { client } from "../../../../../axiosConfig"

const AllReservation: FunctionComponent = () => {
  // Page state
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUser, setMaxUser] = useState<number>(1)
  // Search state
  const [sportType, setSportType] = useState<string>("") // id
  const [sportIdx, setSportIdx] = useState<number>(-2)
  const [courtNo, setCourtNo] = useState<number>(-2) // -2 is default
  const [chooseDate, setChooseDate] = useState<boolean>(false)
  const [searchDate, setSearchDate] = useState<Date>(new Date())
  const [searchTime, setSearchTime] = useState<number>(-1)
  // Reservation room state
  const [reserveInfo, setReserveInfo] = useState<SuccessfulReservation[]>([])
  const [allSports, setAllSports] = useState<Sport[]>([])

  const history = useHistory()
  const { pagename } = useParams<{ pagename: string }>()

  // useEffects //
  useEffect(() => {
    console.log(pagename)
  }, [pagename])

  useEffect(() => {
    client({
      method: "GET",
      // court-manager/getSports
      url: "/court-manager/sports/",
    })
      .then(({ data }) => {
        console.log(data)
        setAllSports(data)
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data.status === 401) history.push("/staff")
      })
  }, [pagename])

  useEffect(() => {
    requestInfo()
  }, [sportType, courtNo, searchDate, searchTime, pagename])

  // useEffect(() => {
  //   console.log(searchDate)
  // }, [searchDate])

  // handles //
  const handleInfo = (e) => {
    history.push(`/staff/reservationDetail/${pagename}/${e.target.id}`)
  }

  const handleChangeSport = (e) => {
    let idx: number = parseInt(e.target.value)
    if (allSports.length !== 0 && idx >= 0) setSportType(allSports[idx]._id)
    else setSportType("")
    setCourtNo(-2)
    setSportIdx(idx)
  }

  const handleChangeDate = (e) => {
    setChooseDate(true)
    let today = new Date()
    let incom = new Date(e.target.value)
    setSearchDate(incom < today ? today : incom)
  }

  // requests //
  const requestInfo = () => {
    // request reservation_info //
    let url: string = pagename === "success" ? "/all-reservation" : "/all-waiting-room"
    let data = {}
    if (sportType !== "") data["sportId"] = sportType
    if (courtNo >= 0) data["courtNumber"] = courtNo
    if (chooseDate) data["date"] = searchDate
    if (searchTime !== -1) data["timeSlot"] = searchTime
    client({
      method: "POST",
      url,
      data,
    })
      .then(({ data }) => {
        console.log(data)
        setReserveInfo(data[1])
        setMaxUser(data[0])
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  // other functions //
  const sportIdToName = (id: string): string => {
    // convert sport id to sport name //
    for (let sport of allSports) if (sport._id === id) return sport.sport_name_th
    return ""
  }

  // renders //
  const renderSportTypeFilter = () => {
    let i = 0
    let sportList = allSports.map((info) => (
      <option key={i} value={i++}>
        {info.sport_name_th}
      </option>
    ))
    return (
      <Form.Control className="form-pink" as="select" value={sportIdx} onChange={handleChangeSport}>
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
      let courtList = allCourts.map((info) => (
        <option key={info.court_num} value={info.court_num}>
          {info.court_num}
        </option>
      ))
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
      <option key={-1} value={-1} disabled>
        เลือกเวลา
      </option>,
      <option key={0} value={0}>
        ทั้งหมด
      </option>,
    ]
    for (let i = 1; i <= 48; i++)
      timeList.push(
        <option key={i} value={i}>
          {convertSlotToTime(i)}
        </option>
      )
    return (
      <Form.Control
        className="form-pink"
        as="select"
        defaultValue={-1}
        onChange={(e) => {
          setSearchTime(parseInt(e.target.value))
        }}
      >
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
          <Form.Control className="form-pink" type="date" value={chooseDate ? format(searchDate, "yyyy-MM-dd") : ""} onChange={handleChangeDate} />
        </Col>
        <Col>{renderTimeFilter()}</Col>
      </Form.Row>
    )
  }

  const renderTable = () => {
    let usersList = reserveInfo.map((info) => {
      const { sport_id, court_number, date, time_slot } = info
      return (
        <tr key={info._id} className="tr-normal">
          <td>{sportIdToName(sport_id)}</td>
          <td>{court_number}</td>
          <td>{date ? format(new Date(date), "dd-MM-yyyy") : ""}</td>
          <td>{getTimeText(time_slot)}</td>
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
