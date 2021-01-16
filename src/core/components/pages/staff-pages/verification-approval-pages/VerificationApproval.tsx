import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Table, Form, Col, Button, Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { AxiosResponse } from "axios"
import { VerifyInfoRes, VerifyListRes } from "../../../../dto/verification.dto"
import PaginationComponent from "../list-of-all-users-pages/PaginationComponent"

interface RejectedInfo {
  start: number
  end: number
  name: string
}

const VeritificationApproval: FunctionComponent = () => {
  // page state
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUserPerPage] = useState<number>(10) // > 1
  const [maxUser, setMaxUser] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [showNoUser, setShowNoUser] = useState<boolean>(false)
  const [users, setUsers] = useState<VerifyInfoRes[]>([])
  const history = useHistory()

  // other functions //
  const requestUsers = useCallback(() => {
    //  request users from server  //
    const params: Partial<RejectedInfo> = {
      start: (pageNo - 1) * maxUserPerPage,
      end: pageNo * maxUserPerPage,
    }
    if (searchName !== "") params["name"] = searchName
    client({
      method: "GET",
      url: "/approval",
      params: params,
    })
      .then(({ data }: AxiosResponse<VerifyListRes>) => {
        setUsers(data[1])
        setMaxUser(data[0])
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [history, maxUserPerPage, pageNo, searchName])

  /// useEffects ///
  useEffect(() => {
    requestUsers()
  }, [requestUsers])

  const handleSearch = (e: React.FormEvent) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    if (pageNo !== 1) setPageNo(1)
    else requestUsers()
  }

  const handleInfo = (e: React.MouseEvent<HTMLElement>) => {
    // send jwt and username
    // if no data of that user -> show pop up
    const target = e.target as HTMLElement
    const _id = target.id
    client({
      method: "GET",
      url: "/approval/" + _id,
    })
      .then(() => {
        history.push("/staff/verifyInfo/" + _id)
      })
      .catch(({ response }) => {
        if (response.data.message === "User not found") {
          setShowNoUser(true)
        } else {
          console.log(response)
        }
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
    let id = 1
    const usersList = users.map((user) => {
      return (
        <tr key={id} className="tr-normal">
          <td className="font-weight-bold"> {id++} </td>
          <td> {user.name_th} </td>
          <td> {user.surname_th} </td>
          <td> {user.username} </td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={user._id} onClick={handleInfo}>
              ดูรายละเอียด
            </Button>
          </td>
        </tr>
      )
    })
    return usersList
  }

  return (
    <div className="verifyApp" style={{ margin: "20px" }}>
      <Form onSubmit={handleSearch} className="mb-2">
        <Form.Row className="justify-content-end align-items-center">
          <Col md="auto">
            <Form.Label className="mb-0 font-weight-bold"> ค้นหาชื่อ </Form.Label>
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
          <Button variant="pink" className="py-1 btn-normal" onClick={handleSearch}>
            ค้นหา
          </Button>
        </Form.Row>
      </Form>
      <Table className="text-center" responsive size="md">
        <thead className="bg-light">
          <tr className="tr-pink">
            <th>#</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ชื่อผู้ใช้</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {renderUsersTable()}
          {renderNoUserModal()}
        </tbody>
      </Table>
      <div className="text-right">
        <PaginationComponent pageNo={pageNo} setPageNo={setPageNo} maxUser={maxUser} maxUserPerPage={maxUserPerPage} />
      </div>
    </div>
  )
}

export default VeritificationApproval
