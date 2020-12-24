import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {Link } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../../../contexts/UsersContext";
import { getCookie } from '../../../contexts/cookieHandler'
import withUserGuard from '../../../guards/user.guard'
import { useAuthContext } from "../../../controllers/authContext";

function CreateWaitingRoom(props) {
  // States
  const { register, handleSubmit, getValues, watch } = useForm()
  const [date, setDate] =useState<Date>(new Date());
  const [today] = useState<Date>(new Date());
  const [is_thai_language] = useState<Boolean>(getCookie('is_thai_language') === "true")
  const [details, setDetails] = useState({sport_id: "", court_number: "", time_slot: {}});
  const [quota, setquota] = useState(60)

  // Sport States
  const [sport, setSport] = useState([])

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
  const handleClose = () => setShow(false);
  const {token} = useAuthContext();


  useEffect(() => {
    fetchValidity(token)
    //fetchCourts()
  }, [])

  const onSubmit = (data: any) => {
  let newData = {...data}
  newData.time_slot = newData.time_slot.sort()
  setDetails({...newData})
  postDataToBackend(details)
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
const fetchValidity = async (token: String |undefined) => {

  let axios = require('axios');
  let config = {
    method: 'post',
    url: 'http://localhost:3000/reservation/checkvalidity',
    headers: { 
      'Authorization': 'bearer ' + token
    }
  };
  await axios(config)
  .then((response:Object) => {
    let resMsg = response['data']['message']
    if (resMsg !== "valid user") {
      const state = {msg: resMsg}
      props.history.push({pathname: '/banned',state});
    }
  })
  .catch((error: Object) => {
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
const postDataToBackend = async (data: any) => {
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

  return (
    <UserContext.Consumer>
      {(context) => {
        return (
          <div className="Orange">
          <div className="mx-auto col-md-6">

            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="d-flex justify-content-center font-weight-bold  mt-3">{is_thai_language ? "สร้างห้องรอการจอง" : "Create a Waiting Room"}</h4>
              <div className="mx">
                <hr/>
              </div>
              <div className="default-mobile-wrapper mt-4">
                <span className="row mt">
                  <label className="form-label mt-2 ml-3">{is_thai_language ? "เลือกวันที่" : "Date Selection"}</label>
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
                {showDateWarning ? <p className="font-weight-light text-danger">{is_thai_language ? "คุณสามารถจองล่วงหน้าอย่างน้อย 7 วัน" : "You can only reserve at least 7 days in advance."}</p> : <></>}
                <div className="mt-2">
                  <label className="form-label mt-2">{is_thai_language ? "เลือกกีฬา" : "Sports Selection"}</label>
                  <div>
                    <select name="sport_id" ref={register} onChange={() => {
                      if (getValues("sport_id") !== "") {
                        console.log(getValues("sport_id")+ " was selected")
                        sport.forEach((sport)=> {
                          const selectedID = sport['_id']
                          if (selectedID === getValues("sport_id")) {
                            setCourts(sport['list_court'])
                          }
                        })
                        setShowCourt(true)
                      }
                    }}>
                    <option className="dropdown-item" value="">{is_thai_language ? "เลือกกีฬา" : "Sports Selection"}</option>
                    {sport.map((item, i) => (<option key={i} value={item['_id']}>{item['sport_name_en']}</option>))}
                  </select>
                  </div>
                  {showCourt ? (
                    <div>
                      <label className="form-label mt-2">{is_thai_language ? "เลือกสนาม" : "Court Selection"}</label>
                      <div>
                        <select name="court_number" ref={register} onChange={()=> {
                          if (getValues("court_number") !== "") {
                            //getTime()
                            setShowTime(true)
                          } else {
                            setShowTime(false)
                          }
                        }}>
                        <option value="">แ</option>
                        {courts.map((item, i) => (<option key={i} value={item['court_num']}>{"Court" + item['court_num']}</option>))}
                      </select>
                      </div>
                    </div>
                  ) : (<div></div>)}
                  {showTime? (
                    <div>
                      <div className="mt-3">
                        <hr />
                        <h6>{is_thai_language ? "คุณสามารถจองได้อีก" : "Reservation Quota Remaining"}</h6>
                        {quota - checkedCount * 30 < 30 
                        ? (<h4>{is_thai_language ? "คุณใช้สิทธิการจองครบแล้ว" : "You have used up all your quota."}</h4>) 
                        : (<h4>{quota - checkedCount * 30} {is_thai_language ? "นาทีคงเหลือ" : "mins remaining"} </h4>)}       
                      </div>
                       <hr/> 
                      <label className="form-label mt-2">{is_thai_language ? "เลือกเวลาการจอง" : "Time Sloะ Selection"}</label>
                      <div>
                          {time.map((item, i) => (
                          <div key={i}>
                            <label className="ml-2">
                              <input className="mr-2" type="checkbox" key={i} 
                              value={item} ref={register} name="time_slot" 
                              disabled={!times.includes(JSON.stringify(item)) && quota/30 <= checkedCount }/>{item}</label>
                          </div>))}
                      </div>
                    </div>
                  ): (<div></div>)}
                </div>
              </div>
              <br />
              <div className="button-group my-2">
                <Link to={"/reservenow"}>
                  <Button className="btn-secondary">{is_thai_language ? "ยกเลิก" : "Cancel"}</Button>
                </Link>
                {showDateWarning 
                ? <></> 
                : <Button type="submit" variant="pink" onClick={() => {setShow(true)}}>
                  {is_thai_language ? "สร้างห้องรอ" : "Create a Waiting Room Now"}
                </Button>}
              </div>
              <Modal className="modal" show={show} onHide={handleClose}>
                <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="confirmModalLabel">
                        {is_thai_language ? "คุณต้องการสร้างห้องรอการจองหรือไม่" : "Do you want to create a reservation waiting room?"}
                      </h5>
                      <button type="button" className="close" onClick={() => setShow(false)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h4>Reservation Details</h4>
                      <ul>
                        <li>{is_thai_language ? "กีฬา" : "Sport"}: {details.sport_id}</li>
                        <li>{is_thai_language ? "หมายเลขสนาม" : "Court"}: {details.court_number}</li>
                        <li>{is_thai_language ? "วันที่" : "Date"}: {date.toString().substring(0,10)}</li>
                        <li>{is_thai_language ? "เวลา" : "Time"}: <ul>{times.map(element => {
                          return (<li key={element.toString()}>{Math.floor((element-1)/2) + ":" + (((element-1) *30%60).toString()+"0").substring(0,2) + "-" + Math.floor((element-1)/2) + ":" + (((element-1) *30%60).toString()+"0").substring(0,2)}</li>)
                        })}</ul></li>
                      </ul> 
                    </div>
                    <div className="modal-footer">
                      <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal">
                        {is_thai_language ? "ยกเลิก" : "Cancel"}
                      </Button>
                      <Button onClick={()=> postDataToBackend(details)} variant="pink" className="btn-normal">
                        {is_thai_language ? "สร้าง" : "Create"}
                      </Button>
                    </div>
                  </div>
              </Modal>
            </form>
          </div>
        </div>
        ) 
      }}
    </UserContext.Consumer>
  )
}


export default withUserGuard(CreateWaitingRoom)