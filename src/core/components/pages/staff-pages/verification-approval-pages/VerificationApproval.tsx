import React, { FunctionComponent, useState } from "react"
import { Table, Form, Row, Col, Button, Pagination } from "react-bootstrap"
import { Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"

interface User {
  // is_thai_language: boolean
  name_th: string
  surname_th: string
  name_en: string
  surname_en: string
  username: string
}

const VeritificationApproval: FunctionComponent<RouteComponentProps> = (props) => {
  // page state
  const [jwt, setJwt] = useState<string>("")
  const [searchName, setSearchName] = useState<string>("")
  const [users, setUsers] = useState<User[]>([
    {
      name_th: "test",
      surname_th: "test",
      name_en: "test",
      surname_en: "test",
      username: "test",
    },
  ])

  /// functions ///
  const requestUsers = () => {
    //  request users from server  //
    axios({
      method: "get",
      url: "/approval",
      headers: {
        Authorization: "bearer " + jwt,
      },
      params: {
        first: 0,
        end: 15,
      },
    })
      .then(({ data }) => {
        console.log(data)
        // setUsers()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // handles //
  const handleSearch = (e) => {
    // send jwt and get //
    // if no user -> "user not found"
    e.preventDefault()
    requestUsers()
  }

  const handleInfo = (e) => {
    //send jwt and username
    // if no data of that user -> show pop up
    props.history.push({
      pathname: "/verifyInfo/" + e.target.id,
    })
  }

  // renders //
  const renderUsersTable = () => {
    requestUsers()
    let id = 1
    let usersList = users.map((user) => {
      return (
        <tr key={id} className="tr-normal">
          <td className="font-weight-bold"> {id++} </td>
          <td> {user.name_th} </td>
          <td> {user.surname_th} </td>
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
        <tbody>{renderUsersTable()}</tbody>
      </Table>
      {/* <Row>
        <Col>
        </Col>
      </Row> */}
    </div>
  )
}

//   shouldComponentUpdate(nextProp, nextState) {
//     // re-render when page_no, status, users change
//     let { page_no, status, users } = this.state
//     if (page_no !== nextState.page_no || status != nextState.status || users != nextState.users) return true
//     return false
//   }

//   requestUsers = () => {
//     // Send JWT //

//     // get params for request //
//     let { page_no, searchName, status } = this.state
//     let param = {
//       first: (page_no - 1) * 10,
//       last: page_no * 10 - 1,
//     }
//     if (searchName !== "") param["name"] = searchName
//     if (status != allStatus.All) param["is_penalize"] = allStatus.Banned == status
//     //  request users from server  //
//     axios({
//       method: "get",
//       url: "/listOfAllUsers",
//       params: param,
//     })
//       .then((res) => {
//         console.log(res.data)
//         // let users = ;
//         // let max_user: number = ;
//         // this.setState({
//         //       ['users']: users,
//         //       ['max_user']: max_user
//         // })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   handlePagination = (next_page: number) => {
//     let max_page: number = Math.floor((this.state.max_user + 9) / 10)
//     if (next_page >= 1 && next_page <= max_page) {
//       this.setState({ ["page_no"]: next_page })
//       // this.forceUpdate()
//     }
//   }

//   loadPagination = () => {
//     let { page_no } = this.state
//     let max_page: number = Math.floor((this.state.max_user + 9) / 10)
//     let numList: Array<number> = []
//     let i = 0
//     while (numList.length < 5) {
//       let page = page_no + i - 2
//       if (page >= 1 && page <= max_page) {
//         numList.push(page)
//       } else if (page > max_page) {
//         break
//       }
//       i++
//     }
//     let elementList = numList.map((num) => {
//       if (num === page_no) return <Pagination.Item active={true}>{num}</Pagination.Item>
//       return (
//         <Pagination.Item
//           key={num}
//           onClick={() => {
//             this.handlePagination(num)
//           }}
//         >
//           {num}
//         </Pagination.Item>
//       )
//     })
//     return (
//       <Pagination className="justify-content-md-end">
//         <Pagination.Prev
//           onClick={() => {
//             this.handlePagination(page_no - 1)
//           }}
//         />
//         {elementList}
//         <Pagination.Next
//           onClick={() => {
//             this.handlePagination(page_no + 1)
//           }}
//         />
//       </Pagination>
//     )
//   }

//
//   }
// }

export default VeritificationApproval
