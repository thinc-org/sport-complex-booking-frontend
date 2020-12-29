import React, { FunctionComponent, useState, useEffect } from "react"
import { Table, Form, Col, Button, Pagination, Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { client } from "../../../../../axiosConfig"
import { OtherInfo } from "../interfaces/InfoInterface"

const VeritificationApproval: FunctionComponent = () => {
  // page state
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUserPerPage] = useState<number>(10) // > 1
  const [maxUser, setMaxUser] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [showNoUser, setShowNoUser] = useState<boolean>(false)
  const [users, setUsers] = useState<OtherInfo[]>([])

  const history = useHistory()

  /// useEffects ///
  useEffect(() => {
    requestUsers()
  }, [pageNo])

  // other functions //
  const requestUsers = () => {
    //  request users from server  //
    let params = {
      start: (pageNo - 1) * maxUserPerPage,
      end: pageNo * maxUserPerPage,
    }
    if (searchName !== "") params["name"] = searchName
    client({
      method: "GET",
      url: "/approval",
      params: params,
    })
      .then(({ data }) => {
        let userList: OtherInfo[] = data[1]
        let newUserList: OtherInfo[] = []
        for (let user of userList) {
          newUserList = [...newUserList, user]
        }
        setUsers(newUserList)
        setMaxUser(data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const loadPagination = () => {
    let max_page: number = Math.floor((maxUser + maxUserPerPage - 1) / maxUserPerPage)
    let numList: Array<number> = []
    let haveMore = true
    let i = 0
    while (numList.length < 5) {
      let page = pageNo + i - 2
      if (page >= max_page) haveMore = false
      if (page >= 1 && page <= max_page) numList.push(page)
      else if (page > max_page) break
      i++
    }
    let elementList = numList.map((num) => {
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
            handlePagination(num)
          }}
        >
          {num}
        </Pagination.Item>
      )
    })
    if (haveMore) elementList.push(<Pagination.Ellipsis key={max_page + 1} />)
    return (
      <Pagination className="justify-content-md-end">
        <Pagination.Prev
          onClick={() => {
            handlePagination(pageNo - 1)
          }}
        />
        {elementList}
        <Pagination.Next
          onClick={() => {
            handlePagination(pageNo + 1)
          }}
        />
      </Pagination>
    )
  }

  // handles //
  const handlePagination = (next_page: number) => {
    let max_page: number = Math.floor((maxUser + maxUserPerPage - 1) / maxUserPerPage)
    if (next_page >= 1 && next_page <= max_page) {
      setPageNo(next_page)
    }
  }

  const handleSearch = (e) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    if (pageNo !== 1) setPageNo(1)
    else requestUsers()
  }

  const handleInfo = (e) => {
    //send jwt and username
    // if no data of that user -> show pop up
    let _id = e.target.id
    client({
      method: "GET",
      url: "/approval/" + _id,
    })
      .then(({ data }) => {
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
    let usersList = users.map((user) => {
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
      <div className="text-right">{loadPagination()}</div>
    </div>
  )
}

export default VeritificationApproval
