import React from "react"
import { useViewTable, useEditCourt, withDeletable } from "./disable-court-hook"
import { useParams, useHistory } from "react-router-dom"
import { ViewRow, CourtTable, OverlapDataTable, ErrorRow } from "./disabled-court-table"
import { ConflictRowProps, ViewRowProps } from "../../../../dto/disableCourt.dto"
import { DeleteButton } from "./button"

import { format } from "date-fns"
import subDays from "date-fns/subDays"
import { FormAlert, ErrorAlert } from "./modals"
import { Row, Col, Container, Button, Form } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { client } from "../../../../../axiosConfig"
import { reduceOverlapData } from "./conflictManager"
import { useAuthContext } from "../../../../controllers/authContext"

interface Params {
  id: string
}
const ViewCourt = () => {
  const history = useHistory()
  const params = useParams<Params>()
  const {
    viewData,
    inProp,
    rowData,
    onAddRow,
    onDeleteRow,
    setInProp,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    showDateError,
    handleAlert,
    validateTimeSlot,
    setOverlapData,
    overlapData,
  } = useViewTable(params.id)
  const { isEdit, setIsEdit, error, setError } = useEditCourt()
  const { role } = useAuthContext()
  const toggleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsEdit(true)
    e.preventDefault()
    e.stopPropagation()
  }

  const onSubmit = () => {
    const formData = {
      sport_id: viewData?.sport_id._id,
      disable_time: rowData,
      starting_date: startDate ? format(startDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      expired_date: endDate ? format(endDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    }
    client
      .put(`/courts/disable-courts/${params.id}`, formData)
      .then((res) => {
        history.goBack()
      })
      .catch((err) => {
        if (err.response.status !== 409) {
          setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        } else {
          if (err.response.data.reason)
            setOverlapData({ reservation: err.response.data.overlapReservations, waitingRoom: err.response.data.overlapWaitingRooms })
          setError("วันหรือเวลาของการปิดคอร์ดนี้ซ้ำกับการปิดคอร์ดที่มีอยู่แล้ว")
        }
      })
  }
  return (
    <Container fluid>
      <ErrorAlert
        inProp={!!overlapData}
        handleClose={() => setOverlapData(undefined)}
        header="การปิดคอร์ดชนกับการจอง"
        message="พบการปิดคอร์ดชนกับการจองดังนี้"
      >
        <OverlapDataTable<ConflictRowProps>
          Row={ErrorRow}
          data={reduceOverlapData(overlapData)}
          header={["index", "ชื่อไทย", "ชื่ออังกฤษ", "เบอร์ติดต่อ", "วันที่ทับซ้อน", "เวลาที่ทับซ้อน"]}
        />
      </ErrorAlert>
      <ErrorAlert inProp={showDateError} handleClose={handleAlert} header={"วันที่ไม่ถูกต้อง"} message={"วันที่ไม่ถูกต้อง"} />
      <FormAlert inProp={inProp} handleClose={() => setInProp(false)} onSubmit={onAddRow} validate={validateTimeSlot} />
      <Form className="default-wrapper pt-3 pb-4" style={{ boxShadow: "0 0 0 0" }}>
        <h4 style={{ paddingBottom: "15px" }}>ฟิลเตอร์</h4>
        <div>
          <Row className="list-data">
            <Col>
              <h5>ชื่อกีฬา</h5>
              <p>{viewData?.sport_id.sport_name_th}</p>
            </Col>
            <Col>
              <h5>หมายเลขคอร์ด</h5>
              <p>{viewData?.court_num}</p>
            </Col>
          </Row>
          <Row className="list-data mb-2">
            {!isEdit ? (
              <>
                <Col>
                  <h5>วันเริ่มต้นการปิด</h5>
                  <p>{viewData?.starting_date ? format(new Date(viewData?.starting_date), "dd/MM/yyyy") : ""}</p>
                </Col>
                <Col>
                  <h5>วันสิ้นสุดการปิด</h5>
                  <p>{viewData?.expired_date ? format(subDays(new Date(viewData?.expired_date), 1), "dd/MM/yyyy") : ""}</p>
                </Col>
              </>
            ) : (
              <>
                <Col className="d-flex flex-column">
                  <Form.Label>วันที่เริ่มปิด</Form.Label>
                  <DatePicker className="form-control" selected={startDate} onChange={onStartDateChange} required />
                </Col>
                <Col className="d-flex flex-column">
                  <Form.Label>วันสิ้นสุดการปิด</Form.Label>
                  <DatePicker className="form-control" selected={endDate} onChange={onEndDateChange} required />
                </Col>
              </>
            )}
          </Row>
          <Row className="list-data">
            <Col>
              <h5>คำอธิบาย</h5>
              <p>{viewData?.description}</p>
            </Col>
          </Row>
        </div>
        <div>
          <CourtTable<ViewRowProps>
            data={rowData}
            Row={ViewRow}
            header={["ลำดับ", "วัน", "เวลาที่เริ่มปิด", "เวลาสิ้นสุดการปิด"]}
            Button={isEdit ? withDeletable(DeleteButton, onDeleteRow) : undefined}
          />
        </div>
        {isEdit && (
          <Button className="w-100 mb-2" variant="pink" onClick={() => setInProp(true)}>
            เพิ่มการปิดคอร์ดใหม่
          </Button>
        )}
        <div style={{ color: "red" }}>{error}</div>
        <div className="d-flex flex-row justify-content-end">
          {!isEdit ? (
            <>
              <Button variant="outline-pink" className="mr-2" onClick={() => history.push("/staff/disableCourt")} style={{ fontSize: "20px" }}>
                กลับ
              </Button>
              <Button variant="pink" onClick={toggleEdit} disabled={role === "Staff"}>
                แก้ไข
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-pink mr-2" onClick={() => setIsEdit(false)}>
                ยกเลิก
              </Button>
              <Button variant="pink" onClick={onSubmit}>
                บันทึก
              </Button>
            </>
          )}
        </div>
      </Form>
    </Container>
  )
}
export default ViewCourt
