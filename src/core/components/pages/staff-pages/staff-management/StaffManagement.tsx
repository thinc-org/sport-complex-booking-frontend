import React, { useState, useEffect, useCallback } from "react"
import { Table, Form, Row, Col, Button, Pagination, Modal } from "react-bootstrap"
import { client } from "../../../../../axiosConfig"
import { AdminAndStaff, StaffResponse } from "../../../../dto/staffManagement.dto"
import { DeleteStaffModal, EditStaffModal, AddStaffModal, HandleErrorModal } from "./StaffManagementComponents"

export default function StaffManagement() {
  const [type, set_type] = useState("")
  const [pageNo, setPageNo] = useState(1)
  const [maxStaff, setMaxStaff] = useState(1)
  const [searchName, setSearchName] = useState("")
  const [showNoStaff, setShowNoStaff] = useState(false)
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [showDeleteStaff, setShowDeleteStaff] = useState(false)
  const [showEditStaff, setShowEditStaff] = useState(false)
  const [showError, setShowError] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<AdminAndStaff>({
    _id: "",
    name: "",
    surname: "",
    username: "",
    is_admin: true,
  })

  const [staffs, setStaffs] = useState<AdminAndStaff[]>([
    {
      _id: "",
      name: "",
      surname: "",
      username: "",
      is_admin: true,
    },
  ])

  const requestStaffs = useCallback(
    (query?: string, type?: string) => {
      const start = (pageNo - 1) * 10
      const end = pageNo * 10
      const query_filter = query ? query : "$"
      const type_filter = type ? type : "all"
      client
        .get<StaffResponse>("/staff-manager/admin-and-staff/search", {
          params: {
            start: start,
            end: end,
            filter: query_filter,
            type: type_filter,
          },
        })
        .then(({ data }) => {
          setStaffs(data["staff_list"])
          setMaxStaff(data["allStaff_length"])
        })
        .catch(() => {
          setShowError(true)
        })
    },
    [pageNo]
  )

  const fetchStaffInfo = useCallback(async () => {
    const res: AdminAndStaff = (await client.get("staffs/profile")).data
    setCurrentStaff(res)
  }, [])

  useEffect(() => {
    fetchStaffInfo()
    requestStaffs()
  }, [requestStaffs, fetchStaffInfo])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    requestStaffs(searchName, type)
  }

  const sendEdittedStaffInfo = (currentStaff: string, staff: AdminAndStaff) => {
    const data = {
      is_admin: currentStaff === "แอดมิน" ? true : false,
    }
    client
      .put<StaffResponse>("/staff-manager/" + staff["_id"], data)
      .then(() => {
        requestStaffs()
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const sendNewStaffInfo = (newStaff: AdminAndStaff) => {
    delete newStaff.recheckpasssword
    client
      .post<StaffResponse>("/staff-manager/", newStaff)
      .then(({ data }) => {
        setShowAddStaff(false)
        requestStaffs()
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const sendDeleteStaff = (currentStaff: AdminAndStaff) => {
    client
      .delete<StaffResponse>("/staff-manager/" + currentStaff["_id"])
      .then(() => {
        setShowDeleteStaff(false)
        requestStaffs()
      })
      .catch(() => {
        setShowError(true)
      })
  }

  const onSubmitAddStaff = (data: AdminAndStaff) => {
    const newData = { ...data, is_admin: data.is_admin === "แอดมิน" ? true : false }
    sendNewStaffInfo(newData)
  }

  const onSubmitEditStaff = (newValue: string, staff: AdminAndStaff) => {
    sendEdittedStaffInfo(newValue, staff)
    setShowEditStaff(true)
  }

  const renderNoStaffModal = () => {
    return (
      <Modal
        show={showNoStaff}
        onHide={() => {
          setShowNoStaff(false)
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
              setShowNoStaff(false)
            }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderStaffsTable = () => {
    let index = (pageNo - 1) * 10 + 1
    const staffsList = staffs.map((staff) => {
      if (type === "staff" && staff.is_admin === true) return null
      if (type === "admin" && staff.is_admin === false) return null
      return (
        <tr key={index} className="tr-normal">
          <td className="font-weight-bold"> {index++} </td>
          <td> {staff.name} </td>
          <td> {staff.surname} </td>
          <td> {staff.username}</td>
          <td>
            <div>
              <Form>
                <Form.Group>
                  <Form.Control
                    as="select"
                    custom
                    value={staff.is_admin ? "แอดมิน" : "สตาฟ"}
                    disabled={staff.name === currentStaff.name}
                    onChange={(e) => {
                      onSubmitEditStaff(e.target.value, staff)
                      setShowEditStaff(true)
                    }}
                  >
                    <option value="สตาฟ">สตาฟ</option>
                    <option value="แอดมิน">แอดมิน</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
          </td>
          <td>
            <Button
              className="btn-normal btn-outline-black"
              variant="outline-danger"
              disabled={staff.name === currentStaff.name}
              onClick={() => {
                setShowDeleteStaff(true)
                setCurrentStaff(staff)
              }}
            >
              ลบเจ้าหน้าที่
            </Button>
          </td>
        </tr>
      )
    })
    return staffsList
  }

  const handlePagination = (next_page: number) => {
    const max_page: number = Math.floor((maxStaff + 9) / 10)
    if (next_page >= 1 && next_page <= max_page) {
      requestStaffs()
    }
  }

  const loadPagination = () => {
    const max_page: number = Math.floor((maxStaff + 9) / 10)
    const numList: Array<number> = []
    let i = 0
    while (numList.length < 5) {
      const page = pageNo + i - 2
      if (page >= 1 && page <= max_page) {
        numList.push(page)
      } else if (page > max_page) {
        break
      }
      i++
    }
    const elementList = numList.map((num) => {
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
            setPageNo(num)
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

  return (
    <div>
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
                set_type(e.target.value)
              }}
              as="select"
              custom
              defaultValue={0}
            >
              <option value="all">สถานะ</option>
              <option value="staff">สตาฟ</option>
              <option value="admin">แอดมิน</option>
            </Form.Control>
          </Col>
          <Col sm="auto"></Col>
          <Button variant="black" className="py-1 btn-outline-dark" onClick={handleSearch}>
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
          {renderStaffsTable()}
          {renderNoStaffModal()}
        </tbody>
      </Table>
      <Row>
        <Col>
          <Button
            variant="pink"
            className="btn-normal"
            onClick={() => {
              setShowAddStaff(true)
            }}
          >
            เพิ่มสตาฟ{" "}
          </Button>
        </Col>
        <Col>{loadPagination()}</Col>
      </Row>
      <DeleteStaffModal show={showDeleteStaff} setShow={setShowDeleteStaff} mainFunction={sendDeleteStaff} data={currentStaff} />
      <EditStaffModal show={showEditStaff} setShow={setShowEditStaff} />
      <AddStaffModal show={showAddStaff} setShow={setShowAddStaff} onSubmitAddStaff={onSubmitAddStaff} />
      <HandleErrorModal show={showError} setShow={setShowError} />
    </div>
  )
}
