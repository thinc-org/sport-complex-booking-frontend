import { throws } from 'assert';
import React, { Component } from 'react';
import { Form, Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface stateTemplate {
      selectingSatit: boolean,
      accountType: string,
      username: string,
      password: string,
      //....
}

class AddUser extends Component {
      state: stateTemplate = {
            selectingSatit: false,
            accountType: "สมาชิกสามัญ ก (staff membership)",
            username: "",
            password: ""
            // ...
      }

      renderSelector = (option: number) => {
            return (
                  <Form.Group>
                        <Form.Label>ประเภท</Form.Label>
                        <Form.Control as="select" onChange={this.handleChangeType} defaultValue={option}>
                              <option>สมาชิกสามัญ ก (staff membership)</option>
                              <option>สมาชิกสามัญ ข (student membership)</option>
                              <option>สมาชิกสามัญสมทบ ก (staff-spouse membership)</option>
                              <option>สมาชิกสามัญสมทบ ข (alumni membership)</option>
                              <option>สมาชิกวิสามัญ (full membership)</option>
                              <option>สมาชิกวิสามัญสมทบ (full membership-spouse and children)</option>
                              <option>สมาชิกวิสามัญเฉพาะสนามกีฬาในร่ม (indoor stadium)</option>
                              <option>สมาชิกวิสามัญสมทบเฉพาะสนามกีฬาในร่ม (indoor stadium-spouse and children)</option>
                              <option>สมาชิกรายเดือนสนามกีฬาในร่ม (monthly membership-indoor stadium)</option>
                              <option>นักเรียนสาธิตจุฬา / บุคลากรจุฬา</option>
                        </Form.Control>
                  </Form.Group>
            )
      }

      renderNormalForm = () => {
            return (
                  <Form>
                        {this.renderSelector(0)}
                        <Form.Group>
                              <Form.Label>username (อีเมล)</Form.Label>
                              <Form.Control type="email" onChange={this.handleChangeUsername} value={this.state.username} />
                        </Form.Group>
                        <Form.Group>
                              <Form.Label>รหัสผ่าน (เบอร์โทรศัพท์)</Form.Label>
                              <Form.Control type="password" onChange={this.handleChangePassword} value={this.state.password} />
                        </Form.Group>
                  </Form>
            )
      }

      renderSatitForm = () => {
            return (
                  <Form>
                        {this.renderSelector(9)}
                        <Form.Group>
                              <Form.Label>...</Form.Label>
                              <Form.Control type="email" onChange={this.handleChangeUsername} />
                        </Form.Group>
                        {/* .... */}
                  </Form>
            )
      }

      handleChangeType = (e) => {
            if (e.target.value == "นักเรียนสาธิตจุฬา / บุคลากรจุฬา" || this.state.accountType == "นักเรียนสาธิตจุฬา / บุคลากรจุฬา") {
                  this.setState({
                        ["accountType"]: e.target.value,
                        ["selectingSatit"]: !this.state.selectingSatit
                  })
                  this.forceUpdate();
            } else {
                  this.setState({
                        ["accountType"]: e.target.value
                  })
            }
      }

      handleChangeUsername = (e) => {
            this.setState({
                  ["username"]: e.target.value
            })

      }

      handleChangePassword = (e) => {
            this.setState({
                  ["password"]: e.target.value
            })

      }

      handleAdd = (e) => {
            console.log(this.state)
            // ....
      }

      render() {
            return (
                  <div className="addUser ">
                        <Card body border="secondary">
                              {this.state.selectingSatit ? this.renderSatitForm() : this.renderNormalForm()}
                              <Row>
                                    <Col>
                                          {/* <Link to={"/ ...     "}> */}
                                          <Button variant="outline-primary" style={{ marginRight: "1em" }} onClick={this.handleAdd}>เพิ่ม</Button>
                                          {/* </Link> */}
                                          <Link to="/listOfAllUsers">
                                                <Button variant="outline-primary" >ยกเลิก</Button>
                                          </Link>
                                    </Col>
                              </Row>
                        </Card>
                  </div>
            )
      }
}

export default AddUser;