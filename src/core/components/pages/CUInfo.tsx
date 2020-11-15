import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link, RouteComponentProps } from "react-router-dom";


interface stateTemplate {
      is_editing: boolean,
      user: userState,
      temp_user: userState
}

interface TParams { username: string }

interface userState {
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
      is_first_login: boolean
}

enum Account {
      CuStudent,
      SatitAndCuPersonel,
      Other
}

class UserInfo extends Component<RouteComponentProps<TParams, any, userState[]>, {}> {
      state: stateTemplate = {
            is_editing: false,
            user: {
                  account_type: Account.CuStudent, is_thai_language: true, name_th: "ไก่", surname_th: "กา", name_en: "chicky", surname_en: "crowy", username: "123",
                  personal_email: "email", phone: "191", is_penalize: false, expired_penalize_date: new Date(), is_first_login: true
            },
            temp_user: {
                  account_type: Account.CuStudent, is_thai_language: true, name_th: "ไก่", surname_th: "กา", name_en: "chicky", surname_en: "crowy", username: "123",
                  personal_email: "email", phone: "191", is_penalize: false, expired_penalize_date: new Date(), is_first_login: true
            }
      }

      componentDidMount = () => {
            this.getInfo(); //set state with incoming values
      }

      getInfo = () => {
            // console.log(this.props);
            let username: string = this.props.match.params.username;
            let user = this.props.location.state.find(user => (user.username === username));
            this.setState({
                  user: user,
            });
      }

      handleChange = (e) => {
            let new_user: userState = { ...this.state.temp_user }
            if (e.target.id === "is_penalize") {
                  if (e.target.value === "OK") new_user[e.target.id] = false;
                  else new_user[e.target.id] = true;
            } else if (e.target.id === "expired_penalize_date") {
                  let date: Date = new Date(e.target.value)
                  // console.log(date.getFullYear())
                  // console.log(date.getMonth())
                  // console.log(date.getDate())
                  // console.log(date <= new Date())
                  if (date < new Date()) date = new Date();
                  new_user[e.target.id] = date;
            } else {
                  new_user[e.target.id] = e.target.value;
            }
            this.setState({
                  temp_user: new_user
            })
            if (e.target.id === "is_penalize") this.forceUpdate();
      }

      handleEdit = () => {
            this.setState({
                  is_editing: true,
                  temp_user: this.state.user
            })
            this.forceUpdate()
            console.log(this.state)
      }

      handleCancelChange = () => {
            this.setState({
                  is_editing: false
            })
            this.forceUpdate()
      }

      handleConfirmChange = () => {
            this.setState({
                  is_editing: false,
                  user: this.state.temp_user
            })
            this.forceUpdate()
            console.log(this.state)
      }

      renderForm = () => {
            let user = this.state.user;
            let date: Date = user.expired_penalize_date;
            let expired_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return (
                  <div className="userInformation" style={{ paddingLeft: "2rem" }}>
                        <Row>
                              <Col className="py-3">
                                    <p>ประเภท</p>
                                    <p className="font-weight-bold mb-0">{Account[user.account_type]}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อ (อังกฤษ)</p>
                                    <p className="font-weight-bold mb-0">{user.name_en}</p>
                              </Col>
                              <Col className="py-3">
                                    <p>นามสกุล (อังกฤษ)</p>
                                    <p className="font-weight-bold mb-0" >{user.surname_en}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อ (ไทย)</p>
                                    <p className="font-weight-bold mb-0">{user.name_th}</p>
                              </Col>
                              <Col className="py-3">
                                    <p>นามสกุล (ไทย)</p>
                                    <p className="font-weight-bold mb-0">{user.surname_th}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อผู้ใช้</p>
                                    <p className="font-weight-bold mb-0">{user.username}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>อีเมลส่วนตัว</p>
                                    <p className="font-weight-bold mb-0">{user.personal_email}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>เบอร์โทร</p>
                                    <p className="font-weight-bold mb-0">{user.phone}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>สถานะการแบน</p>
                                    <p className="font-weight-bold mb-0">{(user.is_penalize) ? ("โดนแบน") : ("ปกติ")}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    {/* <p>ชื่อ (ไทย)</p>
                                    <p className="font-weight-bold mb-0">{user.name_th}</p> */}
                                    <Form.Label>สิ้นสุดการแบน</Form.Label>
                                    <Form.Control style={{ width: "50%" }} disabled type="date" value={(user.is_penalize) ? expired_date : "XXXX-XX-XX"} />
                              </Col>
                        </Row>
                        <Row className="mt-4">
                              <Col>
                                    <Link to="/listOfAllUsers">
                                          <Button variant="outline-primary">กลับ</Button>
                                    </Link>
                              </Col>
                              <Col className="text-right" >
                                    <Button variant="outline-primary" onClick={this.handleEdit}>แก้ไข</Button>
                              </Col>
                        </Row>
                  </div>
            )
      }

