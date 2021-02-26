import React, { FunctionComponent, useState, useEffect, useCallback } from "react"
import { Table, Form, Col, Button, Modal } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { Other } from "../../../../contexts/UsersContext"
import { client } from "../../../../../axiosConfig"
import { AxiosResponse } from "axios"
import { VerifyInfoRes, VerifyListRes } from "../../../../dto/verification.dto"
import PaginationComponent from "../list-of-all-users-pages/PaginationComponent"
import { renderLoading } from "../list-of-all-users-pages/ListOfAllUsers"

interface requestParams {
  start: number
  end: number
  name: string
  searchType: string // extension or approval
}

type SearchType = "ทั้งหมด" | "ผู้สมัครใหม่" | "การต่ออายุสมาชิก"

const VeritificationApproval: FunctionComponent = () => {
  // page state
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pageNo, setPageNo] = useState<number>(1)
  const [maxUserPerPage] = useState<number>(10) // > 1
  const [maxUser, setMaxUser] = useState<number>(1)
  const [searchName, setSearchName] = useState<string>("")
  const [searchType, setSearchType] = useState<SearchType>("ทั้งหมด")
  const [showNoUser, setShowNoUser] = useState<boolean>(false)
  const [users, setUsers] = useState<VerifyInfoRes[]>([])
  const history = useHistory()

  // other functions //
  const requestUsers = useCallback(() => {
    //  request users from server  //
    const params: Partial<requestParams> = {
      start: (pageNo - 1) * maxUserPerPage,
      end: pageNo * maxUserPerPage,
    }
    if (searchName !== "") params.name = searchName
    switch (searchType) {
      case "ผู้สมัครใหม่":
        params.searchType = "approval"
        break
      case "การต่ออายุสมาชิก":
        params.searchType = "extension"
        break
    }
    client({
      method: "GET",
      url: "/approval",
      params: params,
    })
      .then(({ data }: AxiosResponse<VerifyListRes>) => {
        setUsers(data[1])
        setMaxUser(data[0])
        setIsLoading(false)
      })
      .catch(({ response }) => {
        if (response && response.data.statusCode === 401) history.push("/staff")
      })
  }, [history, maxUserPerPage, pageNo, searchName, searchType])

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

  const handleSearchType = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const type = target.id
    if (searchType !== type) setSearchType(type as SearchType)
  }

  const handleInfo = (e: React.MouseEvent<HTMLElement>) => {
    // send jwt and username
    // if no data of that user -> show pop up
    const target = e.target as HTMLElement
    const _id = target.id
    client
      .get<Other>(`/approval/${_id}`)
      .then(({ data }) => {
        if (data.verification_status === "Verified" && data.payment_status === "Submitted") history.push("/staff/verifyExtend/" + _id)
        // extension
        else history.push("/staff/verifyInfo/" + _id)
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
  const renderTopSection = (
    <Form onSubmit={handleSearch} className="mb-2">
      <Form.Row className="justify-content-end align-items-center">
        <Col md="auto">
          <Button
            id="ทั้งหมด"
            variant={searchType === "ทั้งหมด" ? "pink" : "light"}
            className={searchType === "ทั้งหมด" ? "btn-normal mr-2" : "btn-normal btn-outline-black mr-2 border"}
            onClick={handleSearchType}
          >
            ทั้งหมด
          </Button>
          <Button
            id="ผู้สมัครใหม่"
            variant={searchType === "ผู้สมัครใหม่" ? "pink" : "light"}
            className={searchType === "ผู้สมัครใหม่" ? "btn-normal mr-2" : "btn-normal btn-outline-black mr-2 border"}
            onClick={handleSearchType}
          >
            ผู้สมัครใหม่
          </Button>
          <Button
            id="การต่ออายุสมาชิก"
            variant={searchType === "การต่ออายุสมาชิก" ? "pink" : "light"}
            className={searchType === "การต่ออายุสมาชิก" ? "btn-normal mr-4" : "btn-normal btn-outline-black mr-4 border"}
            onClick={handleSearchType}
          >
            การต่ออายุสมาชิก
          </Button>
        </Col>
        <Col md="auto">
          <Form.Label className="mb-0 font-weight-bold"> ค้นหา </Form.Label>
        </Col>
        <Col>
          <Form.Control
            className="border"
            style={{ backgroundColor: "white" }}
            type="text"
            id="searchName"
            placeholder=" ค้นหาชื่อ "
            onChange={(e) => {
              setSearchName(e.target.value)
            }}
          />
        </Col>
        <Col md="auto">
          <Button variant="pink" className="py-1 btn-normal" onClick={handleSearch}>
            ค้นหา
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )

  const renderNoUserModal = (
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
    <>
      <div className="verifyApp my-4 ml-1 mr-3" style={{ display: isLoading ? "none" : "block" }}>
        {renderTopSection}
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
            {renderNoUserModal}
          </tbody>
        </Table>
        <div className="text-right">
          <PaginationComponent pageNo={pageNo} setPageNo={setPageNo} maxUser={maxUser} maxUserPerPage={maxUserPerPage} />
        </div>
      </div>
      {renderLoading(isLoading)}
    </>
  )
}

export default VeritificationApproval
