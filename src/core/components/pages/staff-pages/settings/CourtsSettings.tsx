import React, { useState, useEffect } from "react"
import { Table, Form, Row, Col, Button } from "react-bootstrap"
import TimePicker from 'react-time-picker';
import { client } from "../../../../../axiosConfig"
import { NoCourtsModal, EditCourt, DeleteCourtModal, AddCourtFunc } from "./CourtsSettingsComponents";
import { HandleError } from "./SportSettingsComponents"
import { AxiosResponse } from "axios";

export default function CourtsSettings() {

  interface CourtData {
    court_num: number
    open_time?: number
    close_time?:number
    _id: string
  }

  const [showAddCourt, setShowAddCourt] = useState(false)
  const [showNoCourt, setShowNoCourt] = useState(false)
  const [showEditCourt, setShowEditCourt] = useState(false)
  const [showDeleteCourt, setShowDeleteCourt] = useState(false)
  const [showError, setShowError] = useState(false)
  const [openTime, onChangeOpenTime] = useState('00:00');
  const [closeTime, onChangeCloseTime] = useState('00:00');
  const [sports, setSports] = useState(['sportID1'])
  const [sportsList, setSportsList] = useState([''])
  const [currentSportId, setCurrentSportId] = useState('$')
  const [currentSportName, setCurrentSportName] = useState()
  const [currentCourt, setCurrentCourt] = useState({})
  const [courts, setCourts] = useState<CourtData[]>([
      {
        court_num: 0,
        open_time: 0,
        close_time: 0,
        _id: ""
      }])

  useEffect(() => {
    requestSports()
  }, [])

  const requestSports = async () => {
    await client.get<AxiosResponse>('/court-manager/0/999/' + currentSportId)
      .then((data) => {
        console.log(data['data'])
        const newSport = ['temp']
        data['data']['sport_list'].forEach((sport: string)=> {
          newSport.push(sport)
        })
        setSports(newSport.slice(1))
        setSportsList(data['data']['sport_list'])
      })
      .catch(() =>{setShowError(true)})
  }

  const requestCourts = async (sportId: string) => {
    await client.get<AxiosResponse>('/court-manager/' + sportId)
      .then((data) => {
        console.log(data)
        console.log(data['data']['list_court'])
        setCourts(data['data']['list_court'])
      })
      .catch((response) => {
        console.log(response)
        setShowError(true)
      }) 
  }
  
  const deleteCourt = async (courtId: string, sportId: string) => {
    let newCourts = courts
    newCourts = newCourts.filter(function(court) {
      return court['_id'] !== courtId
    })
    const data = {
      sport_id: sportId,
      new_setting: newCourts
    }
    console.log(data)
    await client.put<AxiosResponse>('/court-manager/court-setting/update', data)
      .then((data) => {
        console.log(data)
        setShowDeleteCourt(false)
        requestCourts(currentSportId)
      })
      .catch((response) => {
        console.log(response)
        setShowError(true)
        requestCourts(currentSportId)
      })
  }

  const updateCourt = async (sportId: string) => {
    const data = {
      sport_id: sportId,
      new_setting: courts
    }
    console.log(data)
    await client.put<AxiosResponse>('/court-manager/court-setting/update', data)
      .then((data) => {
        console.log(data)
        requestCourts(currentSportId)
        setShowEditCourt(false)
        setShowAddCourt(false)
      })
      .catch((response) => {
        console.log(response)
        setShowError(true)
        requestCourts(currentSportId)
      })
  }


  const handleChangeSport = (e) => {
    setCurrentSportId(e.target.value!)
    sportsList.forEach((sport)=> {
      if (sport['_id'] === e.target.value!) {
        setCurrentSportName(sport['sport_name_th'])
      }
    })
    requestCourts(e.target.value!)
  }

  const renderCourtsTable = () => {
    let courtList = courts.map((court, i)=> {
      const openTime = Math.floor(court['open_time']! / 2) + ":" + (((court['open_time']! -1)* 30)%60).toString().substring(0,1) + "0"
      const closeTime = Math.floor(court['close_time']! / 2) + ":" + (((court['close_time']!-1) * 30)%60).toString().substring(0,1) + "0"
      if (court['sport_name_th'] === "") return (<div className="alert alert-danger mt-3" role="alert">กรุณาเลือกชนิดกีฬา</div>)
      return(
        <tr key={i} className="tr-normal">
          <td> {court['court_num']} </td>
          <td> {currentSportName}</td>
          <td> {openTime} </td>
          <td> {closeTime}</td>
          <td><Button
          className="btn-normal btn-outline-dark" variant="outline-black"
          onClick={() => {
            setCurrentCourt(court)
            setShowEditCourt(true)
          }}>แก้ไข</Button>
          </td>
          <td>
          <Button
            className="btn-normal btn-outline-black" variant="outline-danger"
            onClick={() => {
              setCurrentCourt(court)
              setShowDeleteCourt(true)
              //deleteCourt(court['_id'], currentSportId)
          }}>ลบกีฬา</Button></td>
        </tr>
      )
    })
    return courtList
    
  }


  return (
    <div>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>ประเภทกีฬา</Form.Label>
        <Form.Control as="select" custom defaultValue={0} onChange={(e)=>handleChangeSport(e)}>
          <option value={'$'}>เลือกประเภทกีฬา</option>
          {sports.map((sport, i) => {
            return <option key={i} value={sport['_id']} >{sport['sport_name_th']}</option>
          })}
        </Form.Control>
      </Form.Group>
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

      {currentSportId !== "$" && <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            setShowAddCourt(true)
          }}>
            เพิ่มคอร์ด
            </Button>
        </Col>
      </Row>}
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
      <DeleteCourtModal show={showDeleteCourt} setShow={setShowDeleteCourt} deleteCourt={deleteCourt} currentCourt={currentCourt} currentSportId={currentSportId} />
      <AddCourtFunc show={showAddCourt} setShow={setShowAddCourt} onChangeOpenTime={onChangeOpenTime} onChangeCloseTime={onChangeCloseTime} openTime={openTime} closeTime={closeTime} courts={courts} updateCourt={updateCourt} currentSportId={currentSportId} />
      <HandleError show={showError} setShow={setShowError}/> 
    </div>
  )
}