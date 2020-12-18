import React from "react"
import { Button, Modal } from "react-bootstrap"
import { useState} from "react"
import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {Link } from "react-router-dom"

export default function CreateWaitingRoom() {
  // States
  const { register, handleSubmit, getValues } = useForm()
  const [date, setDate] =useState<Date>(new Date());
  const [today] = useState<Date>(new Date());
  let [is_thai_language] = useState(false)
  let [details, setDetails] = useState({sports: "", court: "", time: ""});
  let [quota, setquota] = useState(120)
  let [courts, setCourts] = useState(['1', '2', '3'])
  const courtOptions = courts.map((item, i) => (<option key={i} value={item}>{"Court" + item}</option>));
  let [time, setTime] = useState(['9:00-9:30', '9:30-10:00', '10:00-10:30'])
  const timeOptions = time.map((item, i) => (<option key={i} value={item}>{item}</option>));

  // Selection
  let [showCourt, setShowCourt] = useState(false)
  let [showTime, setShowTime] = useState(false)

  // Functions
  const [show, setShow] = useState(false);
  const [showDateWarning, setShowDateWarning] = useState(true);
  const handleClose = () => setShow(false);
  const onSubmit = (data: any) => {
    setDetails({...data})
    postDataToBackend(details)
  }

  // Fetch Quota
  // const fetchQuota = () => {

  // }
  // Fetch Courts
  // const fetchCourts = () => {
    
  // }
  // Fetch Time
  // const fetchTime = () => {
    
  // }
  // Post to Backend
  const postDataToBackend = (data: any) => {
    console.log(data)
  }


  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="d-flex justify-content-center font-weight-bold  mt-3">Create a Waiting Room</h4>

          <div className="mx">
            <div className="default-mobile-wrapper mt-3">
              <h6>Reservation Quota Remaining</h6>
              <h4>{quota} mins remaining</h4>
            </div>
            <hr/>
          </div>
          <div className="default-mobile-wrapper mt-4">
            <span className="row mt">
              <label className="form-label mt-2 ml-3">Date Selection</label>
            </span>
            <div className="d-flex react-datepicker-wrapper">
              <DatePicker
                className="form-control"

                selected={date}
                onChange={(date: Date) => {
                  setDate(date)
                  if (date.getDate() < today.getDate() + 7) {
                    setShowDateWarning(true);
                  } else {
                    setShowDateWarning(false);
                  }        
                }}
              />
            </div>

            {showDateWarning ? <p className="font-weight-light text-danger">You can only reserve at least 7 days in advance.</p> : <></>}

            <div className="mt-2">
              <label className="form-label mt-2">Sports Selection</label>
              <div>
                <select name="sports" ref={register} onChange={() => {
                  console.log(getValues("sports"))
                  if (getValues("sports") !== "") {
                    //getCourts()
                    setShowCourt(true)
                  }
                }}>
                <option className="dropdown-item" value="">Select a Sport</option>
                <option className="dropdown-item" value="Basketball">Basketball</option>
                <option className="dropdown-item" value="Badbinton">Badminton</option>
                <option className="dropdown-item" value="Soccer">Soccer</option>
              </select>
              </div>
              {showCourt ? (
                <div>
                  <label className="form-label mt-2">Court Selection</label>
                  <div>
                    <select name="court" ref={register} onChange={()=> {
                      console.log(getValues("sports"))
                      if (getValues("court") !== "") {
                        //getTime()
                        setShowTime(true)
                      }
                    }}>
                    <option value="">Select a Court</option>
                    {courtOptions}
                  </select>
                  </div>
                </div>
              ) : (<div></div>)}
              {showTime? (
                <div>
                  <label className="form-label mt-2">Time Selection</label>
                  <div>
                    <select name="time" ref={register}>
                    {timeOptions}
                    </select>
                  </div>
                </div>
              ): (<div></div>)}
            </div>
          </div>
          <br />
          <Modal show={show} onHide={handleClose}>
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
                    <li>Sports: {details.sports}</li>
                    <li>Court: {details.court}</li>
                    <li>Date: {date.toString().substring(0,10)}</li>
                    <li>Time: {details.time}</li>
                  </ul> 
                </div>
                <div className="modal-footer">
                  <Button onClick={() => setShow(false)} type="button" variant="outline-secondary" className="btn-normal">
                    {is_thai_language ? "ยกเลิก" : "Cancel"}
                  </Button>
                  
                  <Button onClick={handleSubmit(onSubmit)} variant="pink" className="btn-normal">
                    {is_thai_language ? "สร้าง" : "Create"}
                  </Button>
                </div>
              </div>
          </Modal>
          <div className="button-group my-2">
            <Link to={"/reservenow"}>
              <Button className="btn-secondary">
                Cancel
              </Button>
            </Link>
            
            {showDateWarning 
            ? <></> 
            : <Button variant="pink" type="submit" onClick={() => {setShow(true)}}>
              Create a Waiting Room Now
            </Button>}
          </div>
        </form>
      </div>
    </div>
  )
}
