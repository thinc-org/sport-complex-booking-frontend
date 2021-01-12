import React, { useState, useEffect, useCallback } from "react"
import { Table, Form, Row, Col, Button } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { NoCourtsModal, EditCourt, DeleteCourtModal, AddCourtFunc } from "./CourtsSettingsComponents"
import { HandleError } from "./SportSettingsComponents"
import { AxiosResponse } from "axios"
import { ListCourts } from "../../../../dto/settings.dto"
import { Sport, Court } from "../../../../dto/sport.dto"

export default function CourtsSettings() {
  const [showAddCourt, setShowAddCourt] = useState(false)
  const [showNoCourt, setShowNoCourt] = useState(false)
  const [showEditCourt, setShowEditCourt] = useState(false)
  const [showDeleteCourt, setShowDeleteCourt] = useState(false)
  const [showError, setShowError] = useState(false)
  const [openTime, onChangeOpenTime] = useState("08:00")
  const [closeTime, onChangeCloseTime] = useState("20:00")
  const [sports, setSports] = useState<Sport[]>([
    {
      _id: "",
      sport_name_th: "",
      sport_name_en: "",
      required_user: 0,
      quota: 0,
      list_court: [],
      __v: 0,
    },
  ])
  const [currentSportId, setCurrentSportId] = useState("$")
  const [currentSportName, setCurrentSportName] = useState("")
  const [currentCourt, setCurrentCourt] = useState<Court>()
  const [courts, setCourts] = useState<Court[]>([
    {
      court_num: 0,
      open_time: 0,
      close_time: 0,
      _id: "",
      __v: 0,
    },
  ])

  const requestSports = useCallback(async (currentSportId: string) => {
    await client
      .get<ListCourts>("/court-manager/search", {
        params: {
          start: 0,
          end: 999,
          filter: currentSportId,
        },
      })
      .then(({ data }) => {
        setSports(data["sport_list"])
      })
      .catch(() => {
        setShowError(true)
      })
  }, [])

  useEffect(() => {
    requestSports("$")
  }, [requestSports])

  const requestCourts = async (sportId: string) => {
    if (sportId === "$") return null
    await client
      .get<Sport>("/court-manager/" + sportId)
      .then(({ data }) => {
        setCourts(data["list_court"])
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const deleteCourt = async (courtId: string, sportId: string) => {
    let newCourts = courts
    newCourts = newCourts.filter(function (court) {
      return court._id !== courtId
    })
    const data = {
      sport_id: sportId,
      new_setting: newCourts,
    }
    await client
      .put("/court-manager/court-setting/update", data)
      .then(() => {
        setShowDeleteCourt(false)
        requestCourts(currentSportId)
      })
      .catch(() => {
        setShowError(true)
        requestCourts(currentSportId)
      })
  }

  const updateCourt = async (sportId: string) => {
    const data = {
      sport_id: sportId,
      new_setting: courts,
    }
    await client
      .put<AxiosResponse>("/court-manager/court-setting/update", data)
      .then(() => {
        requestCourts(currentSportId)
        setShowEditCourt(false)
        setShowAddCourt(false)
      })
      .catch(() => {
        setShowError(true)
        requestCourts(currentSportId)
      })
  }

  const handleChangeSport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const id = target.value
    setCurrentSportId(target.value)
    sports.forEach((sport: Sport) => {
      if (sport._id === id) {
        setCurrentSportName(sport.sport_name_th)
      }
    })
    if (id !== "$") {
      setCurrentSportId(id)
      requestCourts(id)
    }
  }

  const renderCourtsTable = () => {
    const courtList = courts.map((court, i) => {
      const openTime = Math.floor((court["open_time"]! - 1) / 2) + ":" + (Math.floor(court["open_time"]! % 2) === 0 ? "30" : "00")
      const closeTime = Math.floor(court["close_time"]! / 2) + ":" + (Math.floor((court["close_time"]! + 1) % 2) !== 0 ? "00" : "30")

      return (
        <tr key={i} className="tr-normal">
          <td> {court["court_num"]} </td>
          <td> {currentSportName}</td>
          <td> {openTime} </td>
          <td> {closeTime}</td>
          <td>
            <Button
              className="btn-normal btn-outline-dark"
              variant="outline-black"
              onClick={() => {
                setCurrentCourt(court)
                setShowEditCourt(true)
                onChangeOpenTime(openTime)
                onChangeCloseTime(closeTime)
              }}
            >
              แก้ไข
            </Button>
          </td>
          <td>
            <Button
              className="btn-normal btn-outline-black"
              variant="outline-danger"
              onClick={() => {
                setCurrentCourt(court)
                setShowDeleteCourt(true)
              }}
            >
              ลบคอร์ด
            </Button>
          </td>
        </tr>
      )
    })
    return courtList
  }

  return (
    <div>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>ประเภทกีฬา</Form.Label>
        <Form.Control as="select" custom defaultValue={0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSport(e)}>
          <option value={"$"}>เลือกประเภทกีฬา</option>
          {sports.map((sport, i) => {
            return (
              <option key={i} value={sport._id}>
                {sport.sport_name_th}
              </option>
            )
          })}
        </Form.Control>
      </Form.Group>

      {currentSportId === "$" && (
        <div className="alert alert-danger mt-3" role="alert">
          กรุณาเลือกชนิดกีฬา
        </div>
      )}

      <Table responsive className={currentSportId !== "$" ? "text-center" : "invisible"} size="md">
        <thead className="bg-light">
          <tr className="tr-pink">
            <th>เลขคอร์ด</th>
            <th>ประเภทกีฬา</th>
            <th>เวลาเปิด</th>
            <th>เวลาปิด</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderCourtsTable()}
          <NoCourtsModal show={showNoCourt} setShow={setShowNoCourt} />
        </tbody>
      </Table>

      {currentSportId !== "$" && (
        <Row>
          <Col>
            <Button
              variant="pink"
              className="btn-normal"
              onClick={() => {
                setShowAddCourt(true)
              }}
            >
              เพิ่มคอร์ด
            </Button>
          </Col>
        </Row>
      )}
      {/* {editCourt()} */}
      <EditCourt
        show={showEditCourt}
        setShow={setShowEditCourt}
        openTime={openTime}
        closeTime={closeTime}
        onChangeOpenTime={onChangeOpenTime}
        onChangeCloseTime={onChangeCloseTime}
        courts={courts}
        currentCourt={currentCourt}
        currentSportName={currentSportName}
        currentSportId={currentSportId}
        updateCourt={updateCourt}
      />
      <DeleteCourtModal
        show={showDeleteCourt}
        setShow={setShowDeleteCourt}
        deleteCourt={deleteCourt}
        currentCourt={currentCourt!}
        currentSportId={currentSportId}
      />
      <AddCourtFunc
        show={showAddCourt}
        setShow={setShowAddCourt}
        onChangeOpenTime={onChangeOpenTime}
        onChangeCloseTime={onChangeCloseTime}
        openTime={openTime}
        closeTime={closeTime}
        courts={courts}
        updateCourt={updateCourt}
        currentSportId={currentSportId}
      />
      <HandleError show={showError} setShow={setShowError} />
    </div>
  )
}
