import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import fetch from "../interfaces/axiosTemplate"
import "bootstrap/dist/css/bootstrap.min.css";

interface admin_and_staff {
  name: string
  surname: string
  username: string
  password: string
  is_admin: boolean
}

enum allStatus {
  สตาฟ,
  แอดมิน,
}

function StaffManagement() {
  const [page_no, set_page_no] = useState<number>(1)
  const [max_user, set_max_user] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [status, set_status] = useState<number>()
  const [jwt, set_jwt] = useState<string>("")
  const [show_no_staff, set_show_no_staff] = useState<boolean>(false)
  const [show_add_staff, set_show_add_staff] = useState<boolean>(false)
  const [show_change_staff, set_show_change_staff] = useState<boolean>(false)
  const [show_delete_staff, set_show_delete_staff] = useState<boolean>(false)
  const [show_pw_notif, set_show_pw_notif] = useState<boolean>(false)
  const [temp_status, set_temp_status] = useState()
  const [temp_password, set_temp_password] = useState<string>("")
  const [temp_recheckpassword, set_temp_recheckpassword] = useState<string>("")

  const [users, setUsers] = useState([
    {
      name: "Donald",
      surname: "Trump",
      username: "Chaina",
      is_admin: false,
    },
    {
      name: "Joe",
      surname: "Biden",
      username: "SleepyJoe",
      is_admin: false,
    },
  ])

  const [staffs, setStaffs] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
    recheckpassword: "",
    is_admin: true,
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
    requestStaffs()
  }, [jwt, page_no])

  const handleSearch = (firstinput) => {
    // send jwt and get //
    // if no user -> "user not found"
    firstinput.preventDefault()
    requestStaffs()
  }

  const requestStaffs = () => {
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
        set_max_user(data[0])
        setUsers(userList)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  const renderUsersTable = () => {
    let index = (page_no - 1) * 10 + 1
    let usersList = users.map((user) => {
      console.log(user.is_admin)
      if (user.is_admin = false) {
        return (
          <tr key={index} className="tr-normal">
            <td className="font-weight-bold"> {index++} </td>
            <td> {user.name} </td>
            <td> {user.surname} </td>
            <td> {user.username}</td>
            {/* <td> {user.account_type} </td> */}
            <td><div>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1" >
                  <Form.Control
                    as="select"
                    custom
                    defaultValue={0} onChange={(e) => sendHandleChangeStatus(e.target.value)}
                  >
                    <option value="สตาฟ">สตาฟ</option>
                    <option value="แอดมิน">แอดมิน</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            </td>
            <td><Button
              className="btn-normal btn-outline-black"
              variant="outline-danger"
              onClick={() => {
                set_show_delete_staff(true)
                deleteStaff()
              }}
            >
              ลบเจ้าหน้าที่
          </Button></td>
          </tr>
        )
      } else {
        return (
          <tr key={index} className="tr-normal">
            <td className="font-weight-bold"> {index++} </td>
            <td> {user.name} </td>
            <td> {user.surname} </td>
            <td> {user.username}</td>
            {/* <td> {user.account_type} </td> */}
            <td><div>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1" >
                  <Form.Control
                    as="select"
                    custom
                    defaultValue={0} onChange={(e) => sendHandleChangeStatus(e.target.value)}
                  >
                    <option value="สตาฟ">แอดมิน</option>
                    <option value="แอดมิน">สตาฟ</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            </td>
            <td><Button
              className="btn-normal btn-outline-black"
              variant="outline-danger"
              onClick={() => {
                set_show_delete_staff(true)
                deleteStaff()
              }}
            >
              ลบเจ้าหน้าที่
          </Button></td>
          </tr>
          )}

    })
    return usersList
  }

  const sendHandleChangeStatus = (value) => {
    set_show_change_staff(true)
    set_temp_status(value)
    handleChangeStatus()
  }

  const handleChangeStatus = () => {
    return (
      <Modal
        show={show_change_staff}
        onHide={() => {
          set_show_change_staff(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะเปลี่ยนสถานะของพนักงานเป็น{temp_status} ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_change_staff(false)
              console.log("SEND THIS TO BACKEND" + temp_status)
              window.location.reload()

            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const deleteStaff = () => {
    return (
      <Modal
        show={show_delete_staff}
        onHide={() => {
          set_show_delete_staff(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>คําเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ท่านกําลังจะลบเจ้าหน้าที่ออกจากระบบ ต้องการดําเนินต่อใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_staff(false)
            }}
          // add back staff here later
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_delete_staff(false)
              // add back staff here later
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const addStaff = () => {
    let { name, surname, username, password, recheckpassword, is_admin } = staffs
    return (
      <Modal
        show={show_add_staff}
        onHide={() => {
          set_show_add_staff(false)
        }}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มพนักงาน</Modal.Title>
        </Modal.Header>
        <div className="m-4">
          <Form>
            <Form.Group>
              <Row>
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control id="name" onChange={handleChangeAdd} value={name} />
              </Row>
              <Row>
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control id="surname" onChange={handleChangeAdd} value={surname} />
              </Row>
              <Row>
                <Form.Label>ชื่อผู้ใช้</Form.Label>
                <Form.Control id="username" onChange={handleChangeAdd} value={username} />
              </Row>
              <Row>
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control id="password" onChange={handleChangeAdd} value={password} />

              </Row>
              <Row>
                <Form.Label>กรอกรหัสผ่านอีกครั้ง</Form.Label>
                <Form.Control id="recheckpassword" onChange={handleChangeAdd} value={recheckpassword} />
              </Row>
              <Row>
                <Form.Label>ประเภท</Form.Label>
                <Form.Control
                  as="select"
                  custom
                >
                  <option disabled value="ประเภท">ประเภท</option>
                  <option value="สตาฟ">สตาฟ</option>
                  <option value="แอดมิน">แอดมิน</option>
                </Form.Control>
              </Row>
            </Form.Group>
          </Form>
        </div>
        <Modal.Footer>
          <Button
            variant="outline-pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_staff(false)
              // add back staff here later
            }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_add_staff(false)
              set_show_pw_notif(true)
              set_temp_password(password)
              set_temp_recheckpassword(recheckpassword)
              checkPassword()
              // add back staff here later
              // need to check whether password is matching before sending!
            }}
          >
            เพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const checkPassword = () => {
    console.log(temp_password)
    console.log(temp_recheckpassword)
    if (temp_password !== temp_recheckpassword) {
      return (
        <Modal
          show={show_pw_notif}
          onHide={() => {
            set_show_pw_notif(false)
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>คําเตือน</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontWeight: "lighter" }}>รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง</Modal.Body>
          <Modal.Footer>
            <Button
              variant="pink"
              className="btn-normal"
              onClick={() => {
                set_show_pw_notif(false)
                console.log(temp_password)
              }}
            >
              ตกลง
          </Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return (
        <Modal
          show={show_pw_notif}
          onHide={() => {
            set_show_pw_notif(false)
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>สําเร็จ</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontWeight: "lighter" }}>ระบบได้ทําการเพิ่มพนักงานใหม่เข้าไปเรียบร้อยแล้ว</Modal.Body>
          <Modal.Footer>
            <Button
              variant="pink"
              className="btn-normal"
              onClick={() => {
                set_show_pw_notif(false)
                console.log(temp_recheckpassword)
              }}
            >
              ตกลง
          </Button>
          </Modal.Footer>
        </Modal>
      )
    }
  }

  const handleChangeAdd = (e) => {
    setStaffs({ ...staffs, [e.target.id]: e.target.value })
  }

  const renderNoStaffModal = () => {
    return (
      <Modal
        show={show_no_staff}
        onHide={() => {
          set_show_no_staff(false)
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
              set_show_no_staff(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((max_user + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      set_page_no(next_page)
    }
  }

  const loadPagination = () => {
    let max_page: number = Math.floor((max_user + 9) / 10)
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
    <div className="allStaff" style={{ margin: "20px" }}>
      <Form onSubmit={handleSearch} className="mb-2">
        <Form.Row className="justify-content-end align-items-center">
          <Col md="auto">
            <Form.Label className="mb-0 font-weight-bold"> ค้นหาสตาฟ </Form.Label>
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
            <Form.Control
              onChange={(e) => {
                set_status(parseInt(e.target.value))
              }}
              as="select"
              custom
              defaultValue={0}
            >
              <option disabled value={allStatus.สตาฟ}>
                สถานะ
              </option>
              <option value={allStatus.สตาฟ}>สตาฟ</option>
              <option value={allStatus.แอดมิน}>แอดมิน</option>
            </Form.Control>
          </Col>
          <Button variant="pink" className="py-1 btn-normal" onClick={handleSearch}>
            ค้นหา
          </Button>
        </Form.Row>
      </Form>
      <Table responsive className="text-center" size="md">
        <thead className="bg-light">
          <tr className="tr-pink">
            <th>#</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ชื่อผู้ใช้</th>
            <th>ประเภท</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderUsersTable()}
          {renderNoStaffModal()}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button variant="pink" className="btn-normal" onClick={() => {
            set_show_add_staff(true)
          }}>
            เพิ่มสตาฟ
            </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      {addStaff()}
      {deleteStaff()}
      {handleChangeStatus()}
      {renderNoStaffModal()}
      {checkPassword()}
    </div>
  )
}

export default StaffManagement;