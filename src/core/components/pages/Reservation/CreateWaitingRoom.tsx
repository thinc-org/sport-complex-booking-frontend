import React, { useState, useEffect, useCallback } from "react"
import { Button, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Link, useHistory } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"
import { DetailsModal, CustomWaitingRoomModal } from "../../ui/Modals/WaitingRoomModals"
import { useTranslation } from "react-i18next"
import { client } from "../../../../axiosConfig"
import { WaitingRoomData, CreateResponse } from "../../../dto/waitingRoom.dto"
import { CreateWaitingRoomErrorMsg, CheckValidityErrorMsg } from "./ReservationComponents"
import { Sport, Court } from "../../../dto/sport.dto"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"

function CreateWaitingRoom() {
  // States
  const { register, handleSubmit, getValues, watch, setValue } = useForm()
  const [date, setDate] = useState(new Date())
  const [today] = useState(new Date())
  const [details, setDetails] = useState<WaitingRoomData>({ sport_id: "", court_number: 0, time_slot: [], date })
  const [quota, setquota] = useState(0)
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const sportLanguage = language === "th" ? "sport_name_th" : "sport_name_en"
  const history = useHistory()
  // Sport States
  const [sport, setSport] = useState<Sport[]>([])
  const [sportName, setSportName] = useState<string>()
  const [requiredUserCount, setRequiredUserCount] = useState<number>()
  // Court States
  const [courts, setCourts] = useState<Court[]>([])
  // Time States
  const [time, setTime] = useState([1, 2])
  const times = watch("time_slot", [])
  const checkedCount = times.filter(Boolean).length
  // Selection
  const [showCourt, setShowCourt] = useState(false)
  const [showTime, setShowTime] = useState(false)
  // Modal
  const [show, setShow] = useState(false)
  const [showDateWarning, setShowDateWarning] = useState(false)
  const [selectTimeWarning, setSelectTimeWarning] = useState(false)
  const [showCantCreateWaitingRoomModal, setShowCantCreateWaitingRoomModal] = useState(false)
  const [showTimeSlotError, setShowTimeSlotError] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")
  const [showValidityWarningMessage, setShowValidityWarningMessage] = useState(false)
  const [showCreateWarningMessage, setShowCreateWarningMessage] = useState(false)
  const [invalidAccount, setInvalidAccount] = useState(false)
  const [errorType, setErrorType] = useState("danger")

  // Date difference > 7
  const validDate = (date1: Date, date2: Date) => {
    const diffTime = date2.getTime() - date1.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays <= 7 && diffDays >= 0) {
      return true
    } else {
      return false
    }
  }
  // [0] check account validity
  const fetchValidity = useCallback(() => {
    client
      .post("/reservation/checkvalidity")
      .then(() => {
        setShowValidityWarningMessage(false)
        setInvalidAccount(false)
        setErrorType("warning")
      })
      .catch((error) => {
        if (error.response) {
          setInvalidAccount(true)
          setWarningMessage(error.response.data.reason)
          setShowValidityWarningMessage(true)
        }
      })
  }, [])
  // [1] Fetch Courts
  const fetchCourts = useCallback(() => {
    client
      .get<Sport[]>("/court-manager/sports")
      .then(({ data }) => {
        setSport(data)
      })
      .catch((error) => {
        if (error.response) {
          setWarningMessage(error.response.data.reason)
          setShowCreateWarningMessage(true)
        }
      })
  }, [])
  // [2] Fetch Quota
  const fetchQuota = useCallback((selectedSportID: string, date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const data = {
      sport_id: selectedSportID,
      date: year + "-" + month + "-" + day,
    }
    if (selectedSportID === "") return null
    client
      .post<number>("/reservation/checkquota", data)
      .then(({ data }) => {
        setquota(data * 30)
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) setInvalidAccount(true)
          setWarningMessage(error.response.data.reason)
          setShowCreateWarningMessage(true)
        }
      })
  }, [])
  // [3] Fetch Time
  const fetchTime = useCallback((court_number: number, selectedSportID: string, date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const data = {
      court_number: court_number,
      sport_id: selectedSportID,
      date: year + "-" + month + "-" + day,
    }
    client
      .post<number[]>("/reservation/checktimeslot", data)
      .then(({ data }) => {
        setTime(data)
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) setInvalidAccount(true)
          setWarningMessage(error.response.data.reason)
          setShowCreateWarningMessage(true)
        }
      })
  }, [])
  // [4] Post to Backend
  const postDataToBackend = (data: WaitingRoomData) => {
    const formattedTimeSlot = [0]
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    data.time_slot.forEach((time) => {
      formattedTimeSlot.push(Number(time))
    })
    const newData = {
      ...data,
      date: year + "-" + month + "-" + day,
      court_number: Number(data.court_number),
      time_slot: formattedTimeSlot.slice(1),
    }
    client
      .post<CreateResponse>("/reservation/createwaitingroom", newData)
      .then(() => {
        history.push({ pathname: "/waitingroom" })
      })
      .catch((error) => {
        setShowCantCreateWaitingRoomModal(true)
        if (error.response) {
          if (error.response.status === 404) setInvalidAccount(true)
          setWarningMessage(error.response.data.reason)
          setShowCreateWarningMessage(true)
        }
      })
  }

  const formatTime = (element: number) => {
    return (
      Math.floor((element - 1) / 2) +
      ":" +
      ((((element - 1) * 30) % 60).toString() + "0").substring(0, 2) +
      "-" +
      Math.floor(element / 2) +
      ":" +
      (((element * 30) % 60).toString() + "0").substring(0, 2)
    )
  }

  const invalidTimeSlot = (item: number) => {
    if (getValues("time_slot")) {
      if (getValues("time_slot").length === 0) return false
      else {
        if (getValues("time_slot").includes(item - 1 + "") || getValues("time_slot").includes(item + 1 + "")) return false
        else return true
      }
    }
    return true
  }

  const shouldDisable = (item: number) => {
    let disableCheck = false
    if (invalidTimeSlot(item)) disableCheck = true
    if (quota / 30 <= checkedCount) disableCheck = true
    if (times.includes(item + "")) disableCheck = false
    if (quota === 0 && !times.includes(item + "")) disableCheck = true
    if (checkedCount === 0) disableCheck = false
    return disableCheck
  }

  const checkTimeSlotValidity = () => {
    if (getValues("time_slot")) {
      const array = getValues("time_slot")
      if (array[array.length - 1] - array[0] + 1 !== array.length) setShowTimeSlotError(true)
      else setShowTimeSlotError(false)
    }
  }

  const onSubmit = (data: WaitingRoomData) => {
    if (data.time_slot.length === 0) {
      setShow(false)
      setSelectTimeWarning(true)
    } else {
      setSelectTimeWarning(false)
      setDetails(data)
    }
  }

  useEffect(() => {
    fetchValidity()
    fetchCourts()
  }, [fetchValidity, fetchCourts])

  return (
    <div className="Orange">
      <NavHeader header={t("createWaitingRoom")} />
      <CheckValidityErrorMsg show={showValidityWarningMessage} reason={warningMessage} type={errorType} />
      <CreateWaitingRoomErrorMsg show={showCreateWarningMessage && !showValidityWarningMessage} reason={warningMessage} type={errorType} />
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="default-mobile-wrapper mt-4 animated-card">
            <span className="row mt">
              <label className="form-label mt-2 ml-3">{t("dateSelection")}</label>
            </span>
            <div className="d-flex react-datepicker-wrapper">
              <DatePicker
                className="form-control date-picker select-drop-down"
                selected={date}
                disabled={invalidAccount}
                onChange={(date: Date) => {
                  const fixedDate = new Date(date.setHours(0, 0, 0, 0))
                  setDate(fixedDate)
                  setShowCourt(false)
                  setShowTime(false)
                  setValue("court_number", "")
                  setValue("sport_id", "")
                  if (validDate(today, date)) setShowDateWarning(false)
                  else setShowDateWarning(true)
                }}
              />
            </div>
            {showDateWarning ? <p className="font-weight-light text-danger">{t("sevenDays")}</p> : null}
            <div className="mt-2">
              <label className="form-label mt-2">{t("sportSelection")}</label>
              <div>
                <select
                  name="sport_id"
                  ref={register}
                  className="select-drop-down"
                  disabled={invalidAccount || showDateWarning}
                  onChange={() => {
                    setShowCourt(false)
                    setShowTime(false)
                    setValue("court_number", "")
                    setValue("time_slot", [])
                    fetchQuota(getValues("sport_id"), date)
                    sport.forEach((sport) => {
                      if (sport["_id"] === getValues("sport_id")) {
                        setCourts(sport["list_court"])
                        setShowCourt(true)
                        setRequiredUserCount(sport["required_user"])
                        setSportName(sport[sportLanguage])
                      }
                    })
                  }}
                >
                  <option className="dropdown-item" value="">
                    {t("sportSelection")}
                  </option>
                  {sport.map((item, i) => (
                    <option key={i} value={item["_id"]}>
                      {item[sportLanguage]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label mt-2">{t("court")}</label>
                <div>
                  <select
                    name="court_number"
                    className="select-drop-down"
                    ref={register}
                    disabled={!showCourt || invalidAccount}
                    onChange={() => {
                      setShowTime(false)
                      if (getValues("court_number") !== "") {
                        setValue("time_slot", [])
                        fetchTime(getValues("court_number"), getValues("sport_id"), date)
                        fetchQuota(getValues("sport_id"), date)
                        setShowTime(true)
                      } else {
                        setShowTime(false)
                      }
                    }}
                  >
                    <option className="dropdown-item" value="">
                      {t("courtSelection")}
                    </option>
                    {courts.map((item, i) => (
                      <option key={i} value={item["court_num"]}>
                        {item["court_num"]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={showTime ? "" : "d-none"}>
                <div className="mt-3">
                  <div className="glass">
                    <div className="glass-contents">
                      <h6>{t("requiredUserMsg")}</h6>
                      <h4>
                        {requiredUserCount ? requiredUserCount : "..."} {t("users")}
                      </h4>
                      <h6 className="mt-3">{t("remainingQuota")}</h6>
                      {quota - checkedCount * 30 < 30 ? (
                        <h4>{t("usedUpQuota")}</h4>
                      ) : (
                        <h4>
                          {quota - checkedCount * 30} {t("minsRemaining")}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <label className="form-label mt-2 mb-3">{t("timeSlotSelection")}</label>
                {selectTimeWarning ? <p className="alert-warning p-2">{t("pleaseSelectTime")}</p> : null}
                {showTimeSlotError ? <p className="alert-warning p-2">{t("timeSlotErrorMsg")}</p> : null}
                <div className={showTime ? "d-md-flex time-slot-container" : "d-md-flex time-slot-container-hidden"}>
                  <Row className="mx-1">
                    {time.map((item, i) => (
                      <div className={showTime ? "my-0 time-container" : ""} key={i}>
                        <label className="ml-2">
                          <input
                            className="mr-2 time-checkbox"
                            type="checkbox"
                            key={i}
                            value={item}
                            ref={register}
                            name="time_slot"
                            onClick={() => checkTimeSlotValidity()}
                            disabled={shouldDisable(item) || quota === 0}
                          />
                          {formatTime(item)}
                        </label>
                        <hr className="mt-1 p-0" />
                      </div>
                    ))}
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="button-group my-2">
            <Button
              type="submit"
              variant="pink"
              disabled={invalidAccount || showDateWarning || showTimeSlotError || !showCourt || !showTime}
              onClick={() => {
                setShow(true)
              }}
            >
              {t("createWaitingRoom")}
            </Button>
            <Link to={"/reservenow"}>
              <Button className="btn-secondary">{t("cancel")}</Button>
            </Link>
          </div>
          {/* DetailsModal */}
          <DetailsModal
            show={show}
            setShow={setShow}
            sportName={sportName}
            details={details}
            date={date}
            times={times}
            formatTime={formatTime}
            postDataToBackend={postDataToBackend}
          />
          {/* Create waiting room error modal */}
          <CustomWaitingRoomModal
            type="cantCreateWaitingRoomModal"
            show={showCantCreateWaitingRoomModal}
            setShow={setShowCantCreateWaitingRoomModal}
          />
        </form>
      </div>
    </div>
  )
}
export default withUserGuard(CreateWaitingRoom)
