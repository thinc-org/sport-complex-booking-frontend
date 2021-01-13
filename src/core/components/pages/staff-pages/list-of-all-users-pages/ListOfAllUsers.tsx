import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Table, Form, Row, Col, Button, Modal } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { AxiosResponse } from "axios"
import { Account, UserInfoRes, UserListRes } from "../../../../dto/listOfAllUsers.dto"
import PaginationComponent from "./PaginationComponent"

enum allStatus {
  All,
  Normal,
  Banned,
}

interface ParamsDataRequest {
  begin: number
  end: number
  name: string
  surname: string
  penalize: boolean
}

const ListOfAllUsers: FunctionComponent = () => {
  // page state
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUser, setMaxUser] = useState<number>(1) //fix
  const [maxUserPerPage] = useState<number>(10) // > 1
  const [searchName, setSearchName] = useState<string>("")
  const [status, setStatus] = useState<number>(allStatus.All)
  const [showNoUser, setShowNoUser] = useState<boolean>(false)
  const [users, setUsers] = useState<UserInfoRes[]>([]) //fix

  const history = useHistory()

  const requestUsers = useCallback(() => {
    // get params for request //
    const param_data: Partial<ParamsDataRequest> = {
      begin: (pageNo - 1) * maxUserPerPage,
      end: pageNo * maxUserPerPage,
    }
    if (searchName !== "") param_data.name = searchName
    if (status !== allStatus.All) param_data.penalize = allStatus.Banned === status
    //  request users from server  //
    client({
      method: "GET",
      url: "/list-all-user/filter",
      params: param_data,
    })
      .then(({ data }: AxiosResponse<UserListRes>) => {
        const userList = data[1].map((user) => {
          if (user.account_type === "CuStudent") return { ...user, account_type: Account.CuStudent, _id: "" }
          else if (user.account_type === "SatitAndCuPersonel") return { ...user, account_type: Account.SatitAndCuPersonel, _id: "" }
          return { ...user, account_type: Account.Other, _id: "" }
        })
        setMaxUser(data[0])
        setUsers(userList)
      })
      .catch(({ response }) => {
        console.log(response)
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [history, maxUserPerPage, pageNo, searchName, status])

  // useEffect //
  useEffect(() => {
    requestUsers()
  }, [requestUsers])

  // handles //
  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    if (pageNo !== 1) setPageNo(1)
    else requestUsers()
  }

  const handleInfo = (e: React.MouseEvent<HTMLElement>) => {
    //send username
    // if no data of that user -> show pop up
    const target = e.target as HTMLElement
    const index = parseInt(target.id) - (pageNo - 1) * 10 - 1
    const _id: string = users[index]._id
    client({
      method: "GET",
      url: "/list-all-user/id/" + _id,
    })
      .then(({ data }) => {
        if (data) {
          const account_type: Account = users[index].account_type
          if (account_type === Account.CuStudent) {
            history.push(`/staff/userInfo/custudent/${_id}`)
          } else if (account_type === Account.SatitAndCuPersonel) {
            history.push(`/staff/userInfo/satit/${_id}`)
          } else {
            history.push(`/staff/userInfo/other/${_id}`)
          }
        } else {
          setShowNoUser(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // renders //
  const renderNoUserModal = () => {
    return (
      <Modal
        show={showNoUser}
        onHide={() => {
          setShowNoUser(false)
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
              setShowNoUser(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderUsersTable = () => {
    let index = (pageNo - 1) * 10 + 1
    const usersList = users.map((user) => {
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
              as="select"
              custom
              defaultValue={0}
              style={{ backgroundColor: "white" }}
              onChange={(e) => {
                setStatus(parseInt(e.target.value))
              }}
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
          <Link to="/staff/addUser">
            <Button variant="pink" className="btn-normal">
              เพิ่มผู้ใช้
            </Button>
          </Link>
        </Col>
        <Col>
          <PaginationComponent pageNo={pageNo} setPageNo={setPageNo} maxUser={maxUser} maxUserPerPage={maxUserPerPage} />
        </Col>
      </Row>
    </div>
  )
}

export default ListOfAllUsers
