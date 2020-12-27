import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../../../contexts/UsersContext";
import withUserGuard from '../../../guards/user.guard'
import { useAuthContext } from "../../../controllers/authContext";
import { History, LocationState } from "history";
import { DetailsModal } from "../../ui/Modals/WaitingRoomModals";
import { useTranslation } from 'react-i18next'

export interface CreateWaitingRoomProps {
 history: History<LocationState>;
}

export interface WaitingRoomData {
  sport_id: string,
  court_number: number,
  time_slot: number[],
  date:Date
}

export interface SportsResponse {
  quota: number,
  required_user: number,
  sport_name_en: string,
  sport_name_th: string,
}

export interface ErrorMessage {
  statusCode: number,
  message: string
}

function CreateWaitingRoom(props: CreateWaitingRoomProps) {
  // States
  const { register, handleSubmit, getValues, watch } = useForm()
  const [date, setDate] =useState(new Date());
  const [today] = useState(new Date());
  const [details, setDetails] = useState<WaitingRoomData>({sport_id: "", court_number: 0, time_slot: [], date});
  const [quota, setquota] = useState(60)
  const {t} = useTranslation()

  // Sport States
  const [sport, setSport] = useState([])
  const [sportName, setSportName] = useState<String>()

  // Court States
  const [courts, setCourts] = useState([])

  // Time States
  const [time, setTime] = useState([1, 2, 3])
  const times = watch('time_slot', []);
  const checkedCount = times.filter(Boolean).length;

  // Selection
  let [showCourt, setShowCourt] = useState(false)
  let [showTime, setShowTime] = useState(false)

  // Modal
  const [show, setShow] = useState(false);
  const [showDateWarning, setShowDateWarning] = useState(true);
  const {token} = useAuthContext();


  useEffect(() => {
    fetchValidity(token)
    fetchCourts()
  }, [])

  const onSubmit = (data: WaitingRoomData) => {
  let newData = {...data}
  newData.time_slot = newData.time_slot.sort()
  setDetails({...newData})
  data.time_slot = data.time_slot.sort()
}
// Date difference > 7
const validDate = (date1, date2) => {
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays >= 7) {
    return true
  } else {
    return false
  }
}
// [0] check account validity
const fetchValidity = async (token: String | undefined ) => {

  let axios = require('axios');
  let config = {
    method: 'post',
    url: 'http://localhost:3000/reservation/checkvalidity',
    headers: { 
      'Authorization': 'bearer ' + token
    }
  };
  await axios(config)
  .then((response:SportsResponse[]) => {
    console.log(response)
    let resMsg = response['data']['message']
    if (resMsg !== "valid user") {
      const state = {msg: resMsg}
      props.history.push({pathname: '/banned',state});
    }
  })
  .catch((error: ErrorMessage) => {
    const state = {msg: error['message']}
    props.history.push({pathname: '/banned',state});
  });

}
// [1] Fetch Courts
const fetchCourts = async () => {
  await axios
    .get("http://localhost:3000/court-manager/getAll", {
      headers: {
        Authorization: "bearer " + token,
      },
    })
    .then(({ data }) => {
      console.log(data)
      setSport(data)
    })
    .catch(({data}) => {
      console.log(data)
    })
}
// [2] Fetch Quota
const fetchQuota = async () => {
  await axios
    .get("http://localhost:3000/", {
      headers: {
        Authorization: "bearer " + token,
      },
    })
    .then(({ data }) => {
      console.log(JSON.parse(data))
      
    })
    .catch(({data}) => {
      console.log(JSON.parse(data))
    })
}
// [3] Fetch Time
const fetchTime = async () => {
  await axios
    .get("http://localhost:3000/", {
      headers: {
        Authorization: "bearer " + token,
      },
    })
    .then(({ data }) => {
      console.log(JSON.parse(data))
    })
    .catch(({data}) => {
      console.log(JSON.parse(data))
    })
}

// [4] Post to Backend
const postDataToBackend = async (data: WaitingRoomData) => {
  let newData = {
    ...data,
    date: date
  }
  console.log(newData)
  await axios.post("http://localhost:3000/reservation/createwaitingroom", {
    headers: {
      Authorization: "bearer " + token,
    },
    data: newData
  })
  .then(({data})=> {
    console.log("RESPONSE IS")
    console.log(data)
  })
  .catch((err)=> {
    console.log(err)
  })
}

