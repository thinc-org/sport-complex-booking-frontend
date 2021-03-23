import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Row, Col, Form, Button, Table } from "react-bootstrap"
import { ReserveListRes, Room } from "../../../../dto/reservation.dto"
import { Sport } from "../../../../dto/sport.dto"
import { format, isValid } from "date-fns"
import { getTimeText } from "./ReservationDetail"
import { client } from "../../../../../axiosConfig"
import { AxiosResponse } from "axios"
import PaginationComponent from "../list-of-all-users-pages/PaginationComponent"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"
import { ErrModal } from "./DeleteModalComponent"

interface RequestBody {
  sportId: string
  courtNumber: number
  date: Date
  timeSlot: number
}

const AllReservation: FunctionComponent = () => {
  // Page state
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUser, setMaxUser] = useState<number>(1)
  const [maxUserPerPage] = useState<number>(10)
  const [showErr, setShowErr] = useState<boolean>(false)
  // Search state
  const [sportType, setSportType] = useState<string>("") // id
  const [sportIdx, setSportIdx] = useState<string>("-2")
  const [courtNo, setCourtNo] = useState<number>(-2) // -2 is default
  const [searchDate, setSearchDate] = useState<Date | null>(null)
  const [searchTime, setSearchTime] = useState<number>(-1)
  // Reservation room state
  const [reserveInfo, setReserveInfo] = useState<Room[]>([])
  const [allSports, setAllSports] = useState<Sport[]>([])
  const everySports = allSports.find((sport: Sport) => sport._id === sportType) ? allSports.find((sport: Sport) => sport._id === sportType) : null

  const history = useHistory()
  const { pagename } = useParams<{ pagename: string }>()

  // requests //
  const requestInfo = useCallback(() => {
    // request reservation_info //
    const url: string = pagename === "success" ? "/all-reservation" : "/all-waiting-room"
    const data: Partial<RequestBody> = {}
    if (sportType !== "") data["sportId"] = sportType
    if (courtNo >= 0) data["courtNumber"] = courtNo
    if (searchDate) data["date"] = searchDate
    if (searchTime !== -1) data["timeSlot"] = searchTime
    client({
      method: "POST",
      url,
      data,
    })
      .then(({ data }: AxiosResponse<ReserveListRes>) => {
        setReserveInfo(data[1])
        setMaxUser(data[0])
        setIsLoading(false)
      })
      .catch(() => {
        setShowErr(true)
      })
  }, [courtNo, pagename, searchDate, searchTime, sportType])

  // useEffects
  useEffect(() => {
    requestInfo()
  }, [requestInfo])

  useEffect(() => {
    client
      .get<Sport[]>("/court-manager/sports/")
      .then(({ data }) => {
        setAllSports(data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [pagename])

  // handles //
  const handleInfo = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    history.push(`/staff/reservationDetail/${pagename}/${target.id}`)
  }

  const handleChangeSport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.value
    if (id !== "-1" && id !== "-2") setSportType(id)
    else setSportType("")
    setCourtNo(-2)
    setSportIdx(id)
  }

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValid(new Date(e.target.value))) setSearchDate(null)
    else setSearchDate(new Date(e.target.value))
  }

  // other functions //
  const sportIdToName = (id: string): string => {
    // convert sport id to sport name //
    const sport = allSports.find((sport) => sport._id === id)
    return sport?.sport_name_th || ""
  }

  // renders //
  const sportTypeFilter = (
    <Form.Control className="form-pink" as="select" value={sportIdx} onChange={handleChangeSport}>
      <option value={-2} disabled>
        ประเภทกีฬา
      </option>
      <option value={-1}>ทั้งหมด</option>
      {allSports.map((info) => (
        <option key={info._id} value={info._id}>
          {info.sport_name_th}
        </option>
      ))}
    </Form.Control>
  )

  const courtNumberFilter =
    sportType !== "" ? (
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
        {everySports &&
          everySports.list_court.map((info) => (
            <option key={info.court_num} value={info.court_num}>
              {info.court_num}
            </option>
          ))}
      </Form.Control>
    ) : (
      <Form.Control className="form-pink" as="select" defaultValue={courtNo}>
        <option disabled value={-2}>
          กรุณาเลือกประเภทกีฬาก่อน
        </option>
      </Form.Control>
    )

  const timeFilter = (
    <Form.Control
      className="form-pink"
      as="select"
      defaultValue={-1}
      onChange={(e) => {
        setSearchTime(parseInt(e.target.value))
      }}
    >
      <option key={-1} value={-1} disabled>
        เลือกเวลา
      </option>
      ,
      <option key={0} value={0}>
        ทั้งหมด
      </option>
      {Array.from(Array(24).keys()).map((i) => (
        <option key={i + 1} value={i + 1}>
          {getTimeText([i + 1])}
        </option>
      ))}
    </Form.Control>
  )

  const filterSection = (
    <Form.Row className="align-items-center mt-3">
      <Col sm={3}>{sportTypeFilter}</Col>
      <Col sm={2}>{courtNumberFilter}</Col>
      <Col sm={3}>
        <Form.Control
          className="form-pink"
          type="date"
          value={isValid(searchDate) ? format(searchDate!, "yyyy-MM-dd") : ""}
          onChange={handleChangeDate}
        />
      </Col>
      <Col sm={1} className="text-center">
        <Button
          className="btn-normal btn-outline-black px-3"
          variant="outline-secondary"
          style={{ borderRadius: "10px" }}
          onClick={() => setSearchDate(null)}
        >
          ลบ
        </Button>
      </Col>
      <Col sm={3}>{timeFilter}</Col>
    </Form.Row>
  )

  const table = reserveInfo.map((info) => {
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

  return (
    <>
      <div className="allReservation mr-4" style={{ display: isLoading ? "none" : "block" }}>
        {filterSection}
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
            <tbody>{table}</tbody>
          </Table>
          <Row>
            <Col>
              <PaginationComponent pageNo={pageNo} setPageNo={setPageNo} maxUser={maxUser} maxUserPerPage={maxUserPerPage} />
            </Col>
          </Row>
        </div>
        <ErrModal show={showErr} onClose={() => setShowErr(false)} />
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default AllReservation
