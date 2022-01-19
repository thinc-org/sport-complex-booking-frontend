import React, { useRef, useEffect } from "react"

import { Form, Button, Pagination } from "react-bootstrap"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useDate, useOption, useTableWithPagination, withDeletable } from "./disable-court-hook"
import { ErrorAlert } from "./modals"
import { DeleteButton } from "./button"
import { CourtTable, CourtRow } from "./disabled-court-table"
import { ListOfCourtsForm, RowProps } from "../../../../dto/disableCourt.dto"
import { useAuthContext } from "../../../../controllers/authContext"
import { useQueryParams } from "../../../../utils/qs"

const ListOfCourts = () => {
  const history = useHistory()
  const startDateRef = useRef<DatePicker>(null)
  const endDateRef = useRef<DatePicker>(null)
  const { path } = useRouteMatch()
  const { data, maxPage, page, setPage, jumpUp, jumpDown, pageArr, onDelete, isError, setIsError } = useTableWithPagination()
  const { queryParams, updateQuery } = useQueryParams()
  const { register, control, setValue, reset } = useForm<ListOfCourtsForm>({
    defaultValues: {
      sports: queryParams.sports,
      courtNum: queryParams.courtNum,
    },
  })
  const { startDate, endDate, onStartDateChange, onEndDateChange, showDateError, handleAlert, setStartDate, setEndDate } = useDate(
    queryParams.startDate ? new Date(queryParams.startDate) : undefined,
    queryParams.endDate ? new Date(queryParams.endDate) : undefined
  )
  const watchSports = useWatch({ control, name: "sports", defaultValue: "" })
  const { option } = useOption(reset)
  const { role } = useAuthContext()

  const onSelectStartDate = () => {
    startDateRef.current?.setOpen(true)
  }
  const onSelectEndDate = () => {
    endDateRef.current?.setOpen(true)
  }

  const refreshData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value)
    if (event.target.name === "sports") {
      updateQuery({ sports: event.target.value, courtNum: undefined })
    } else {
      updateQuery({ courtNum: event.target.value })
    }
  }

  useEffect(() => {
    setValue("sports", queryParams.sports)
    setValue("courtNum", queryParams.courtNum)
  }, [queryParams.sports, queryParams.courtNum, setValue])

  const onAdd = () => history.push(`${path}/add`)
  return (
    <>
      <ErrorAlert inProp={isError} handleClose={() => setIsError(false)} header="การลบคอร์ด" message="ไม่สามารถลบคอร์ดได้ กรุณาลองอีกครั้ง" />
      <ErrorAlert inProp={showDateError} handleClose={handleAlert} header="วันที่ไม่ถูกต้อง" message="วันที่ไม่ถูกต้อง" />
      <div className="disable-court-wrapper px-1 py-2 mt-3">
        <Form className="disable-court-filter">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center w-100">
              <Form.Label srOnly={true}>ประเภทกีฬา</Form.Label>
              <Form.Control name="sports" as="select" ref={register} onChange={refreshData}>
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
              <Form.Control name="courtNum" as="select" ref={register} onChange={refreshData} disabled={watchSports === "ประเภทกีฬา" ? true : false}>
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
                  วันเริ่มต้นการล็อค
                </label>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date: Date) => {
                    onStartDateChange(date)
                    updateQuery({ startDate: date.toISOString() })
                  }}
                  name="somw"
                  ref={startDateRef}
                />
                <Button
                  variant="outline-transparent"
                  onClick={() => {
                    setStartDate(undefined)
                    updateQuery({ startDate: undefined })
                  }}
                >
                  ลบ
                </Button>
              </div>
              <div className="d-flex flex-row position-relative mr-3">
                <label className="floating-label" onClick={onSelectEndDate} style={{ display: endDate ? "none" : "" }}>
                  วันสิ้นสุดการล็อค
                </label>
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date: Date) => {
                    onEndDateChange(date)
                    updateQuery({ endDate: date.toISOString() })
                  }}
                  ref={endDateRef}
                />
                <Button
                  variant="outline-transparent"
                  onClick={() => {
                    setEndDate(undefined)
                    updateQuery({ endDate: undefined })
                  }}
                >
                  ลบ
                </Button>
              </div>
              <Button
                className="disable-court-button"
                variant="pink"
                onClick={() => {
                  updateQuery({ sports: undefined, courtNum: undefined, startDate: undefined, endDate: undefined })
                }}
              >
                ลบการกรอง
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <CourtTable<RowProps>
        Row={CourtRow}
        data={data}
        header={["เลขคอร์ด", "ประเภทกีฬา", "วันที่เริ่มล็อค", "วันสิ้นสุดการล็อค"]}
        Button={role === "Admin" ? withDeletable(DeleteButton, onDelete) : undefined}
      />
      <div className="d-flex flex-row justify-content-between align-content-center">
        {role === "Admin" && (
          <Button variant="pink" className="disable-court-button" onClick={onAdd}>
            เพิ่มการล็อคคอร์ด
          </Button>
        )}
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
