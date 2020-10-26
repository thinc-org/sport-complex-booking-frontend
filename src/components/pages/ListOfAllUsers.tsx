import React, { Component } from 'react';
import { Table, Form, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link, RouteComponentProps } from "react-router-dom";

interface CUTemplate {
      account_type: Account;
      is_thai_language: boolean,
      name_th: string,
      surname_th: string;
      name_en: string,
      surname_en: string;
      username: string;
      personal_email: string,
      phone: string,
      is_penalize: boolean;
      expired_penalize_date: Date,
      is_first_login: boolean,
}

interface OtherTemplate {
      account_type: Account,
      is_thai_language: boolean,
      prefix: string,
      name: string,
      surname: string,
      birthday: string,
      //national_id: string,
      gender: string,
      marital_status: string,
      address: string,
      phone: string,
      home_phone: string,
      personal_email: string,
      contact_person: Contact_person
      medical_condition: string,
      membership_type: string,
      username: string,
      password: string,
      is_penalize: boolean,
      expired_penalize_date: Date,
      verification_status: Verification
      ejected_info: string[],
      account_expiration_date: Date,
      user_photo: string, // object id
      medical_ceritficate: string, // object id
      national_id: string, // object id
      house_registration_number: string, // object id
      relationship_verification_document: string // object id
}

interface SatitTemplate {
      account_type: Account,
      is_thai_language: boolean,
      name: string,
      surname: string,
      personal_email: string,
      phone: string,
      username: string,
      password: string,
      is_penalize: boolean,
      expired_penalize_date: Date
}

interface stateTemplate {
      page_no: number;
      searchName: string;
      status: allStatus;
      users: (CUTemplate | SatitTemplate | OtherTemplate)[];
}

interface Contact_person {
      contact_person_prefix: string,
      contact_person_name: string,
      contact_person_surname: string,
      contact_person_home_phone: string,
      contact_person_phone: string
}

enum allStatus {
      All,
      Normal,
      Banned
}

enum Account {
      CuStudent,
      SatitAndCuPersonel,
      Other
}

enum Verification {
      NotSubmitted,
      Submitted,
      Verified,
      Rejected
}

class ListOfAllUsers extends Component<RouteComponentProps, {}> {
      state: stateTemplate = {
            page_no: 1,
            searchName: "",
            status: allStatus.All,
            users: [
                  {
                        account_type: Account.CuStudent,
                        is_thai_language: true,
                        name_th: "บีม",
                        surname_th: "อิอิ",
                        name_en: "beam",
                        surname_en: "eiei",
                        username: "b1",
                        personal_email: "eiei@",
                        phone: "101",
                        is_penalize: true,
                        expired_penalize_date: new Date(),
                        is_first_login: false
                  },
                  // { name: "black", surname: "burst", username: "b2", is_penalize: true},
                  // { name: "b3", surname: "burst", username: "b3", is_penalize: true},
                  // { name: "b4", surname: "burst", username: "b4", is_penalize: false},
                  // { name: "b5", surname: "burst", username: "b5", is_penalize: true},
                  // { name: "b6", surname: "burst", username: "b6", is_penalize: true},
                  // { name: "b7", surname: "burst", username: "b7", is_penalize: true},
                  // { name: "b9", surname: "burst", username: "b8", is_penalize: true},
                  // { name: "b10", surname: "burst", username: "b9", is_penalize: false},
                  // { name: "b11", surname: "burst", username: "b10", is_penalize: true}
            ]
      }

      handleChangeInput = (e) => {
            this.setState({
                  [e.target.id]: e.target.value
            })
      }

      handleChangeStatus = (e) => {
            this.setState({
                  ["status"]: e.target.value
            })
      }

      handleSearch = (e) => {
            e.preventDefault();
            console.log(this.state.searchName + " " + allStatus[this.state.status]);
      }

