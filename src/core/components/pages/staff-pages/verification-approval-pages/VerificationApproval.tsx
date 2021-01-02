import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Table, Form, Col, Button, Pagination, Modal } from "react-bootstrap"
import { RouteComponentProps } from "react-router-dom"
import fetch from "../interfaces/axiosTemplate"
import { OtherInfo } from "../interfaces/InfoInterface"

const VeritificationApproval: FunctionComponent<RouteComponentProps> = (props) => {
  // page state
  const [jwt, setJwt] = useState<string>("")
  const [page_no, set_page_no] = useState<number>(1)
  const [max_user_per_page] = useState<number>(10) // > 1
  const [searchName, setSearchName] = useState<string>("")
  const [show_no_user, set_show_no_user] = useState<boolean>(false)
  const [users, setUsers] = useState<OtherInfo[]>([])

  /// functions ///
  useEffect(() => {
    // request token
    fetch({
      method: "GET",
      url: "/account_info/testing/adminToken",
    })
      .then(({ data }) => {
        setJwt(data.token.token)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const requestUsers = useCallback(() => {
    //  request users from server  //
    const begin = (page_no - 1) * max_user_per_page
    const end = page_no * max_user_per_page
    const additional_url = searchName === "" ? begin + "/" + end : searchName + "/" + begin + "/" + end
    fetch({
      method: "get",
      url: "/approval/" + additional_url,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(({ data }) => {
        const userList: OtherInfo[] = data
        let newUserList: OtherInfo[] = []
        for (const user of userList) {
          newUserList = [...newUserList, user]
        }
        setUsers(newUserList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [jwt, max_user_per_page, page_no, searchName])

  useEffect(() => {
    requestUsers()
  }, [requestUsers])

  const loadPagination = () => {
    return (
      <Pagination className="justify-content-md-end">
        <Pagination.Prev
          onClick={() => {
            handlePagination(page_no - 1)
          }}
        />
        <Pagination.Item active={true}>{page_no}</Pagination.Item>
        <Pagination.Next
          onClick={() => {
            handlePagination(page_no + 1)
          }}
        />
      </Pagination>
    )
  }

  // handles //
  const handlePagination = (next_page: number) => {
    if ((page_no > next_page && next_page >= 1) || (page_no < next_page && users.length === max_user_per_page)) {
      set_page_no(next_page)
    }
  }

  const handleSearch = (e) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    requestUsers()
  }

  const handleInfo = (e) => {
    //send jwt and username
    // if no data of that user -> show pop up
    const username = e.target.id
    fetch({
      method: "GET",
      url: "/approval/" + username,
      headers: {
        Authorization: "bearer " + jwt,
      },
    })
      .then(() => {
        props.history.push({
          pathname: "/verifyInfo/" + username,
        })
      })
      .catch(({ response }) => {
        if (response.data.message === "User not found") {
          set_show_no_user(true)
        } else {
          console.log(response)
        }
      })
  }

  // renders //
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
    const usersList = users.map((user, index) => {
      return (
        <tr key={index} className="tr-normal">
          <td className="font-weight-bold"> {index + 1} </td>
          <td> {user.name_en} </td>
          <td> {user.surname_en} </td>
          <td> {user.username} </td>
          <td>
            <Button className="btn-normal btn-outline-black" variant="outline-secondary" id={user.username} onClick={handleInfo}>
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
