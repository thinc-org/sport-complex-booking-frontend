import React from "react"
import { useViewTable, useEditCourt, withDeletable } from "./disable-court-hook"
import { useParams, useHistory } from "react-router-dom"
import { ViewRow, CourtTable } from "./disabled-court-table"
import { ViewRowProps } from "../../../../dto/disableCourt.dto"
import { DeleteButton } from "./button"

import { format, add } from "date-fns"
import { FormAlert, ErrorAlert } from "./modals"
import { Row, Col, Container, Button, Form } from "react-bootstrap"
import DatePicker from "react-datepicker"
import { client } from "../../../../../axiosConfig"

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
    show,
    handleAlert,
    validateTimeSlot,
  } = useViewTable(params.id)
  const { isEdit, setIsEdit, error, setError } = useEditCourt()
  const toggleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsEdit(true)
    e.preventDefault()
  }
  const onSubmit = () => {
    const formData = {
      sport_id: viewData?.sport_id._id,
      disable_time: rowData,
      starting_date: startDate,
      expired_date: endDate,
    }
    client
      .put(`/courts/disable-courts/${params.id}`, formData)
      .then((res) => {
        history.goBack()
      })
      .catch((err) => {
        setError(err.response.message)
      })
  }
  return (
    <Container fluid>
      <ErrorAlert inProp={show} handleClose={handleAlert} header={"วันที่ไม่ถูกต้อง"} message={"วันที่ไม่ถูกต้อง"} />
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
                  <p>{viewData?.starting_date ? format(add(new Date(viewData?.starting_date), { days: 1 }), "MM/dd/yyyy") : ""}</p>
                </Col>
                <Col>
                  <h5>วันสิ้นสุดการปิด</h5>
                  <p>{viewData?.expired_date ? format(new Date(viewData?.expired_date), "MM/dd/yyyy") : ""}</p>
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
          {CourtTable<ViewRowProps>({
            data: rowData,
            header: ["ลำดับ", "วัน", "เวลาที่เริ่มปิด", "เวลาสิ้นสุดการปิด"],
            Row: ViewRow,
            Button: isEdit ? withDeletable(DeleteButton, onDeleteRow) : undefined,
          })}
        </div>
        {isEdit && (
          <Button className="w-100 mb-2" variant="pink" onClick={() => setInProp(true)}>
            เพิ่มการปิดคอร์ดใหม่
          </Button>
        )}
        <div className="d-flex flex-row justify-content-end">
          {!isEdit ? (
            <>
              <Button variant="outline-pink" className="mr-2" onClick={() => history.push("/staff/disableCourt")} style={{ fontSize: "20px" }}>
                กลับ
              </Button>
              <Button variant="pink" onClick={toggleEdit}>
                แก้ไข
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-pink mr-2" onClick={() => setIsEdit(false)}>
                ยกเลิก
              </Button>
              <Button variant="pink" type="submit" onClick={onSubmit}>
                บันทึก
              </Button>
            </>
          )}
          {error}
        </div>
      </Form>
    </Container>
  )
}
export default ViewCourt
