import * as React from "react"
import { useState, useEffect } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios"
export const LoginForm = (props: any) => {
  let [password, setPassword] = useState("")
  let [email, setEmail] = useState("")
  let [isLoading, setLoading] = useState(false)
  const onChangePw = (e: any) => {
    setPassword(e.target.value)
  }
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const onLogin = async () => {
    setLoading(true)
    await setTimeout(() => {
      setLoading(false)
    }, 3000)
    // send post request to backend
    //and then direct to account-info or first_login page
  }
  return (
    <div className="default-wrapper">
      <h1>SIGN IN</h1>
      <div style={{ display: isLoading ? "none" : "block" }}>
        <div style={{ marginBottom: "60px" }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={onChangeEmail} value={email} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={onChangePw} value={password} />
          </Form.Group>
        </div>
        <div className="d-flex flex-column align-items-center button-group mb-4">
          <Button onClick={onLogin}>Sign in</Button>
          <Button onClick={onLogin}>Sign in as non-CU</Button>
        </div>
      </div>
      <div style={{ display: isLoading ? "block" : "none" }}>
        <h3>One moment...</h3>
        <p>Verifying that you're a Chulalongkorn student</p>
      </div>
      <div>
        <Link to="/">Forget password?</Link>
      </div>
    </div>
  )
}
export default LoginForm