      renderEditingForm = () => {
            let user: userState = this.state.user;
            let temp_user: userState = this.state.temp_user;
            let date: Date = temp_user.expired_penalize_date;
            let expired_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return (
                  <div className="userInformation">
                        <Row>
                              <Col className="py-3">
                                    <p>ประเภทบัญชี</p>
                                    <Form.Label className="font-weight-bold">{Account[user.account_type]}</Form.Label>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อ (อังกฤษ)</p>
                                    <Form.Control id="name_en" onChange={this.handleChange} value={temp_user.name_en} />
                              </Col>
                              <Col className="py-3">
                                    <p>นามสกุล (อังกฤษ)</p>
                                    <Form.Control id="surname_en" onChange={this.handleChange} value={temp_user.surname_en} />
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อ (ไทย)</p>
                                    <Form.Control id="name_th" onChange={this.handleChange} value={temp_user.name_th} />
                              </Col>
                              <Col className="py-3">
                                    <p>นามสกุล (ไทย)</p>
                                    <Form.Control id="surname_th" onChange={this.handleChange} value={temp_user.surname_th} />
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>ชื่อผู้ใช้</p>
                                    <Form.Label className="font-weight-bold">{temp_user.username}</Form.Label>
                              </Col>
                        </Row>
                        <Row className="py-3">
                              <Col>
                                    <p>อีเมลส่วนตัว</p>
                                    <Form.Control id="personal_email" onChange={this.handleChange} value={temp_user.personal_email} />
                              </Col>
                        </Row>
                        <Row>
                              <Col className="py-3">
                                    <p>เบอร์โทร</p>
                                    <Form.Control id="phone" onChange={this.handleChange} value={temp_user.phone} />
                              </Col>
                        </Row>
                        <Row className="py-3">
                              <Col>
                                    <Form.Label>สถานะการแบน</Form.Label>
                                    <Form.Control as="select" id="is_penalize" onChange={this.handleChange} defaultValue={(temp_user.is_penalize) ? "Banned" : "OK"}>
                                          <option value="OK">ปกติ</option>
                                          <option value="Banned">โดนแบน</option>
                                    </Form.Control>
                              </Col>
                        </Row>
                        <Row className="py-3">
                              <Col>
                                    <Form.Label>สิ้นสุดการแบน</Form.Label>
                                    <Form.Control style={{ width: "50%" }} disabled={(temp_user.is_penalize) ? false : true} id="expired_penalize_date" type="date" onChange={this.handleChange} value={(user.is_penalize) ? expired_date : "XXXX-XX-XX"} />
                              </Col>
                        </Row>
                        <Row className="mt-5">
                              <Col className="text-right">
                                    <Button className="mr-4" variant="outline-primary" onClick={this.handleCancelChange}>ยกเลิก</Button>
                                    <Button variant="outline-primary" onClick={this.handleConfirmChange}>บันทึก</Button>
                              </Col>
                        </Row>
                  </div>
            )
      }

      render() {
            return (
                  <div className="UserInfo">
                        <Card body border="secondary" style={{ width: "60%" }} className="justify-content-center">
                              <Row className="justify-content-center">
                                    <Col sm={10}>
                                          {this.state.is_editing ? this.renderEditingForm() : this.renderForm()}
                                    </Col>
                              </Row>
                        </Card>
                  </div >
            )
      }

}

export default UserInfo;