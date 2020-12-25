import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { ListGroup, Table, Row, Col, Button, Card } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import { DeleteModal, UserInfo } from "../interfaces/reservationSchemas"
import DeleteModalComponent from "./DeleteModalComponent"

const ReservationDetail: FunctionComponent<RouteComponentProps<{ pagename: string; _id: string }>> = (props) => {
  // Page state //
  let [pagename] = useState<String>(props.match.params.pagename)
  let [_id] = useState<String>(props.match.params._id)
  let [show_modal_info, set_show_modal_info] = useState<DeleteModal>({
    show_confirm_del: false,
    show_com_del: false,
    show_err: false,
  })

  // reservation detail state
  let [sport_name, set_sport_name] = useState<string>("แบตมินตัน")
  let [date, set_date] = useState<Date>(new Date())
  let [court_no, set_court_no] = useState<number>(1)
  let [time_slot, set_time_slot] = useState<number[]>([1, 9])
  let [members, set_members] = useState<UserInfo[]>([
    { username: "1", phone: "191", personal_email: "mail1" },
    { username: "1", phone: "191", personal_email: "mail1" },
  ])

  // useEffects //
  useEffect(() => {
    console.log(pagename, _id)
  }, [pagename, _id])

  // other functions //
  const getAllTime = (): string => {
    let time: string = ""
    for (let idx = 0; idx < time_slot.length; idx++) time += convertSlotToTime(time_slot[idx]) + (idx !== time_slot.length - 1 ? "," : "")
    return time
  }

  const convertSlotToTime = (slot: number): string => {
    if (slot % 2 === 0) return String(slot / 2) + ":00-" + String(slot / 2 - 1) + ":30"
    return String(Math.floor(slot / 2)) + ":30-" + String(Math.floor(slot / 2)) + ":00"
  }

  // request //
  const requestDelete = () => {}

  // renders //
  const renderHeader = () => {
    return (
      <Card className=" mb-4 shadow">
        <Row>
          <Col className="px-0 pt-4 text-center" style={{ whiteSpace: "pre-wrap" }}>
            ชื่อกีฬา {"\n"}
            <label>{sport_name}</label>
          </Col>
          <hr style={{ height: "60px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-3 text-center" style={{ whiteSpace: "pre-wrap" }}>
            วันที่ / เวลา {"\n"}
            <label style={{ whiteSpace: "pre-wrap" }}>
              {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "\n" + getAllTime()}
            </label>
          </Col>
          <hr style={{ height: "60px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-4 text-center" style={{ whiteSpace: "pre-wrap" }}>
            เลขคอร์ด {"\n"}
            <label>{court_no}</label>
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
        <DeleteModalComponent show_modal_info={show_modal_info} set_show_modal_info={set_show_modal_info} info={requestDelete} />
      </div>
    )
  }

  return (
    <div className="reservationDetail px-5">
      {renderHeader()}
      <Table>{renderMemberTable()}</Table>
      <Row className="mt-4">
        <Col>
          <Link to={"/allReservation/" + pagename}>
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
              set_show_modal_info({ ...show_modal_info, show_confirm_del: true })
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
