import React, { useRef } from "react"

import { Form, Button, Pagination } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useDate, useOption, useTableWithPagination, withDeletable } from "./disable-court-hook"
import { ErrorAlert } from "./modals"
import { DeleteButton } from "./button"
import { CourtTable, CourtRow } from "./disabled-court-table"
import { ListOfCourtsForm, RowProps } from "../../../../dto/disableCourt.dto"

const ListOfCourts = () => {
  const history = useHistory()
  const startDateRef = useRef<DatePicker>(null)
  const endDateRef = useRef<DatePicker>(null)
  const { path } = useRouteMatch()
  const { data, maxPage, page, setPage, jumpUp, jumpDown, setParams, pageArr, onDelete, isError, setIsError } = useTableWithPagination()
  const { register, handleSubmit, control, setValue } = useForm<ListOfCourtsForm>()
  const { startDate, endDate, onStartDateChange, onEndDateChange, show, handleAlert, setStartDate, setEndDate } = useDate()
  const watchSports = useWatch({ control, name: "sports", defaultValue: "" })
  const { option } = useOption()

  const onSelectStartDate = () => {
    startDateRef.current?.setOpen(true)
  }
  const onSelectEndDate = () => {
    endDateRef.current?.setOpen(true)
  }

  const validateFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "ประเภทกีฬา" || !event.target.value) setValue("courtNum", "เลขคอร์ด")
  }

  const onSubmit = (form: ListOfCourtsForm) => {
    setParams({
      sportObjId: form.sports ? form.sports : undefined,
      starting_date: startDate,
      expired_date: endDate,
      court_num: form.courtNum ? parseInt(form.courtNum) : undefined,
      start: 0,
      end: 9,
    })
  }

  const onAdd = () => history.push(`${path}/add`)
  return (
    <>
      <ErrorAlert inProp={isError} handleClose={() => setIsError(false)} header="การลบคอร์ด" message="ไม่สามารถลบคอร์ดได้ กรุณาลองอีกครั้ง" />
      <ErrorAlert inProp={show} handleClose={handleAlert} header="วันที่ไม่ถูกต้อง" message="วันที่ไม่ถูกต้อง" />
      <div className="disable-court-wrapper px-1 py-2 mt-3">
        <Form className="disable-court-filter" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center w-100">
              <Form.Label srOnly={true}>ประเภทกีฬา</Form.Label>
              <Form.Control name="sports" as="select" ref={register} onChange={validateFilter}>
                <option value={""}>ประเภทกีฬา</option>
                {option ? (
                  option.map((sport) => (
                    <option value={sport._id} key={sport._id}>
                      {sport.sport_name_th}
                    </option>
                  ))
                ) : (
                  <option value={""}>ประเภทกีฬา</option>
                )}
              </Form.Control>
              <Form.Control name="courtNum" as="select" ref={register} disabled={watchSports === "ประเภทกีฬา" ? true : false}>
                <option value={""}>เลขคอร์ด</option>
                {watchSports &&
                  option &&
                  option
                    .find((sport) => sport._id === watchSports)
                    ?.list_court.map((court) => {
                      return (
                        <option value={court.court_num} key={court._id}>
                          {court.court_num}
                        </option>
                      )
                    })}
              </Form.Control>
              <div className="d-flex flex-row position-relative mr-3">
                <label className="floating-label" onClick={onSelectStartDate} style={{ display: startDate ? "none" : "" }}>
                  วันเริ่มต้นการปิด
                </label>
                <DatePicker className="form-control" selected={startDate} onChange={onStartDateChange} name="somw" ref={startDateRef} />
                <Button variant="outline-transparent" onClick={() => setStartDate(undefined)}>
                  ลบ
                </Button>
              </div>
              <div className="d-flex flex-row position-relative mr-3">
                <label className="floating-label" onClick={onSelectEndDate} style={{ display: endDate ? "none" : "" }}>
                  วันสิ้นสุดการปิด
                </label>
                <DatePicker className="form-control" selected={endDate} onChange={onEndDateChange} ref={endDateRef} />
                <Button variant="outline-transparent" onClick={() => setEndDate(undefined)}>
                  ลบ
                </Button>
              </div>
            </div>
            <Button className="disable-court-button" type="submit" variant="pink">
              ค้นหา
            </Button>
          </div>
        </Form>
      </div>
      <CourtTable<RowProps>
        Row={CourtRow}
        data={data}
        header={["เลขคอร์ด", "ประเภทกีฬา", "วันที่เริ่มปิด", "วันสิ้นสุดการปิด"]}
        Button={withDeletable(DeleteButton, onDelete)}
      />
      <div className="d-flex flex-row justify-content-between align-content-center">
        <Button variant="pink" className="disable-court-button" onClick={onAdd}>
          เพิ่มการปิดคอร์ด
        </Button>
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1)
            }}
          />
          {page > 5 && <Pagination.Ellipsis onClick={jumpDown} />}
          {pageArr.map((val) => (
            <Pagination.Item
              key={val}
              onClick={() => {
                setPage(val)
              }}
            >
              {val}
            </Pagination.Item>
          ))}
          {page > Math.floor(maxPage / 5) * 5 || page === maxPage || maxPage <= 5 ? "" : <Pagination.Ellipsis onClick={jumpUp} />}
          <Pagination.Next
            onClick={() => {
              if (page < maxPage) setPage((prev) => prev + 1)
            }}
          />
        </Pagination>
      </div>
    </>
  )
}
export default ListOfCourts
