import React from "react"
import withUserGuard from "../../guards/user.guard"
import { Row, Col } from "react-bootstrap"
import ProductOwner from "../../assets/images/productOwner.svg"
import Backend from "../../assets/images/Backend.svg"
import Design from "../../assets/images/Design.svg"
import Frontend from "../../assets/images/Frontend.svg"
import Mentors from "../../assets/images/Mentors.svg"
import ProjectManager from "../../assets/images/ProjectManager.svg"
import titleBackground from "../../assets/images/titleBackground.svg"
import { useTranslation } from "react-i18next"
import { useLanguage } from "../../utils/language"

interface CreditsInfo {
  title: string
  team_en: string[]
  team_th: string[]
  icon: string
}

function AboutUs() {
  const { t } = useTranslation()
  const language = useLanguage()
  const credits: CreditsInfo[] = [
    {
      title: "productOwner",
      team_en: ["Name Surname"],
      team_th: ["ชื่อ นามสกุล"],
      icon: ProductOwner,
    },
    {
      title: "projectManager",
      team_en: ["Name Surname"],
      team_th: ["ชื่อ นามสกุล"],
      icon: ProjectManager,
    },
    {
      title: "frontendDeveloper",
      team_en: ["Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname"],
      team_th: ["ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล"],
      icon: Frontend,
    },
    {
      title: "backendDeveloper",
      team_en: ["Name Surname", "Name Surname", "Name Surname", "Name Surname", "Name Surname"],
      team_th: ["ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล"],
      icon: Backend,
    },
    {
      title: "designer",
      team_en: ["Name Surname", "Name Surname", "Name Surname"],
      team_th: ["ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล"],
      icon: Design,
    },
    {
      title: "specialThanks",
      team_en: ["Name Surname", "Name Surname", "Name Surname", "Name Surname"],
      team_th: ["ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล", "ชื่อ นามสกุล"],
      icon: Mentors,
    },
  ]

  return (
    <div className="mx-auto col-md-6 mt-3">
      <div className="description-container">
        <img src={titleBackground} alt="titleBackground" />
        <h3>{t("description")}</h3>
      </div>
      <div className="description-paragraph">
        <p>{t("descriptionMsg")} </p>
        <hr />
      </div>
      <div className="description-container">
        <img src={titleBackground} alt="titleBackground" />
        <h3>{t("team")}</h3>
      </div>
      <div className="description-paragraph mb-4">
        <p>{t("teamMsg")}</p>
      </div>
      {credits.map((team, index) => {
        return (
          <Row className="my-3" key={index}>
            <Col className="col-2 pr-0 left-col">
              <div className="team-icon-container">
                <img className="icon" src={team.icon} alt="" />
              </div>
              {team !== credits[credits.length - 1] && <div className="vertical-line"></div>}
            </Col>
            <Col className="col-sm-9">
              <div className="default-mobile-wrapper animated-card pb-1">
                <h4>{t(team.title)}</h4>
                <ul className="list-unstyled">
                  {language === "th"
                    ? team.team_th.map((name) => (
                        <li key={name}>
                          <p className="mb-0">{name}</p>
                        </li>
                      ))
                    : team.team_en.map((name) => (
                        <li key={name}>
                          <p className="mb-0">{name}</p>
                        </li>
                      ))}
                </ul>
              </div>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export default withUserGuard(AboutUs)
