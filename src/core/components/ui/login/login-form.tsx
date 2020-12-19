import * as React from "react"
import { useState, useEffect, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useHistory, useRouteMatch } from "react-router-dom"
import { setCookie } from '../../../contexts/cookieHandler'
import { useForm } from 'react-hook-form'
import { useAuthContext } from "../../../controllers/auth.controller"
import Axios from "axios"
export const LoginForm = (props: any) => {
  const { register, handleSubmit, setError, errors } = useForm();
  let history = useHistory();
  let { url, path } = useRouteMatch();
  const { setToken } = useAuthContext()
  let [isLoading, setLoading] = useState<Boolean>(false)
  useEffect(() => {
    if (history.location.search) {
      console.log(history.location)
      const params = history.location.search
      const ticket = params.slice(params.indexOf('=') + 1)
      Axios.post('http://localhost:3000/users/validation', {
        'appticket': ticket
      }
      )
        .then((res) => {
          console.log(res)
          setCookie('token', res.data.token, 1)
          setToken(res.data.token)
          if (res.data.is_first_login) history.push(`${path}/personal`)
          else history.push('/account')
        })
        .catch((err) => {
          setError('invalid', {
            type: 'async',
            message: 'Something bad happened, please try again'
          })
        })
    }
  }, [])
  const onLogin = async (data) => {
    setLoading(true)
    await Axios.post('http://localhost:3000/users/login', {
      username: data.username,
      password: data.password
    })
      .then((res) => {
        setLoading(false)
        console.log(res)
      })
      .catch((err) => {
        setLoading(false)
        setError('invalid', {
          type: 'async',
          message: 'Invalid Username or Password'
        })
      })

  }
  const SSOLogin = async () => {
    history.push('/login/sso')
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
