import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"

export default function SportsSettings() {

  const [jwt, set_jwt] = useState<string>("")
  const [page_no, set_page_no] = useState<number>(1)
  const [max_sport, set_max_sport] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [show_no_sport, set_show_no_sport] = useState<boolean>(false)
  const [show_add_sport, set_show_add_sport] = useState<boolean>(false)
  const [show_delete_sport, set_show_delete_sport] = useState<boolean>(false)
  const [show_edit_sport, set_show_edit_sport] = useState<boolean>(false)
  const [show_error_page, set_show_error_page] = useState<boolean>(false)
  const [temp_quota, set_temp_quota] = useState<number>(0)
  const [temp_required_user, set_temp_required_user] = useState<number>(0)

  const [sports, setSports] = useState([{
    object_id: "1234",
    sport_name_th: "แบต",
    sport_name_en: "Batmintion",
    required_user: "2",
    quota: 4,
    list_court: ["1", "2", "3"],
  },
  {
    object_id: "2234",
    sport_name_th: "บอล",
    sport_name_en: "Football",
    required_user: "6",
    quota: 6,
    list_court: ["4", "5"],
  }
  ])


  const [addSports, setAddSports] = useState({
    object_id: "",
    sport_name_th: "",
    sport_name_en: "",
    required_user: 5,
    quota: 2, // default 2 slots
    list_court: [],
  })


  useEffect(() => {
    // request token
    fetch({
      method: "GET",
      url: "", // Wait for jo becaus he is stinky
    })
      .then(({ data }) => {
        set_jwt(data.token.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    requestSports()
  }, [jwt, page_no])

  const handleSearch = (firstinput) => {
    // send jwt and get //
    // if no user -> "user not found"
    firstinput.preventDefault()
    requestSports()
  }

  const requestSports = () => {
    // Send JWT //
    // get params for request //
    let param_data = {
      begin: (page_no - 1) * 10,
      end: page_no * 10,
    }
    if (searchName !== "") param_data["name"] = searchName
    //  request users from server  //
    fetch({
      method: "GET",
      url: "", // wait for jo because he is stinky
      headers: {
        Authorization: "bearer " + jwt,
      },
      params: param_data,
    })
      .then(({ data }) => {
        let userList = data[1].map((user) => {

        })
        set_max_sport(data[0])
        setSports(userList)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  const renderNoSportModal = () => {
    return (
      <Modal
        show={show_no_sport}
        onHide={() => {
          set_show_no_sport(false)
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
              set_show_no_sport(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderSportsTable = () => {
    let index = (page_no - 1) * 10 + 1
    let sportsList = sports.map((sport) => {
      return (
        <tr key={index} className="tr-normal">
          <td> {sport.sport_name_th} </td>
          <td> {sport.quota * 30 + " นาที"} </td>
          <td> {sport.required_user + " คน"}</td>
          <td><Button
            className="btn-normal btn-outline-dark"
            variant="outline-black"
            onClick={() => {
              set_show_edit_sport(true)
              editSport()
            }}
          >
            แก้ไข
          </Button>
          </td>
          <td><Button
            className="btn-normal btn-outline-black"
            variant="outline-danger"
            onClick={() => {
              set_show_delete_sport(true)
              deleteSport()
            }}
          >
            ลบกีฬา
          </Button></td>
        </tr>
      )

    })
    return sportsList
  }

  const deleteSport = () => {
    return (
      <Modal
        show={show_delete_sport}
        onHide={() => {
          set_show_delete_sport(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบกีฬาออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_sport(false)
            }}
          // add back staff here later
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_sport(false)
              // add back staff here later
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const editSport = () => {
    let { sport_name_th, sport_name_en, required_user, quota, list_court } = addSports
    return (
      <Modal
        show={show_edit_sport}
        onHide={() => {
          set_show_edit_sport(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ประเภทกีฬา: {sport_name_th}</Modal.Title>
        </Modal.Header>
        <div className="card">
          <h5 className="card-header">เวลาการจองมากที่สุด</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
              <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota-2})
                  }}>
                  -60
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota-1})
                  }}>
                  -30
                </Button>
                <span className="mt-3">{quota * 30} นาที</span>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota+1})
                  }}>
                  +30
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota+2})
                  }}>
                  +60
                </Button>
              </span>
            </div>
        </div>

        <div className="card">
          <h5 className="card-header">จํานวนผู้จองขั้นตั่า</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
              <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user-5})
                  }}>
                  -5
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user-1})
                  }}>
                  -1
                </Button>
                <span className="mt-3">{required_user} คน</span>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user+1})
                  }}>
                  +1
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports,required_user:required_user+5})
                  }}>
                  +5
                </Button>
              </span>
            </div>
        </div>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_edit_sport(false)
            }}
          // add back staff here later
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_edit_sport(false)
              set_temp_quota(quota)
              set_temp_required_user(required_user)
              set_show_error_page(true)
              handleError()
              // add back staff here later
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleChangeAdd = (e) => {
    setAddSports({ ...addSports, [e.target.id]: e.target.value })
  }

  const addSport = () => {
    let { sport_name_th, sport_name_en, required_user, quota, list_court } = addSports
    return (
      <Modal
        show={show_add_sport}
        onHide={() => {
          set_show_add_sport(false)
        }}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มกีฬา</Modal.Title>
        </Modal.Header>
        <div className="m-4">
          <Form>
            <Form.Group>
              <Row>
                <Form.Label>ประเภทกีฬา (ภาษาไทย)</Form.Label>
                <Form.Control id="sport_name_th" onChange={handleChangeAdd} value={sport_name_th} />
              </Row>
              <Row>
                <Form.Label>ประเภทกีฬา (ภาษาอังกฤษ)</Form.Label>
                <Form.Control id="sport_name_en" onChange={handleChangeAdd} value={sport_name_en} />
              </Row>
            </Form.Group>
          </Form>
        </div>

        <div className="card">
          <h5 className="card-header">เวลาการจองมากที่สุด</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
              <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota-2})
                  }}>
                  -60
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota-1})
                  }}>
                  -30
                </Button>
                <span className="mt-3">{quota * 30} นาที</span>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota+1})
                  }}>
                  +30
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, quota: quota+2})
                  }}>
                  +60
                </Button>
              </span>
            </div>
        </div>

        <div className="card">
          <h5 className="card-header">จํานวนผู้จองขั้นตั่า</h5>
            <div className="card-body">
              <span className="d-flex justify-content-around">
              <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user-5})
                  }}>
                  -5
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user-1})
                  }}>
                  -1
                </Button>
                <span className="mt-3">{required_user} คน</span>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports, required_user: required_user+1})
                  }}>
                  +1
                </Button>
                <Button
                  variant="pink"
                  className="button"
                  onClick={() => {
                    setAddSports ({...addSports,required_user:required_user+5})
                  }}>
                  +5
                </Button>
              </span>
            </div>
        </div>

        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_sport(false)
              // add back staff here later
            }}
          >
            ยกเลิก
        </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_sport(false)
              set_temp_quota(quota)
              set_temp_required_user(required_user)
              set_show_error_page(true)
              handleError()
              // add back staff here later
            }}
          >
            เพิ่ม
        </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleError = () => {
    if (temp_quota <= 0 || temp_required_user <= 0) {
    return (
      <Modal
        show={show_error_page}
        onHide={() => {
          set_show_error_page(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ค่าที่ใส่มาไม่ถูกต้อง กรุณาเปลี่ยนใหม่อีกครั้ง</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_error_page(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
    } else {
      return(
        <Modal
        show={show_error_page}
        onHide={() => {
          set_show_error_page(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>สําเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ระบบได้ทําการเพิ่มกีฬาใหม่เข้าไปเรียบร้อยแล้ว</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_error_page(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
      )
    }
  }

  const handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((max_sport + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      set_page_no(next_page)
    }
  }

  const loadPagination = () => {
    let max_page: number = Math.floor((max_sport + 9) / 10)
    let numList: Array<number> = []
    let i = 0
    while (numList.length < 5) {
      let page = page_no + i - 2
      if (page >= 1 && page <= max_page) {
        numList.push(page)
      } else if (page > max_page) {
        break
      }
      i++
    }
    let elementList = numList.map((num) => {
      if (num === page_no)
        return (
          <Pagination.Item key={num} active={true}>
            {num}
          </Pagination.Item>
        )
      return (
        <Pagination.Item
          key={num}
          onClick={() => {
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
            handlePagination(page_no - 1)
          }}
        />
        {elementList}
        <Pagination.Next
          onClick={() => {
            handlePagination(page_no + 1)
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
            set_show_add_sport(true)
          }}>
            เพิ่มกีฬา
            </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      {addSport()}
      {deleteSport()}
      {editSport()}
      {handleError()}
    </div>
  )

}