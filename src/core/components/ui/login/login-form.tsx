import React from "react"
import { Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useLogin } from "./loginHooks"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const LoginForm = () => {
  const { t } = useTranslation()
  const { register, handleSubmit, setError, errors, clearErrors } = useForm()
  const { isLoading, onLogin } = useLogin(setError)
  const SSOLogin = () => {
    window.location.href = `https://account.it.chula.ac.th/html/login.html?service=${process.env.REACT_APP_URL}/login`
  }
  const handleBackendError = () => {
    if (errors.invalidInput) clearErrors("invalidInput")
  }
  return (
    <div className="default-wrapper">
      <h1 className="login-header" style={{ textTransform: "uppercase" }}>
        {t("signIn")}
      </h1>
      <Form onSubmit={handleSubmit(onLogin)}>
        <div style={{ display: isLoading ? "none" : "block" }}>
          <div style={{ marginBottom: "40px" }}>
            <Form.Group>
              <Form.Label>{t("usernameLabel")}</Form.Label>
              <Form.Control type="email" placeholder="Email" name="username" ref={register({ required: true })} onChange={handleBackendError} />
              <Form.Text>{errors.username && t("fieldIsRequired")}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t("password")}</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" ref={register({ required: true })} onChange={handleBackendError} />
              <Form.Text>{errors.password && t("fieldIsRequired")}</Form.Text>
            </Form.Group>
            <Form.Text>{errors.invalidInput && t(errors.invalidInput.message)}</Form.Text>
            <Form.Text>{errors.badResponse && t(errors.badResponse.message)}</Form.Text>
          </div>
          <div className="d-flex flex-column align-items-center button-group mb-4">
            <Button variant="pink" type="submit" style={{ fontSize: "14px" }}>
              {t("signIn")}
            </Button>
            <Button variant="darkpink" onClick={SSOLogin} className="mb-0" style={{ fontSize: "14px" }}>
              {t("signInAsCu")}
            </Button>
          </div>
          <hr className="mx-1" />
          <div className="button-group mx-1">
            {t("noAccount")}
            <Link role="button" to="/register" className="text-secondary">
              <div style={{ color: "#c94f7c", marginTop: "10px" }}>{t("registerAsOther")}</div>
            </Link>
            <Link role="button" to="/registerSatit" className=" text-secondary">
              <div style={{ color: "#c94f7c" }}>{t("registerAsSatit")}</div>
            </Link>
          </div>
        </div>
      </Form>
      <div style={{ display: isLoading ? "block" : "none" }}>
        <h3>{t("oneMoment")}...</h3>
        <p>{t("verifyStudent")}</p>
      </div>
    </div>
  )
}

export default LoginForm
