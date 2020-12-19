import * as React from "react"
import { Form, Button } from "react-bootstrap"
import { useForm } from 'react-hook-form'
import { useLogin } from './loginHooks'


export const LoginForm = (props: any) => {
  const { register, handleSubmit, setError, errors } = useForm();
  const { isLoading, onLogin } = useLogin(setError)
  const SSOLogin = async () => {
    window.location.href = `https://account.it.chula.ac.th/html/login.html?service=${process.env.REACT_APP_URL}/login`
  }
  return (
    <div className="default-wrapper">
      <h1 className="login-header">SIGN IN</h1>
      <Form onSubmit={handleSubmit(onLogin)}>
        <div style={{ display: isLoading ? "none" : "block" }}>
          <div style={{ marginBottom: "40px" }}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" name='username' ref={register({ required: true })} />
              <Form.Text>{errors.username && "Email is required"}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' ref={register({ required: true })} />
              <Form.Text>{errors.password && "Password is required"}</Form.Text>
            </Form.Group>
            <Form.Text>{errors.invalid && errors.invalid.message}</Form.Text>
          </div>
          <div className="d-flex flex-column align-items-center button-group mb-4">
            <Button variant='pink' type='submit'>
              Sign in
          </Button>
            <Button variant='darkpink' onClick={SSOLogin}>
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
