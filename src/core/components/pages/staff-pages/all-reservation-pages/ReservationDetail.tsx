import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { Table, Row, Col, Button, Card } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"
import DeleteModalComponent from "./DeleteModalComponent"

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

const ReservationDetail: FunctionComponent<RouteComponentProps<{ pagename: string; _id: string }>> = (props) => {
  // Page state //
  let [pagename] = useState<String>(props.match.params.pagename)
  let [sportId] = useState<String>(props.match.params._id)
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

  // useEffects //
  useEffect(() => {
    client({
      method: "GET",
      url: "/court-manager",
    })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [])

  useEffect(() => {
    console.log(pagename, sportId)
  }, [pagename, sportId])

  // other functions //

  // request //
  const requestInfo = () => {
    let url: string = (pagename === "success" ? "/all-reservation" : "/all-waiting-room") + "/" + sportId
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
      })
  }
  const requestDelete = () => {}

  // renders //
  const renderHeader = () => {
    return (
      <Card className=" mb-4 shadow">
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
        <DeleteModalComponent showModalInfo={showModalInfo} setShowModalInfo={setShowModalInfo} info={requestDelete} />
      </div>
    )
  }

  return (
    <div className="reservationDetail px-5">
      {renderHeader()}
      <Table>{renderMemberTable()}</Table>
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
