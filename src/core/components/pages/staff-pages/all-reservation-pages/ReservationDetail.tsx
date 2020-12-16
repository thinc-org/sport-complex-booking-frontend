import React, { FunctionComponent, useState, useEffect } from "react"
import { RouteComponentProps, Link } from "react-router-dom"
import { ListGroup, Table, Row, Col, Button, Card } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import { DeleteModal } from "../interfaces/reservationSchemas"
import DeleteModalComponent from "./DeleteModalComponent"

const ReservationDetail: FunctionComponent<RouteComponentProps<{ _id: string }>> = (props) => {
  // Page state //
  let [jwt, set_jwt] = useState<String>("")
  let [_id] = useState<String>(props.match.params._id)
  let [show_modal_info, set_show_modal_info] = useState<DeleteModal>({
    show_confirm_del: false,
    show_com_del: false,
    show_err: false,
  })
  // reservation detail state
  let [members, set_members] = useState<{}[]>([{}, {}, {}, {}])

  // request //
  const requestDelete = () => {}

  // renders //
  const renderMemberTable = () => {
    let index = 1
    let memberList = members.map((member) => {
      return (
        <tr key={index++} className="tr-normal">
          <td className="py-4 text-center"> ผู้ใช้ </td>
          <td className="text-center"> อีเมล </td>
          <td className="text-center"> เบอร์โทร </td>
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
      <Card className="mb-4 shadow">
        <Row>
          <Col className="px-0 pt-4 text-center ">ชื่อกีฬา</Col>
          <hr style={{ height: "40px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-4 text-center font-weight-normal">วันที่</Col>
          <hr style={{ height: "40px", width: "0px", borderWidth: "1px", borderStyle: "ridge" }} />
          <Col className="px-0 pt-4 text-center font-weight-normal">เลขคอร์ด</Col>
        </Row>
      </Card>
      <Table>{renderMemberTable()}</Table>
      <Row className="mt-4">
        <Col>
          <Link to="/allReservation">
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
