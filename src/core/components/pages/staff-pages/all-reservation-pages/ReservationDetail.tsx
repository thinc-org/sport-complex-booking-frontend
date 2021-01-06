import React, { FunctionComponent, useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { Table, Row, Col, Button, Card } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"
import { ConfirmDelModal, ErrModal, ComDelModal } from "./DeleteModalComponent"

export const convertSlotToTime = (slot: number): string => {
  if (slot % 2 === 0) return String(slot / 2 - 1) + ":30-" + (slot / 2 !== 24 ? String(slot / 2) : "0") + ":00"
  return String(Math.floor(slot / 2)) + ":00-" + String(Math.floor(slot / 2)) + ":30"
}

export const getTimeText = (timeSlot: number[]): string => {
  let text = ""
  let i = 0
  while (i < timeSlot.length) {
    let temp = convertSlotToTime(timeSlot[i])
    if (
      (i === 0 && i !== timeSlot.length - 1) ||
      (0 < i && i < timeSlot.length - 1 && timeSlot[i + 1] === timeSlot[i] + 1 && timeSlot[i - 1] !== timeSlot[i] - 1)
    )
      text += temp.slice(0, temp.indexOf("-"))
    else if (i > 0 && timeSlot[i - 1] === timeSlot[i] - 1 && (i === timeSlot.length - 1 || timeSlot[i + 1] !== timeSlot[i] + 1))
      text += temp.slice(temp.indexOf("-"), 11) + (i === timeSlot.length - 1 ? "" : ",")
    else if (i === timeSlot.length - 1 || timeSlot[i - 1] !== timeSlot[i] - 1) text += temp + (i === timeSlot.length - 1 ? "" : ",")
    i++
  }
  return text
}

const ReservationDetail: FunctionComponent = () => {
  // Page state //
  let [showModalInfo, setShowModalInfo] = useState<DeleteModal>({
    showConfirmDel: false,
    showComDel: false,
    showErr: false,
  })

  // reservation detail state
  let [sportName, setSportName] = useState<string>("แบตมินตัน")
  let [date, setDate] = useState<Date>(new Date())
  let [courtNo, setCourtNo] = useState<number>(0)
  let [timeSlot, setTimeSlot] = useState<number[]>([])
  let [members, setMembers] = useState<UserInfo[]>([])

  const history = useHistory()
  const { pagename, _id } = useParams<{ pagename: string; _id: string }>()

  // useEffects //
  useEffect(() => {
    requestInfo()
  }, [])

  useEffect(() => {
    console.log(pagename, _id)
  }, [pagename, _id])

  // request //
  const requestInfo = () => {
    let url: string = (pagename === "success" ? "/all-reservation" : "/all-waiting-room") + `/${_id}`
    client({
      method: "GET",
      url,
    })
      .then(({ data }) => {
        console.log(data)
        setCourtNo(data.court_number)
        setDate(new Date(data.date))
        setMembers(data.list_member)
        setTimeSlot(data.time_slot)
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data && response.data.status === 401) history.push("/staff")
      })
  }
  const requestDelete = () => {
    let url = (pagename === "success" ? "/all-reservation" : "/all-waiting-room") + `/${_id}`
    client({
      method: "DELETE",
      url,
    })
      .then(({ data }) => {
        setShowModalInfo({ ...showModalInfo, showConfirmDel: false, showComDel: true })
      })
      .catch(({ response }) => {
        console.log(response)
        if (response.data && response.data.status === 401) history.push("/staff")
        else setShowModalInfo({ ...showModalInfo, showConfirmDel: false, showErr: true })
      })
  }

  // renders //
  const renderHeader = () => {
    return (
      <Card className=" mb-5 shadow">
        <Row>
          <Col className="px-0 pt-4 text-center" style={{ whiteSpace: "pre-wrap" }}>
            ชื่อกีฬา {"\n"}
            <label>{sportName}</label>
          </Col>
          <hr style={{ height: "60px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-3 text-center" style={{ whiteSpace: "pre-wrap" }}>
            วันที่ / เวลา {"\n"}
            <label style={{ whiteSpace: "pre-wrap" }}>
              {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "\n" + getTimeText(timeSlot)}
            </label>
          </Col>
          <hr style={{ height: "60px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-4 text-center" style={{ whiteSpace: "pre-wrap" }}>
            เลขคอร์ด {"\n"}
            <label>{courtNo}</label>
          </Col>
        </Row>
      </Card>
    )
  }

  const renderMemberTable = () => {
    let index = 1
    let memberList = members.map((member) => {
      return (
        <tr key={index++} className="tr-normal">
          <td className="py-4 text-center"> {member.username} </td>
          <td className="text-center"> {member.personal_email} </td>
          <td className="text-center"> {member.phone} </td>
        </tr>
      )
    })
    return memberList
  }

  const renderModals = () => {
    return (
      <div>
        <ConfirmDelModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={{ members, requestDelete }} />
        <ComDelModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
        <ErrModal showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} />
      </div>
    )
  }

  return (
    <div className="reservationDetail px-5">
      {renderHeader()}
      <Table responsive className="text-center">
        <thead className="bg-light">
          <tr>
            <th>ชื่อผู้ใช้</th>
            <th>อีเมล</th>
            <th>เบอร์โทรศัพท์</th>
          </tr>
        </thead>
        <tbody>{renderMemberTable()}</tbody>
      </Table>
      <Row className="mt-4">
        <Col>
          <Link to={"/staff/allReservation/" + pagename}>
            <Button variant="pink" className="btn-normal">
              กลับ
            </Button>
          </Link>
        </Col>
        <Col>
          <Button
            variant="danger"
            className="float-right btn-normal btn-outline-red"
            onClick={() => {
              setShowModalInfo({ ...showModalInfo, showConfirmDel: true })
            }}
          >
            ลบการจอง
          </Button>
        </Col>
      </Row>
      {renderModals()}
    </div>
  )
}

export default ReservationDetail
