import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import TimePicker from 'react-time-picker';


export default function CourtsSettings() {

  const [jwt, set_jwt] = useState<string>("")
  const [page_no, set_page_no] = useState<number>(1)
  const [max_court, set_max_court] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")

  const [show_add_court, set_show_add_court] = useState<boolean>(false)
  const [show_no_court, set_show_no_court] = useState<boolean>(false)
  const [show_edit_court, set_show_edit_court] = useState<boolean>(false)
  const [show_delete_court, set_show_delete_court] = useState<boolean>(false)

  const [temp_sport_name_th, set_temp_sport_name_th] = useState<string>("")
  const [temp_court_num, set_temp_court_num] = useState<number>(0)
  const [temp_open_time, set_temp_open_time] = useState<number>(0)
  const [temp_close_time, set_temp_close_time] = useState<number>(0)

  const [time, onChangeTime] = useState('00:00');

  const [court, setCourt] = useState([{
    _id: "",
    sport_name_th: "แบดมินตัน",
    sport_name_en: "",
    required_user: 5,
    quota: 2,
    list_court: [
      {
        court_num: 1,
        open_time: 0,
        close_time: 47,
      }, {
        court_num: 2,
        open_time: 1,
        close_time: 48,
      }]
  },
  {
    _id: "",
    sport_name_th: "ฟุตบอล",
    sport_name_en: "",
    required_user: 5,
    quota: 2,
    list_court: [
      {
        court_num: 3,
        open_time: 16,
        close_time: 23,
      }
    ]
  }])

  const [addCourt, setAddCourt] = useState({
    _id: "",
    sport_name_th: "",
    sport_name_en: "",
    required_user: 5,
    quota: 2,
    list_court: [
      {
        court_num: 1,
        open_time: 0,
        close_time: 47,
      }
    ],
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
    requestCourts()
  }, [jwt, page_no])

  const handleSearch = (firstinput) => {
    // send jwt and get //
    // if no user -> "user not found"
    firstinput.preventDefault()
    requestCourts()
  }

  const requestCourts = () => {
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
        set_max_court(data[0])
        setCourt(userList)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  const renderNoCourtsModal = () => {
    return (
      <Modal
        show={show_no_court}
        onHide={() => {
          set_show_no_court(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ไม่พบข้อมูลของคอร์ดสําหรับกีฬาชนิดนี้</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_no_court(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderCourtsTable = () => {
    let index = (page_no - 1) * 10 + 1
    let courtsList1 = court.map((court1) => {
      let courtsList2 = court1.list_court.map((court2) => {
        return (
          <tr key={index} className="tr-normal">
            <td> {court2.court_num} </td>
            <td> {court1.sport_name_th}</td>
            <td> {court2.open_time} </td>
            <td> {court2.close_time}</td>
            <td><Button
              className="btn-normal btn-outline-dark"
              variant="outline-black"
              onClick={() => {
                set_show_edit_court(true)
                set_temp_court_num(court2.court_num)
                set_temp_close_time(court2.close_time)
                set_temp_open_time(court2.open_time)
                set_temp_sport_name_th(court1.sport_name_th)
                editCourt()
              }}
            >
              แก้ไข
          </Button>
            </td>
            <td><Button
              className="btn-normal btn-outline-black"
              variant="outline-danger"
              onClick={() => {
                set_show_delete_court(true)
                deleteCourt()
              }}
            >
              ลบคอร์ด
          </Button></td>
          </tr>
        )
      })
      return courtsList2
    })
    return courtsList1
  }

  // const renderCourtsTable = () => {
  //   let index = (page_no - 1) * 10 + 1
  //   let courtsList1 = court.map((court) => {
  //       return (
  //         <tr key={index} className="tr-normal">
  //           <td> {court.list_court["court_num"]} </td>
  //           <td> </td>
  //           <td> {court.list_court["open_time"]} </td>
  //           <td> {court.list_court["close_time"]}</td>
  //           <td><Button
  //             className="btn-normal btn-outline-dark"
  //             variant="outline-black"
  //             onClick={() => {
  //               set_show_edit_court(true)
  //               editCourt()
  //             }}
  //           >
  //             แก้ไข
  //         </Button>
  //           </td>
  //           <td><Button
  //             className="btn-normal btn-outline-black"
  //             variant="outline-danger"
  //             onClick={() => {
  //               set_show_delete_court(true)
  //               deleteCourt()
  //             }}
  //           >
  //             ลบกีฬา
  //         </Button></td>
  //         </tr>
  //       )
  //   }
  //   )
  //   return courtsList1
  // }

  const editCourt = () => {
    return (
      <Modal
        show={show_edit_court}
        onHide={() => {
          set_show_edit_court(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดคอร์ด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>
          <p>เลขคอร์ด</p>
          <h6>{temp_court_num}</h6>
          <p>ประเภทกีฬา</p>
          <h6>{temp_sport_name_th}</h6>
          <Row>
            <Col>
              <p>เวลาเปิด</p>
              <TimePicker value={time} onChange={onChangeTime} disableClock={true} />
            </Col>
            <Col>
              <p>เวลาปิด</p>
              <TimePicker value={time} onChange={onChangeTime} disableClock={true} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_edit_court(false)
            }}
          // add back staff here later
          >
            ยกเลิก
        </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_edit_court(false)
              // add back staff here later
            }}
          >
            บันทึก
        </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  // const handleTimeChange = (e) => {
  //   setAddCourt({ ...addCourt, [e.target.id]: e.target.value })
  // }

  const deleteCourt = () => {
    return (
      <Modal
        show={show_delete_court}
        onHide={() => {
          set_show_delete_court(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบคอร์ดนี้ออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_court(false)
            }}
          // add back staff here later
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_court(false)
              // add back staff here later
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const addCourtFunc = () => {
    let { sport_name_th, list_court } = addCourt
    return (
      <Modal
        show={show_add_court}
        onHide={() => {
          set_show_add_court(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดของคอร์ด</Modal.Title>
        </Modal.Header>
        <div className="m-4">
          <Form>
            <Form.Group>
              <Row>
                <Form.Label>เลขคอร์ด</Form.Label>
                <Form.Control id="court_num" onChange={handleChangeAdd} value={list_court["court_num"]} />
              </Row>
              <Row>
                <Form.Label>ประเภทกีฬา</Form.Label>
                <Form.Control id="sport_name_th" onChange={handleChangeAdd} value={sport_name_th} />
              </Row>
              <Row>
                <Col>
                  <p>เวลาเปิด</p>
                  <TimePicker value={time} onChange={onChangeTime} disableClock={true} />
                </Col>
                <Col>
                  <p>เวลาปิด</p>
                  <TimePicker value={time} onChange={onChangeTime} disableClock={true} />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_court(false)
            }}
          // add back staff here later
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_court(false)
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
    setAddCourt({ ...addCourt, [e.target.id]: e.target.value })
  }


  const handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((max_court + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      set_page_no(next_page)
    }
  }

  const loadPagination = () => {
    let max_page: number = Math.floor((max_court + 9) / 10)
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
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>ประเภทกีฬา</Form.Label>
        <Form.Control as="select" custom defaultValue={0}>
          <option disabled>เลือกประเภทกีฬา</option>
          <option>1</option>
          <option>2</option>
        </Form.Control>
      </Form.Group>
      <Table responsive className="text-center" size="md">
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
          {renderNoCourtsModal()}
        </tbody>
      </Table>

      <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            set_show_add_court(true)
          }}>
            เพิ่มคอร์ด
            </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      {editCourt()}
      {deleteCourt()}
      {addCourtFunc()}
    </div>
  )
}