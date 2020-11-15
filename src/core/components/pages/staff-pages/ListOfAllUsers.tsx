import React, { Component } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"

interface CUTemplate {
  account_type: Account
  is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
  personal_email: string
  phone: string
  is_penalize: boolean
  expired_penalize_date: Date
  is_first_login: boolean
}

interface OtherTemplate {
  account_type: Account
  is_thai_language: boolean
  name: string
  surname: string
  username: string
  is_penalize: boolean
}

interface SatitTemplate {
  account_type: Account
  is_thai_language: boolean
  name: string
  surname: string
  personal_email: string
  phone: string
  username: string
  password: string
  is_penalize: boolean
  expired_penalize_date: Date
}

interface stateTemplate {
  page_no: number
  max_user: number
  // show: boolean;
  searchName: string
  status: allStatus
  users: (CUTemplate | SatitTemplate | OtherTemplate)[]
}

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

enum Verification {
  NotSubmitted,
  Submitted,
  Verified,
  Rejected,
}

class ListOfAllUsers extends Component<RouteComponentProps, {}> {
  state: stateTemplate = {
    page_no: 1,
    max_user: 69,
    // show: false,
    searchName: "",
    status: allStatus.All,
    users: [
      {
        account_type: Account.CuStudent,
        is_thai_language: true,
        name_th: "นายอิอิ",
        surname_th: "อิอิ",
        name_en: "beam",
        surname_en: "eiei",
        username: "b1",
        personal_email: "eiei@",
        phone: "101",
        is_penalize: true,
        expired_penalize_date: new Date(),
        is_first_login: false,
      },
      {
        account_type: Account.Other,
        is_thai_language: true,
        name: "black",
        surname: "burst",
        username: "b2",
        is_penalize: false,
      },
      {
        account_type: Account.Other,
        is_thai_language: false,
        name: "b",
        surname: "but",
        username: "b3",
        is_penalize: true,
      },
    ],
  }

  // showPopUp = () => {
  //       this.setState({ ['show']: true })
  // }

  // closePopUp = () => {
  //       this.setState({ ['show']: false })
  // }

  shouldComponentUpdate(nextProp, nextState) {
    // re-render when page_no, status, users change
    let { page_no, status, users } = this.state
    if (page_no !== nextState.page_no || status != nextState.status || users != nextState.users) return true
    return false
  }

  requestUsers = () => {
    // Send JWT //

    // get params for request //
    let { page_no, searchName, status } = this.state
    let param = {
      first: (page_no - 1) * 10,
      last: page_no * 10 - 1,
    }
    if (searchName !== "") param["name"] = searchName
    if (status != allStatus.All) param["is_penalize"] = allStatus.Banned == status
    //  request users from server  //
    axios({
      method: "get",
      url: "/listOfAllUsers",
      params: param,
    })
      .then((res) => {
        console.log(res.data)
        // let users = ;
        // let max_user: number = ;
        // this.setState({
        //       ['users']: users,
        //       ['max_user']: max_user
        // })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleChangeStatus = (e) => {
    this.setState({
      status: e.target.value,
    })
  }

  handleSearch = (e) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    this.forceUpdate()
  }

  handleInfo = (e) => {
    //send jwt and username
    // if no data of that user -> show pop up
    let index = parseInt(e.target.id) - 1
    let username: String = this.state.users[index].username
    let account_type: Account = this.state.users[index].account_type
    if (account_type === Account.CuStudent) {
      this.props.history.push({
        pathname: "/cuInfo/" + username,
        // state: this.state.users,
      })
    } else {
      this.props.history.push({
        pathname: "/userInfo/" + username,
        // state: this.state.users,
      })
    }
  }

  handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((this.state.max_user + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      this.setState({ ["page_no"]: next_page })
      // this.forceUpdate()
    }
  }

  loadPagination = () => {
    let { page_no } = this.state
    let max_page: number = Math.floor((this.state.max_user + 9) / 10)
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
      if (num === page_no) return <Pagination.Item active={true}>{num}</Pagination.Item>
      return (
        <Pagination.Item
          key={num}
          onClick={() => {
            this.handlePagination(num)
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
            this.handlePagination(page_no - 1)
          }}
        />
        {elementList}
        <Pagination.Next
          onClick={() => {
            this.handlePagination(page_no + 1)
          }}
        />
      </Pagination>
    )
  }

  renderUsersTable = () => {
    this.requestUsers()
    let id = (this.state.page_no - 1) * 10 + 1
    let user
    let usersList = this.state.users.map((current_user) => {
      if (current_user.account_type === Account.CuStudent) {
        user = current_user as CUTemplate
      } else if (current_user.account_type === Account.Other) {
        user = current_user as OtherTemplate
      } else {
        user = current_user as SatitTemplate
      }
      return (
        <tr key={id} className="tr-normal">
          <td className="font-weight-bold"> {id} </td>
          <td> {user.account_type === Account.CuStudent ? user.name_th : user.name} </td>
          <td> {user.account_type === Account.CuStudent ? user.surname_th : user.surname} </td>
          <td> {user.username} </td>
          <td> {user.is_penalize ? "โดนแบน" : "ปกติ"} </td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={String(id++)} onClick={this.handleInfo}>
              ดูข้อมูล
            </Button>
          </td>
        </tr>
      )
    })
    return usersList
  }

  render() {
    // console.log("re-rendered")
    // console.log(this.state)
    return (
      <div className="allUsers" style={{ margin: "20px" }}>
        <Form onSubmit={this.handleSearch} style={{ height: "50px" }}>
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
                onChange={this.handleChangeInput}
              />
            </Col>
            <Col sm="auto">
              <Form.Control onChange={this.handleChangeStatus} as="select" custom defaultValue={0}>
                <option disabled value={allStatus.All}>
                  สถานะ
                </option>
                <option value={allStatus.All}>ทั้งหมด</option>
                <option value={allStatus.Normal}>ปกติ</option>
                <option value={allStatus.Banned}>โดนแบน</option>
              </Form.Control>
            </Col>
            <Button variant="pink" className="py-1 btn-normal" onClick={this.handleSearch}>
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
          <tbody>{this.renderUsersTable()}</tbody>
        </Table>
        <Row>
          <Col>
            <Link to="/addUser">
              <Button variant="pink" className="btn-normal">
                เพิ่มผู้ใช้
              </Button>
            </Link>
          </Col>
          <Col>{this.loadPagination()}</Col>
        </Row>
        {/* <Modal show={this.state.show} onHide={this.closePopUp} backdrop="static" keyboard={false} >
                              <Modal.Header closeButton>
                                    <Modal.Title>คำเตือน</Modal.Title>
                              </Modal.Header>
                              <Modal.Body> ไม่พบข้อมูล </Modal.Body>
                              <Modal.Footer>
                                    <Button variant="secondary" onClick={this.closePopUp}>ยกเลิก</Button>
                                    <Button variant="primary" onClick={this.closePopUp}>ตกลง</Button>
                              </Modal.Footer>
                        </Modal> */}
      </div>
    )
  }
}

export default ListOfAllUsers
