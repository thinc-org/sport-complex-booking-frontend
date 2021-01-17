import React, { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useOption, useDate, withDeletable, useRow } from "./disable-court-hook"
import { ErrorAlert, FormAlert } from "./modals"
import DatePicker from "react-datepicker"
import { format } from "date-fns"
import { ViewRowProps, AddCourtForm } from "../../../../dto/disableCourt.dto"
import { CourtTable, ViewRow } from "./disabled-court-table"
import { client } from "../../../../../axiosConfig"
import { DeleteButton } from "./button"
import { Court } from "../../../../dto/sport.dto"

const AddCourt = () => {
  const history = useHistory()
  const { inProp, rowData, onAddRow, onDeleteRow, setInProp, validateTimeSlot, setOverlapData, overlapData } = useRow()
  const { register, handleSubmit, setError, errors, clearErrors, control } = useForm()
  const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert } = useDate()
  const { option } = useOption()
  const watchSports = useWatch({ control, name: "sportObjId", defaultValue: "" })
  const onSubmit = (data: AddCourtForm) => {
    const formData = {
      ...data,
      sport_id: data.sportObjId,
      court_num: parseInt(data.court_num),
      disable_time: rowData,
      starting_date: startDate ? format(startDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      expired_date: endDate ? format(endDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
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
          if (err.response.data.reason)
            setOverlapData({ reservation: err.response.data.overlapReservations, waitingRoom: err.response.data.overlapWaitingRooms })
          setError("duplicate", {
            type: "manual",
            message: "วันหรือเวลาของการปิดคอร์ดนี้ซ้ำกับการปิดคอร์ดที่มีอยู่แล้ว",
          })
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
        overlapData={overlapData}
      />
      <FormAlert inProp={inProp} handleClose={() => setInProp(false)} onSubmit={onAddRow} validate={validateTimeSlot} />
      <ErrorAlert inProp={show} handleClose={handleAlert} header={"วันที่ไม่ถูกต้อง"} message={"วันที่ไม่ถูกต้อง"} />
      <div className="default-wrapper pt-3 pb-4" style={{ boxShadow: "0 0 0 0" }}>
        <h4 style={{ paddingBottom: "15px" }}>เพิ่มการปิดคอร์ด</h4>
        <Form className="disable-court-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Label>ประเภทกีฬา</Form.Label>
              <Form.Control name="sportObjId" as="select" ref={register({ required: true })}>
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
              <Form.Label>วันที่เริ่มปิด</Form.Label>
              <DatePicker className="form-control" selected={startDate} onChange={onStartDateChange} required />
            </Col>
            <Col className="d-flex flex-column">
              <Form.Label>วันสิ้นสุดการปิด</Form.Label>
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
                {errors.request && errors.request.message}
              </div>
            </Col>
          </Row>
          <div className="mt-3 small-table">
            {CourtTable<ViewRowProps>({
              data: rowData,
              header: ["ลำดับ", "วัน", "เวลาที่เริ่มปิด", "เวลาสิ้นสุดการปิด"],
              Row: ViewRow,
              Button: withDeletable(DeleteButton, onDeleteRow),
            })}
          </div>
          <Button className="w-100 " variant="pink" onClick={() => setInProp(true)}>
            เพิ่มการปิดคอร์ดใหม่
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
