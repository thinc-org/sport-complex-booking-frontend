import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { Table, Row, Col, Button, Card } from "react-bootstrap"
import format from "date-fns/format"
import { client } from "../../../../../axiosConfig"
import { Room, TimeObject } from "../../../../dto/reservation.dto"
import { ConfirmDeleteModal, ErrModal, DeleteSuccessfulModal } from "./DeleteModalComponent"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"
import { Sport } from "../../../../dto/sport.dto"
import { useAuthContext } from "../../../../controllers/authContext"

export const convertSlotToTime = (slot: number): TimeObject => {
  return {
    startHour: `${slot - 1}`,
    startMinute: `00`,
    endHour: `${slot - 1}`,
    endMinute: `59`,
  }
}

export const getTimeText = (timeSlot: number[]): string => {
  let text = ""
  let i = 0
  while (i < timeSlot.length) {
    const temp = convertSlotToTime(timeSlot[i])
    if (
      (i === 0 && i !== timeSlot.length - 1) ||
      (0 < i && i < timeSlot.length - 1 && timeSlot[i + 1] === timeSlot[i] + 1 && timeSlot[i - 1] !== timeSlot[i] - 1)
    )
      text += `${temp.startHour}:${temp.startMinute}-`
    else if (i > 0 && timeSlot[i - 1] === timeSlot[i] - 1 && (i === timeSlot.length - 1 || timeSlot[i + 1] !== timeSlot[i] + 1))
      text += `${temp.endHour}:${temp.endMinute}` + (i === timeSlot.length - 1 ? "" : ",")
    else if (i === timeSlot.length - 1 || timeSlot[i - 1] !== timeSlot[i] - 1)
      text += `${temp.startHour}:${temp.startMinute}-${temp.endHour}:${temp.endMinute}` + (i === timeSlot.length - 1 ? "" : ",")
    i++
  }
  return text
}

const ReservationDetail: React.FC = () => {
  // Page state //
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showConfirmDel, setShowConfirmDel] = useState<boolean>(false)
  const [showComDel, setShowComDel] = useState<boolean>(false)
  const [showErr, setShowErr] = useState<boolean>(false)

  // reservation detail state
  const [sportName, setSportName] = useState<string>("")
  const [detail, setDetail] = useState<Room | null>(null)
  const date = useMemo(() => (detail ? new Date(detail.date) : null), [detail])
  const sportId = detail?.sport_id
  const courtNo = detail?.court_number
  const timeSlot = detail?.time_slot
  const members = detail?.list_member

  const history = useHistory()
  const { pagename, _id } = useParams<{ pagename: string; _id: string }>()
  const { role } = useAuthContext()

  // request //
  const requestInfo = useCallback(() => {
    const url: string = (pagename === "success" ? "/all-reservation" : "/all-waiting-room") + `/${_id}`
    client
      .get<Room>(url)
      .then(({ data }) => {
        setDetail(data)
        setIsLoading(false)
      })
      .catch(() => {
        setShowErr(true)
      })
  }, [_id, pagename])

  // useEffects //
  useEffect(() => {
    requestInfo()
  }, [requestInfo])

  useEffect(() => {
    client
      .get<Sport[]>("/court-manager/sports/")
      .then(({ data }) => {
        const sport = data.find((sport) => sport._id === detail?.sport_id)
        setSportName(sport?.sport_name_th || "")
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }, [sportId, detail])

  const requestDelete = () => {
    const url = (pagename === "success" ? "/all-reservation" : "/all-waiting-room") + `/${_id}`
    client({
      method: "DELETE",
      url,
    })
      .then(() => {
        setShowConfirmDel(false)
        setShowComDel(true)
      })
      .catch(() => {
        setShowConfirmDel(false)
        setShowErr(true)
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
            {date && timeSlot && (
              <label style={{ whiteSpace: "pre-wrap" }}>{date ? format(date, "dd-MM-yyyy") + "\n" + getTimeText(timeSlot) : ""}</label>
            )}
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

  const memberTable = members?.map((member) => {
    return (
      <tr key={member?.username} className="tr-normal">
        <td className="py-4 text-center"> {member?.name_th ?? member?.name_en} </td>
        <td className="py-4 text-center"> {member?.surname_th ?? member?.surname_en} </td>
        {role === "Admin" && <td className="py-4 text-center"> {member?.username} </td>}
        <td className="text-center"> {member?.personal_email} </td>
        <td className="text-center"> {member?.phone} </td>
        <td className="text-center"> {member?.is_penalize ? "โดนแบน" : "ปกติ"} </td>
      </tr>
    )
  })

  const modals = (
    <>
      <ConfirmDeleteModal show={showConfirmDel} onClose={() => setShowConfirmDel(false)} info={{ members, requestDelete }} />
      <DeleteSuccessfulModal
        show={showComDel}
        onClose={() => {
          setShowComDel(false)
          history.push(`/staff/allReservation/${pagename}`)
        }}
      />
      <ErrModal show={showErr} onClose={() => setShowErr(false)} />
    </>
  )

  return (
    <>
      <div className="reservationDetail px-2" style={{ display: isLoading ? "none" : "block", margin: "50px 10px" }}>
        {renderHeader()}
        <Table responsive className="text-center">
          <thead className="bg-light">
            <tr>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              {role === "Admin" && <th>ชื่อผู้ใช้</th>}
              <th>อีเมล</th>
              <th>เบอร์โทรศัพท์</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>{memberTable}</tbody>
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
            {role === "Admin" && (
              <Button
                variant="danger"
                className="float-right btn-normal btn-outline-red"
                onClick={() => {
                  setShowConfirmDel(true)
                }}
              >
                ลบการจอง
              </Button>
            )}
          </Col>
        </Row>
        {modals}
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default ReservationDetail
