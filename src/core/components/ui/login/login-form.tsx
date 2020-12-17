import * as React from "react"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useHistory, useRouteMatch } from "react-router-dom"
import axios from "axios"
import { useForm } from 'react-hook-form'
export const LoginForm = (props: any) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();
  let { url, path } = useRouteMatch();
  let [isCU, setCU] = useState<Boolean>(false)
  let [isLoading, setLoading] = useState<Boolean>(false)
  const onLogin = async (data) => {
    data['isCU'] = isCU
    console.log(data)
    history.push(`${path}/personal`)
    // send post request to backend
    //and then direct to account-info or first_login page
  }
  return (
    <div className="default-wrapper">
      <h1 className="login-header">SIGN IN</h1>
      <Form onSubmit={handleSubmit(onLogin)}>
        <div style={{ display: isLoading ? "none" : "block" }}>
          <div style={{ marginBottom: "40px" }}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name='email' ref={register({ required: true })} />
              <Form.Text>{errors.email && "Email is required"}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' ref={register({ required: true })} />
              <Form.Text>{errors.password && "Password is required"}</Form.Text>
            </Form.Group>
          </div>
          <div className="d-flex flex-column align-items-center button-group mb-4">
            <Button variant='pink' type='submit' onClick={async () => setCU(false)}>
              Sign in
          </Button>
            <Button variant='darkpink' type='submit' onClick={async () => setCU(true)}>
              Sign in as a CU student
          </Button>
          </div>
        </div>
      </Form>
      <div style={{ display: isLoading ? "block" : "none" }}>
        <h3>One moment...</h3>
        <p>Verifying that you're a Chulalongkorn student</p>
      </div>
    </div>
  )
}
export default LoginForm