const formatTime = (element: number) => {
  return (
    Math.floor((element-1)/2) + ":" + (((element-1) *30%60).toString()+"0").substring(0,2) + "-" + Math.floor((element)/2) + ":" + (((element) *30%60).toString()+"0").substring(0,2)
  )
}

  return (
    <div className="Orange">
    <div className="mx-auto col-md-6">

      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="d-flex justify-content-center font-weight-bold  mt-3">{t("create_waiting_room")}</h4>
        <div className="mx">
          <hr/>
        </div>
        <div className="default-mobile-wrapper mt-4">
          <span className="row mt">
            <label className="form-label mt-2 ml-3">{t("date_selection")}</label>
          </span>
          <div className="d-flex react-datepicker-wrapper">
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date: Date) => {
                const fixedDate = new Date(date.setHours(0,0,0,0))
                setDate(fixedDate)
                if (validDate(today, date)) {
                  setShowDateWarning(false);
                } else {
                  setShowDateWarning(true);
                }        
              }}
            />
          </div>
          {showDateWarning ? <p className="font-weight-light text-danger">{t("seven_days")}</p> : <></>}
          <div className="mt-2">
            <label className="form-label mt-2">{t("sport_selection")}</label>
            <div>
              <select name="sport_id" ref={register} onChange={() => {
                if (getValues("sport_id") !== "") {
                  sport.forEach((sport)=> {
                    const selectedID = sport['_id']
                    if (selectedID === getValues("sport_id")) {
                      setCourts(sport['list_court'])
                      setSportName(sport['sport_name_en'])
                    }
                  })
                  setShowCourt(true)
                }
              }}>
              <option className="dropdown-item" value="">{t("sport_selection")}</option>
              {sport.map((item, i) => (<option key={i} value={item['_id']}>{item['sport_name_en']}</option>))}
            </select>
            </div>
            {showCourt ? (
              <div>
                <label className="form-label mt-2">{t("court_selection")}</label>
                <div>
                  <select name="court_number" ref={register} onChange={()=> {
                    if (getValues("court_number") !== "") {
                      //getTime()
                      setShowTime(true)
                    } else {
                      setShowTime(false)
                    }
                  }}>
                  <option className="dropdown-item" value="">{t("sport_selection")}</option>
                  {courts.map((item, i) => (<option key={i} value={item['court_num']}>{"Court" + item['court_num']}</option>))}
                </select>
                </div>
              </div>
            ) : (<div></div>)}
            {showTime? (
              <div>
                <div className="mt-3">
                  <hr />
                  <h6>{t("remaining_quota")}</h6>
                  {quota - checkedCount * 30 < 30 
                  ? (<h4>{t("used_up_quota")}</h4>) 
                  : (<h4>{quota - checkedCount * 30} {t("mins_remaining")}</h4>)}       
                </div>
                  <hr/> 
                <label className="form-label mt-2">{t("time_slot_selection")}</label>
                <div>
                    {time.map((item, i) => (
                    <div className="my-0" key={i}>
                      <label className="ml-2">
                        <input className="mr-2 time-checkbox" type="checkbox" key={i} 
                        value={item} ref={register} name="time_slot" 
                        disabled={!times.includes(JSON.stringify(item)) && quota/30 <= checkedCount }/>{formatTime(item)}</label>
                      <hr className="mt-1 p-0" />
                    </div>))}
                </div>
              </div>
            ): (<div></div>)}
          </div>
        </div>
        <br />
        <div className="button-group my-2">
          <Link to={"/reservenow"}>
            <Button className="btn-secondary">{t("cancel")}</Button>
          </Link>
          {showDateWarning 
          ? null 
          : <Button type="submit" variant="pink" onClick={() => {setShow(true)}}>
            {t("create_waiting_room")}
          </Button>}
        </div>
        <DetailsModal show={show} setShow={setShow} sportName={sportName} details={details} date={date} times={times} formatTime={formatTime} postDataToBackend={postDataToBackend} />
      </form>
    </div>
  </div>
  ) 
}


export default withUserGuard(CreateWaitingRoom)