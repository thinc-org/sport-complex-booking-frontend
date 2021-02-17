import React, { useState, useEffect, useCallback } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { DeleteSport, AddSport, HandleError, EditSport } from "./SportSettingsComponents"
import { ListCourts } from "../../../../dto/settings.dto"
import { Sport } from "../../../../dto/sport.dto"
import useSportState from "./SettingsHooks/useSportState"
import useCurrentSportState from "./SettingsHooks/useCurrentSportStates"

export default function SportsSettings() {
  const [pageNo, setPageNo] = useState(1)
  const [maxSport, setMaxSport] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [showNoSport, setShowNoSport] = useState<boolean>(false)
  const [showAddSport, setShowAddSport] = useState<boolean>(false)
  const [showDeleteSport, setShowDeleteSport] = useState<boolean>(false)
  const [showEditSport, setShowEditSport] = useState<boolean>(false)
  const [showError, setShowError] = useState(false)
  const [currentSport, setCurrentSport] = useCurrentSportState()
  const [sports, setSports] = useSportState()

  const requestSports = useCallback(
    (query?: string) => {
      const start = (pageNo - 1) * 10
      const end = pageNo * 10
      const search_filter = query ? query : "$"
      client
        .get<ListCourts>("/court-manager/search", {
          params: {
            start: start,
            end: end,
            filter: search_filter,
          },
        })
        .then(({ data }) => {
          setSports(data["sport_list"])
          setMaxSport(data["allSport_length"])
        })
        .catch(() => {
          setShowError(true)
        })
    },
    [pageNo, setSports]
  )

  useEffect(() => {
    requestSports()
  }, [requestSports])

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    requestSports(searchName)
  }

  const sendEdittedSportInfo = (currentSport: Sport) => {
    client
      .put<Sport>("/court-manager/" + currentSport._id, currentSport)
      .then(() => {
        setShowEditSport(false)
        requestSports()
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const sendNewSportInfo = (newSport: Sport) => {
    client
      .post<Sport>("/court-manager/", newSport)
      .then(() => {
        requestSports()
        setShowAddSport(false)
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const sendDeleteSport = (currentSport: Sport) => {
    client
      .delete<Sport>("/court-manager/" + currentSport._id)
      .then(() => {
        setShowDeleteSport(false)
        requestSports()
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const onSubmitAddSport = (data: Sport) => {
    const newData = { ...data, quota: data.quota / 60, required_user: parseInt(data.required_user + "") }
    sendNewSportInfo(newData)
  }

  const renderNoSportModal = () => {
    return (
      <Modal
        show={showNoSport}
        onHide={() => {
          setShowNoSport(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ไม่พบข้อมูลของพนักงานท่านนี้</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowNoSport(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderSportsTable = () => {
    const sportsList = sports.map((sport, i) => {
      return (
        <tr key={i} className="tr-normal">
          <td> {sport.sport_name_th} </td>
          <td> {sport.quota * 60 + " นาที"} </td>
          <td> {sport.required_user + " คน"}</td>
          <td>
            <Button
              className="btn-normal btn-outline-dark"
              variant="outline-black"
              onClick={() => {
                setShowEditSport(true)
                setCurrentSport(sport)
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
                setShowDeleteSport(true)
                setCurrentSport(sport)
              }}
            >
              ลบกีฬา
            </Button>
          </td>
        </tr>
      )
    })
    return sportsList
  }

  const handlePagination = (next_page: number) => {
    const maxPage: number = Math.floor((maxSport + 9) / 10)
    if (next_page >= 1 && next_page <= maxPage) {
      requestSports()
    }
  }

  const loadPagination = () => {
    const maxPage: number = Math.floor((maxSport + 9) / 10)
    const numList: Array<number> = []
    let i = 0
    while (numList.length < 5) {
      const page = pageNo + i - 2
      if (page >= 1 && page <= maxPage) {
        numList.push(page)
      } else if (page > maxPage) {
        break
      }
      i++
    }
    const elementList = numList.map((num) => {
      if (num === pageNo)
        return (
          <Pagination.Item key={num} active={true}>
            {num}
          </Pagination.Item>
        )
      return (
        <Pagination.Item
          key={num}
          onClick={() => {
            setPageNo(num)
            handlePagination(num)
          }}
        >
          {num}
        </Pagination.Item>
      )
    })
    return (
      <Pagination className="justify-content-md-end">
        <Pagination.Prev
          onClick={() => {
            if (pageNo > 1) {
              setPageNo(pageNo - 1)
              handlePagination(pageNo - 1)
            }
          }}
        />
        {elementList}
        <Pagination.Next
          onClick={() => {
            if (pageNo < maxPage) {
              setPageNo(pageNo + 1)
              handlePagination(pageNo + 1)
            }
          }}
        />
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
          <Col sm="auto"></Col>
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
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowAddSport(true)
            }}
          >
            เพิ่มกีฬา{" "}
          </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      <AddSport show={showAddSport} setShow={setShowAddSport} onSubmitAddSport={onSubmitAddSport} />
      <DeleteSport show={showDeleteSport} setShow={setShowDeleteSport} mainFunction={sendDeleteSport} data={currentSport} />
      <EditSport
        show={showEditSport}
        setShow={setShowEditSport}
        setCurrentSport={setCurrentSport}
        sendEdittedSportInfo={sendEdittedSportInfo}
        currentSport={currentSport}
      />
      <HandleError show={showError} setShow={setShowError} />
    </div>
  )
}