      handleInfo = (username: string, account_type: Account) => {
            if (account_type === Account.CuStudent) {
                  this.props.history.push({
                        pathname: "/CUInfo/" + username,
                        state: this.state.users
                  });
            } else if (account_type === Account.SatitAndCuPersonel) {
                  this.props.history.push({
                        pathname: "/SatitInfo/" + username,
                        state: this.state.users
                  });
            } else {
                  this.props.history.push({
                        pathname: "/UserInfo/" + username,
                        state: this.state.users
                  });
            }
            // console.log(this.state.users[1])
      }

      handleAddMember = (e) => {
            console.log("Go to add member page")
      }

      loadPagination = () => {
            let { page_no } = this.state;
            return (
                  <Pagination className="justify-content-md-end">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active={true}>{page_no}</Pagination.Item>
                        <Pagination.Item>{page_no + 1}</Pagination.Item>
                        <Pagination.Item>{page_no + 2}</Pagination.Item>
                        <Pagination.Item>{page_no + 3}</Pagination.Item>
                        <Pagination.Item>{page_no + 4}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                  </Pagination>
            );
      }

      renderUsersTable = () => {
            let id = ((this.state.page_no - 1) * 10) + 1;
            let user;
            let usersList = this.state.users.map(current_user => {
                  if (current_user.account_type === Account.CuStudent) {
                        user = current_user as CUTemplate;
                  } else if (current_user.account_type === Account.Other) {
                        user = current_user as OtherTemplate;
                  } else {
                        user = current_user as SatitTemplate;
                  }
                  return (
                        <tr key={id}>
                              <td> {id++} </td>
                              <td> {(user.account_type === Account.CuStudent) ? user.name_th : user.name} </td>
                              <td> {(user.account_type === Account.CuStudent) ? user.surname_th : user.surname} </td>
                              <td> {user.username} </td>
                              <td> {(user.is_penalize) ? "โดนแบน" : "ปกติ"} </td>
                              <td>
                                    {/* <Link to={{
                                          pathname: "/userInfo/" + user.id,
                                          state: this.state.users
                                    }}> */}
                                    <Button className="border" variant="light" id={String(user.id)} onClick={() => { this.handleInfo(user.username, user.account_type) }}>ดูข้อมูล</Button>
                                    {/* </Link> */}
                              </td>
                        </tr>
                  )
            })
            return usersList;
      }

      render() {
            return (
                  <div className="allUsers" style={{ margin: "20px" }}>
                        <h1> รายชื่อผู้ใช้ </h1>
                        <Form onSubmit={this.handleSearch} style={{ height: "50px" }}>
                              <Form.Row className="justify-content-end">
                                    <Col md="auto">
                                          <Form.Label> ค้นหาสมาชิก </Form.Label>
                                    </Col>
                                    <Col md="3">
                                          <Form.Control type="text" id="searchName" placeholder=" ค้นหา " onChange={this.handleChangeInput} />
                                    </Col>
                                    <Button variant="light" className="border">ค้นหา</Button>
                                    <Col sm="auto" style={{ paddingLeft: "50px" }}>
                                          <Form.Control onChange={this.handleChangeStatus} as="select" custom>
                                                <option value={allStatus.All}>ทั้งหมด</option>
                                                <option value={allStatus.Normal}>ปกติ</option>
                                                <option value={allStatus.Banned}>โดนแบน</option>
                                          </Form.Control>
                                    </Col>
                              </Form.Row>
                        </Form >
                        <Table responsive className="text-center" size="md">
                              <thead className="bg-light">
                                    <tr>
                                          <th>#</th>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>User Name</th>
                                          <th>สถานะ</th>
                                          <th></th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {this.renderUsersTable()}
                              </tbody>
                        </Table>
                        <Row>
                              <Col>
                                    <Link to="/addUser">
                                          <Button variant="light" className="border" size="lg" onClick={this.handleAddMember}>เพิ่มผู้ใช้</Button>
                                    </Link>
                              </Col>
                              <Col>
                                    {this.loadPagination()}
                              </Col>
                        </Row>
                  </div>
            )
      }
}

export default ListOfAllUsers;