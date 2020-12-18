import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import fetch from "../interfaces/axiosTemplate"

interface CUTemplate {
  account_type: Account
  is_thai_language: boolean
  is_first_login: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  is_penalize: boolean
  _id: string
}

interface OtherTemplate {
  account_type: Account
  reject_info: string[]
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  is_penalize: boolean
  _id: string
}

interface SatitTemplate {
  account_type: Account
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  password: string
  is_penalize: boolean
  _id: string
}

type Users = (CUTemplate | SatitTemplate | OtherTemplate)[]

enum allStatus {
  All,
  Normal,
  Banned,
}

enum Account {
  CuStudent,
  SatitAndCuPersonel,
  Other,
}

const ListOfAllUsers: FunctionComponent<RouteComponentProps> = (props) => {
  // page state
  const [page_no, set_page_no] = useState<number>(1)
  const [max_user, set_max_user] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [status, set_status] = useState<number>(allStatus.All)
  const [jwt, set_jwt] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmQyNjY3YjU2ZWVjMDBlZTY3MDQ5NmQiLCJpc1N0YWZmIjp0cnVlLCJpYXQiOjE2MDc2MjQzMTUsImV4cCI6MTYwODg2Njk5Nn0.2WHWeijrF6TC7HWjkjp44wrj5XKEXmuh2_L9lk9zoAM"
  )
  const [show_no_user, set_show_no_user] = useState<boolean>(false)
  const [users, setUsers] = useState<Users>([
    {
      account_type: Account.CuStudent,
      is_thai_language: true,
      name_th: "",
      surname_th: "",
      name_en: "",
      surname_en: "",
      username: "",
      is_penalize: true,
      is_first_login: false,
      _id: "",
    },
  ])

  // useEffect //
  // useEffect(() => {
  //   // request token
  //   fetch({
  //     method: "GET",
  //     url: "/account_info/testing/adminToken",
  //   })
  //     .then(({ data }) => {
  //       set_jwt(data.token.token)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    requestUsers()
  }, [jwt, page_no])

  const requestUsers = () => {
    // Send JWT //
    // get params for request //
    let param_data = {
      begin: (page_no - 1) * 10,
      end: page_no * 10,
    }
    if (searchName !== "") param_data["name"] = searchName
    if (status !== allStatus.All) param_data["penalize"] = allStatus.Banned === status
    //  request users from server  //
    fetch({
      method: "GET",
      url: "/list-all-user/getUser",
      headers: {
        Authorization: "bearer " + jwt,
      },
      params: param_data,
    })
      .then(({ data }) => {
        // console.log(data)
        let userList = data[1].map((user) => {
          if (user.account_type === "CuStudent") return { ...user, account_type: Account.CuStudent }
          else if (user.account_type === "SatitAndCuPersonel") return { ...user, account_type: Account.SatitAndCuPersonel }
          return { ...user, account_type: Account.Other }
        })
        set_max_user(data[0])
        setUsers(userList)
      })
      .catch(({ response }) => {
        console.log(response)
      })
  }

  // handles //
  const handleSearch = (e) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    if (page_no !== 1) set_page_no(1)
    else requestUsers()
  }

  const handleInfo = (e) => {
    //send jwt and username
    // if no data of that user -> show pop up
    let index = parseInt(e.target.id) - 1
    let _id: String = users[index]._id
    fetch({
      method: "GET",
      url: "/list-all-user/findById/" + _id,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(({ data }) => {
        if (data) {
          let account_type: Account = users[index].account_type
          if (account_type === Account.CuStudent) {
            props.history.push({
              pathname: "/cuInfo/" + _id,
            })
          } else {
            props.history.push({
              pathname: "/userInfo/" + _id,
            })
          }
        } else {
          set_show_no_user(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
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

  const renderNoUserModal = () => {
    return (
      <Modal
        show={show_no_user}
        onHide={() => {
          set_show_no_user(false)
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>เกิดข้อผิดพลาด</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "lighter" }}>ไม่พบข้อมูลของผู้ใช้คนนี้</Modal.Body>
        <Modal.Footer>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              set_show_no_user(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderUsersTable = () => {
    let index = (page_no - 1) * 10 + 1
    // let user
    let usersList = users.map((user) => {
      // if (current_user.account_type === Account.CuStudent) {
      //   user = current_user as CUTemplate
      // } else if (current_user.account_type === Account.Other) {
      //   user = current_user as OtherTemplate
      // } else {
      //   user = current_user as SatitTemplate
      // }
      return (
        <tr key={index} className="tr-normal">
          <td className="font-weight-bold"> {index} </td>
          <td> {user.name_th} </td>
          <td> {user.surname_th} </td>
          <td> {user.username} </td>
          <td> {user.is_penalize ? "โดนแบน" : "ปกติ"} </td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={String(index++)} onClick={handleInfo}>
              ดูข้อมูล
            </Button>
          </td>
        </tr>
      )
    })
    return usersList
  }

  return (
    <div className="allUsers" style={{ margin: "20px" }}>
      <Form onSubmit={handleSearch} className="mb-2">
        <Form.Row className="justify-content-end align-items-center">
          <Col md="auto">
            <Form.Label className="mb-0 font-weight-bold"> ค้นหาผู้ใช้ </Form.Label>
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
              <option disabled value={allStatus.All}>
                สถานะ
              </option>
              <option value={allStatus.All}>ทั้งหมด</option>
              <option value={allStatus.Normal}>ปกติ</option>
              <option value={allStatus.Banned}>โดนแบน</option>
            </Form.Control>
          </Col>
          <Button variant="pink" className="ml-3 py-1 btn-normal" onClick={handleSearch}>
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
            <th>สถานะ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderUsersTable()}
          {renderNoUserModal()}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Link to="/addUser">
            <Button variant="pink" className="btn-normal">
              เพิ่มผู้ใช้
            </Button>
          </Link>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
    </div>
  )
}

export default ListOfAllUsers
