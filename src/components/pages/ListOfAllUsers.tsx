import React, { Component } from 'react';
import { Table, Form, Row, Col, Button, Pagination } from 'react-bootstrap';

interface stateTemplate {
      page_no: number;
      searchName: string;
      status: allStatus;
      users: { name: string, surname: string, username: string; is_penalize: boolean; id: number }[];
}

enum allStatus {
      All,
      Normal,
      Banned
}

class ListOfAllUsers extends Component {
      state: stateTemplate = {
            page_no: 1,
            searchName: "",
            status: allStatus.All,
            users: [
                  { name: "beam", surname: "eiei", username: "b1", is_penalize: false, id: 1 },
                  { name: "black", surname: "burst", username: "b2", is_penalize: true, id: 2 },
                  { name: "b3", surname: "burst", username: "b3", is_penalize: true, id: 3 },
                  { name: "b4", surname: "burst", username: "b4", is_penalize: false, id: 4 },
                  { name: "b5", surname: "burst", username: "b5", is_penalize: true, id: 5 },
                  { name: "b6", surname: "burst", username: "b6", is_penalize: true, id: 6 },
                  { name: "b7", surname: "burst", username: "b7", is_penalize: true, id: 7 },
                  { name: "b9", surname: "burst", username: "b8", is_penalize: true, id: 8 },
                  { name: "b10", surname: "burst", username: "b9", is_penalize: false, id: 9 },
                  { name: "b11", surname: "burst", username: "b10", is_penalize: true, id: 10 }
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

      handleInfo = (e) => {
            console.log("go to : " + e.target.id)
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
            let usersList = this.state.users.map(user => {
                  return (
                        <tr key={user.id}>
                              <td> {user.id} </td>
                              <td> {user.name} </td>
                              <td> {user.surname} </td>
                              <td> {user.username} </td>
                              <td> {(user.is_penalize) ? "Banned" : "Good"} </td>
                              <td><Button className="border" variant="light" id={String(user.id)} onClick={this.handleInfo}>ดูข้อมูล</Button></td>
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
                                    <Button variant="light" className="border" size="lg" onClick={this.handleAddMember}>เพิ่มผู้ใช้</Button>
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