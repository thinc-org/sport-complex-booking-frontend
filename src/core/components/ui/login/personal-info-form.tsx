import React from "react"
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from "react-bootstrap"
import { NavHeader } from "../../ui/navbar/navbarSideEffect"
import { useForm } from "react-hook-form"
import withUserGuard from "../../../guards/user.guard"
import { usePersonalInfo } from "./loginHooks"
import { useTranslation } from "react-i18next"
const PersonalInfo = () => {
  const { t } = useTranslation()
  const { onSubmit } = usePersonalInfo()
  const { register, handleSubmit, errors } = useForm()
  return (
    <>
      <NavHeader header="Tell us about yourself" />
      <Container>
        <div className="page-wrap">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>{t("language")}</Form.Label>
            <div style={{ marginBottom: "24px" }}>
              <ToggleButtonGroup type="radio" name="is_thai_language" defaultValue={false}>
                <ToggleButton variant="toggle" inputRef={register} value={true}>
                  {t("th")}
                </ToggleButton>
                <ToggleButton variant="toggle" inputRef={register} value={false}>
                  {t("en")}
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <Form.Group>
                <Form.Label>{t("personalEmailLabel")}</Form.Label>
                <Form.Control type="email" name="personal_email" placeholder="Email" ref={register({ required: true })} />
                <Form.Text>{errors.personal_email && t("fieldIsRequired")}</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>{t("mobile_phone")}</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Mobile Number" ref={register({ required: true, minLength: 10, maxLength: 15 })} />
                <Form.Text>{errors.phone && t("invalidLength")}</Form.Text>
              </Form.Group>
            </div>
            <div className="button-group">
              <Button variant="pink" type="submit">
                {t("continue")}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  )
}
export default withUserGuard(PersonalInfo)
