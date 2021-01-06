import React, { useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { AxiosResponse } from "axios"
import { SportData, DeleteSport, AddSport, HandleError, EditSport } from "./SportSettingsComponents"

export default function SportsSettings() {

  const [pageNo, setPageNo] = useState(1)
  const [maxSport, setMaxSport] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [showNoSport, setShowNoSport] = useState<boolean>(false)
  const [showAddSport, setShowAddSport] = useState<boolean>(false)
  const [showDeleteSport, setsSowDeleteSport] = useState<boolean>(false)
  const [showEditSport, setShowEditSport] = useState<boolean>(false)
  const [showError, setShowError] = useState(false)
  const [currentSport, setCurrentSport] = useState<SportData>(
    {
      sport_name_th: "",
      sport_name_en: "",
      required_user: 0,
      quota: 0,
    })
  const [sports, setSports] = useState([{
      object_id: "",
      sport_name_th: "",
      sport_name_en: "",
      required_user: 0,
      quota: 4,
      list_court: [1, 2, 3],
    },
  ])

  useEffect(() => {
    requestSports()
  }, [pageNo])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchName)
    requestSports(searchName)
  }

  const sendEdittedSportInfo = async (currentSport: SportData)=> {
    await client.put<AxiosResponse>('/court-manager/' + currentSport['_id'], currentSport)
    .then(()=> {
      setShowEditSport(false)
      requestSports()
    })
    .catch(()=> {setShowError(true) })
  }

  const sendNewSportInfo = async (newSport: SportData) => {
    await client.post<AxiosResponse>('/court-manager/', newSport)
    .then(()=> {
      requestSports()
      setShowAddSport(false)
    })
    .catch(()=> {setShowError(true)})
  }

  const sendDeleteSport = async (currentSport: SportData) => {
    await client.delete<AxiosResponse>('/court-manager/' + currentSport['_id'])
    .then(()=>{
      setsSowDeleteSport(false)
      requestSports()
    }) 
    .catch(()=> {setShowError(true)})
  }

  const requestSports = async (query?: string) => {
    const start = (pageNo -1) * 10
    const end = pageNo * 10 
    const search_filter =  query ? query : "$"
    console.log("start " + start)
    await client.get<SportData[]>('/court-manager/'+start+ "/" +end + "/" + search_filter)
      .then(({data}) => {
        console.log(data)
        setSports(data['sport_list'])
        setMaxSport(data['allSport_length'])
      })
      .catch(() => {setShowError(true)})
  }

  const onSubmitAddSport = (data: SportData) => {
    const newData = {...data, quota: data.quota/30, required_user: parseInt(data.required_user+'')}
    console.log(newData)
    sendNewSportInfo(newData)
  }

  const renderNoSportModal = () => {
    return (
      <Modal
        show={showNoSport}
        onHide={() => {setShowNoSport(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ไม่พบข้อมูลของพนักงานท่านนี้</Modal.Body>
        <Modal.Footer>
          <Button variant="pink" className="btn-normal"
            onClick={() => {setShowNoSport(false)}}
          >ตกลง</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderSportsTable = () => {
    let sportsList = sports.map((sport, i) => {
      return (
        <tr key={i} className="tr-normal">
          <td> {sport.sport_name_th} </td>
          <td> {sport.quota * 30 + " นาที"} </td>
          <td> {sport.required_user + " คน"}</td>
          <td><Button
            className="btn-normal btn-outline-dark" variant="outline-black"
            onClick={() => {
              setShowEditSport(true)
              setCurrentSport(sport)
            }}>แก้ไข</Button>
          </td>
          <td><Button
            className="btn-normal btn-outline-black" variant="outline-danger"
            onClick={() => {
              setsSowDeleteSport(true)
              setCurrentSport(sport)
            }}>ลบกีฬา</Button></td>
        </tr>
      )
    })
    return sportsList
  }  

  const handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((maxSport + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      requestSports()
    }
    
  }

  const loadPagination = () => {
    let max_page: number = Math.floor((maxSport + 9) / 10)
    let numList: Array<number> = []
    let i = 0
    while (numList.length < 5) {
      let page = pageNo + i - 2
      if (page >= 1 && page <= max_page) {
        numList.push(page)
      } else if (page > max_page) {
        break
      }
      i++
    }
    let elementList = numList.map((num) => {
      if (num === pageNo)
        return (<Pagination.Item key={num} active={true}>{num}</Pagination.Item>)
      return (
        <Pagination.Item
          key={num}
          onClick={() => {
            setPageNo(num)
            console.log(pageNo)
            console.log("GOTO:" + num)
            handlePagination(num)
          }}
        >
          {num}
        </Pagination.Item>
      )
    })
    return (
      <Pagination className="justify-content-md-end">
        <Pagination.Prev onClick={() => {
          setPageNo(pageNo -1)
          handlePagination(pageNo - 1)
        }}/>
        {elementList}
        <Pagination.Next onClick={() => {
          setPageNo(pageNo + 1)
          handlePagination(pageNo + 1)
        }}/>
      </Pagination>
    )
  }

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-2">
        <Form.Row className="justify-content-end align-items-center">
          <Col md="auto">
            <Form.Label className="mb-0 font-weight-bold"> ค้นหากีฬา </Form.Label>
          </Col>
          <Col md="5">
            <Form.Control
              className="border"
              style={{ backgroundColor: "white" }}
              type="text"
              id="searchName"
              placeholder=" ค้นหา "
              onChange={(e) => {
                setSearchName(e.target.value)
              }}
            />
          </Col>
          <Col sm="auto">
          </Col>
          <Button variant="black" className="py-1 btn-outline-dark" onClick={handleSearch}>
            ค้นหา
          </Button>
        </Form.Row>
      </Form>

      <Table responsive className="text-center" size="md">
        <thead className="bg-light">
          <tr className="tr-pink">
            <th>ประเภทกีฬา</th>
            <th>เวลาการจองมากสุดต่อคน</th>
            <th>สมาชิกขั้นตํ่า</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderSportsTable()}
          {renderNoSportModal()}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            setShowAddSport(true)
          }}>เพิ่มกีฬา </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      <AddSport show={showAddSport} setShow={setShowAddSport} onSubmitAddSport={onSubmitAddSport}/>
      <DeleteSport show={showDeleteSport} setShow={setsSowDeleteSport} mainFunction={sendDeleteSport} data={currentSport} />
      <EditSport show={showEditSport} setShow={setShowEditSport} setCurrentSport={setCurrentSport} sendEdittedSportInfo={sendEdittedSportInfo} currentSport={currentSport} />
      <HandleError show={showError} setShow={setShowError}/> 
    </div>
  )
}