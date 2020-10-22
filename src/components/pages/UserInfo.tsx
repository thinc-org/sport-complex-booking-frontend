import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

interface stateTemplate {
      user: {
            account_type: Account, name_th: string, surname_th: string, name_en: string, surname_en: string, username: string,
            personal_email: string, phone: string, is_penalize: boolean, expired_penalize_date: Date
      }
}

enum Account {
      CuStudent,
      SatitAndCuPersonel,
      Other
}

class UserInfo extends Component {
      state: stateTemplate = {
            user: {
                  account_type: Account.CuStudent, name_th: "ไก่", surname_th: "กา", name_en: "chicky", surname_en: "crowy", username: "123",
                  personal_email: "email", phone: "191", is_penalize: false, expired_penalize_date: new Date()
            }
      }

      getInfo = () => {
            //this.setState({});
      }

      renderForm = () => {
            this.getInfo(); //set state with incoming values
            //console.log(this.state.user.expired_penalize_date.toString());
            let user = this.state.user;
            return (
                  <div className="userInformation">
                        <Row>
                              <Col className="border">
                                    <p className="l">ชื่อ (ไทย)</p>
                                    <p className="font-weight-bold">{user.name_th}</p>
                              </Col>
                              <Col className="border">
                                    <p>นามสกุล (ไทย)</p>
                                    <p className="font-weight-bold">{user.surname_th}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="border">
                                    <p>ชื่อ (อังกฤษ)</p>
                                    <p className="font-weight-bold">{user.name_en}</p>
                              </Col>
                              <Col className="border">
                                    <p>นามสกุล (อังกฤษ)</p>
                                    <p className="font-weight-bold" >{user.surname_en}</p>
                              </Col>
                        </Row>
                        <Row>
                              <Col className="border" md={7}>
                                    <p>ชื่อผู้ใช้</p>
                                    <p className="font-weight-bold">{user.username}</p>
                              </Col>
                              <Col className="border">
                                    <p>เบอร์โทร</p>
                                    <p className="font-weight-bold">{user.phone}</p>
                              </Col>
                        </Row>
                        <Row className="border">
                              <Col>
                                    <p>อีเมลส่วนตัว</p>
                                    <p className="font-weight-bold">{user.personal_email}</p>
                              </Col>
                        </Row>
                        <Row className="border">
                              <Col>
                                    <p>ประเภทบัญชี</p>
                                    <p className="font-weight-bold">{Account[user.account_type]}</p>
                              </Col>
                        </Row>
                        <Row className="border">
                              <Col>
                                    <p>สถานะการเแบน</p>
                                    <p className="font-weight-bold">{(user.is_penalize) ? ("Banned") : ("OK")}</p>
                              </Col>
                        </Row>
                  </div>
            )
      }

      render() {
            return (
                  <div className="UserInfo">
                        <Row>
                              <Col sm="auto">
                                    <Button variant="outline-primary">กลับ</Button>
                              </Col>
                              <Col>
                                    {this.renderForm()}
                                    <Button variant="outline-primary">แก้ไข</Button>
                              </Col>
                        </Row>
                  </div>
            )
      }

}

export default UserInfo;