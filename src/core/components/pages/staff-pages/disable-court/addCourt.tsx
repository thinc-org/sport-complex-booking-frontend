import React from "react"
import { useForm, useWatch } from "react-hook-form"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useOption, useDate, withDeletable, useRow } from "./disable-court-hook"
import { reduceOverlapData } from "./conflictManager"
import { ErrorAlert, FormAlert } from "./modals"
import DatePicker from "react-datepicker"
import { format } from "date-fns"
import { ViewRowProps, AddCourtForm, ConflictRowProps } from "../../../../dto/disableCourt.dto"
import { CourtTable, ViewRow, OverlapDataTable, ErrorRow } from "./disabled-court-table"
import { client } from "../../../../../axiosConfig"
import { DeleteButton } from "./button"
import { Court } from "../../../../dto/sport.dto"

const AddCourt = () => {
  const history = useHistory()
  const { inProp, rowData, onAddRow, onDeleteRow, setInProp, validateTimeSlot, setOverlapData, overlapData } = useRow()
  const { register, handleSubmit, setError, errors, clearErrors, control } = useForm()
  const { startDate, endDate, onStartDateChange, onEndDateChange, showDateError, handleAlert } = useDate()
  const { option } = useOption()
  const watchSports = useWatch({ control, name: "sportObjId", defaultValue: "" })
  const onSubmit = (data: AddCourtForm) => {
    const formData = {
      ...data,
      sport_id: data.sportObjId,
      court_num: parseInt(data.court_num),
      disable_time: rowData,
      starting_date: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      expired_date: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
    }
    client
      .post("/courts/disable-courts", formData)
      .then(() => {
        history.goBack()
      })
      .catch((err) => {
        if (err.response.status !== 409) {
          setError("unknown", {
            type: "manual",
            message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          })
        } else {
          if (err.response.data.reason) {
            console.log(err.response.data)
            setOverlapData({ reservation: err.response.data.overlapReservations, waitingRoom: err.response.data.overlapWaitingRooms })
          }
          setError("duplicate", {
            type: "manual",
            message: "วันหรือเวลาของการล็อคคอร์ดนี้ซ้ำกับการล็อคคอร์ดที่มีอยู่แล้ว",
          })
        }
      })
  }

  return (
    <Container fluid>
      <ErrorAlert
        inProp={!!overlapData}
        handleClose={() => setOverlapData(undefined)}
        header="การล็อคคอร์ดชนกับการจอง"
        message="พบการล็อคคอร์ดชนกับการจองดังนี้"
      >
        <OverlapDataTable<ConflictRowProps>
          Row={ErrorRow}
          data={reduceOverlapData(overlapData)}
          header={["index", "ชื่อไทย", "ชื่ออังกฤษ", "เบอร์ติดต่อ", "วันที่ทับซ้อน", "เวลาที่ทับซ้อน"]}
        />
      </ErrorAlert>
      <FormAlert inProp={inProp} handleClose={() => setInProp(false)} onSubmit={onAddRow} validate={validateTimeSlot} />
      <ErrorAlert inProp={showDateError} handleClose={handleAlert} header={"วันที่ไม่ถูกต้อง"} message={"วันที่ไม่ถูกต้อง"} />
      <div className="default-wrapper pt-3 pb-4" style={{ boxShadow: "0 0 0 0" }}>
        <h4 style={{ paddingBottom: "15px" }}>เพิ่มการล็อคคอร์ด</h4>
        <Form className="disable-court-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Label>ประเภทกีฬา</Form.Label>
              <Form.Control name="sportObjId" as="select" ref={register({ required: true })}>
                <option value="">เลือกประเภทกีฬา</option>
                {option ? (
                  option.map((sport) => {
                    return (
                      <option value={sport._id} key={sport._id}>
                        {sport.sport_name_th}
                      </option>
                    )
                  })
                ) : (
                  <option value={""}>ประเภทกีฬา</option>
                )}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>เลขคอร์ด</Form.Label>
              <Form.Control name="court_num" as="select" ref={register({ required: true, validate: (val) => val !== "เลขคอร์ด" })}>
                {option && watchSports ? (
                  option
                    .find((sport) => sport._id === watchSports)
                    ?.list_court.map((court: Court) => {
                      return (
                        <option value={court.court_num} key={court._id}>
                          {court.court_num}
                        </option>
                      )
                    })
                ) : (
                  <option>เลขคอร์ด</option>
                )}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <Form.Label>วันที่เริ่มล็อค</Form.Label>
              <DatePicker className="form-control" selected={startDate} onChange={onStartDateChange} required />
            </Col>
            <Col className="d-flex flex-column">
              <Form.Label>วันสิ้นสุดการล็อค</Form.Label>
              <DatePicker className="form-control" selected={endDate} onChange={onEndDateChange} required />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>คำอธิบาย</Form.Label>
              <Form.Control ref={register({ required: true })} name="description" type="text"></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ color: "red" }}>
                {(errors.description || !startDate || !endDate || !rowData || errors.court_num) && "กรุณากรอกข้อมูลให้ครบ"}
                {errors.duplicate && errors.duplicate.message}
              </div>
            </Col>
          </Row>
          <div className="mt-3 small-table">
            <CourtTable<ViewRowProps>
              data={rowData}
              header={["ลำดับ", "วัน", "เวลาที่เริ่มล็อค", "เวลาสิ้นสุดการล็อค"]}
              Row={ViewRow}
              Button={withDeletable(DeleteButton, onDeleteRow)}
            />
          </div>
          <Button className="w-100 " variant="pink" onClick={() => setInProp(true)}>
            เพิ่มการล็อคคอร์ดใหม่
          </Button>
          <div className="d-flex flex-row justify-content-end w-100 mt-3">
            <Button
              variant="pink"
              className="mr-3"
              type="submit"
              onClick={() => {
                if (errors) clearErrors()
                if (overlapData) setOverlapData(undefined)
              }}
            >
              บันทึก
            </Button>
            <Button variant="outline-pink" onClick={() => history.goBack()}>
              ยกเลิก
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}
export default AddCourt
