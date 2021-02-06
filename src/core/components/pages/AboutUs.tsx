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
import { NavHeader } from "../ui/navbar/navbarSideEffect"

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
      team_en: ["Kevin Chakornsiri"],
      team_th: ["กวิน ชาครศิริ"],
      icon: ProductOwner,
    },
    {
      title: "projectManager",
      team_en: ["Natthorn Suwannapasri"],
      team_th: ["ณัฐธร สุวรรณนภาศรี"],
      icon: ProjectManager,
    },
    {
      title: "frontendDeveloper",
      team_en: ["Dhanabordee Mekintharanggur", "Veerin Phana-ngam", "Sirathee Koomgreng", "Suparuek Saetoen", "Manapat Weeramongkolkul"],
      team_th: ["ธนบดี เมฆินทรางกูร", "วีรินทร์ พนางาม", "สิรธีร์ คุ้มเกรง", "ศุภฤกษ์ แซ่เติ้น", "ชมนพัทธ์ วีระมงคลกุล"],
      icon: Frontend,
    },
    {
      title: "backendDeveloper",
      team_en: ["Natthorn Suwannapasri", "Pattanachai Chonglertvarawong", "Chuwong Kulrattanarak", "Anon Ongsakul", "Chawakorn Phiantham"],
      team_th: ["ณัฐธร สุวรรณนภาศรี", "พัฒนชัย จงเลิศวราวงศ์", "ชูวงศ์ กุลรัตนรักษ์", "อานนท์ อ๋องสกุล", "ชวกร เพียรทำ"],
      icon: Backend,
    },
    {
      title: "designer",
      team_en: ["Dhanabordee Mekintharanggur", "Panoj Kamolrattanawech", "Kritasak Udompongsanont"],
      team_th: ["ธนบดี เมฆินทรางกูร", "ปณต กมลรัตนเวช", "นายกฤตศักดิ์ อุดมพงษานนท์"],
      icon: Design,
    },
    {
      title: "specialThanks",
      team_en: ["Saenyakorn Siangsanoh", "Nut Pinyo", "Witchayut Thongyoi", "Nattamon Ponwichai", "Pipat Saengow", "Suphon Thanakornpakapong"],
      team_th: ["แสนยากร เสียงเสนาะ", "ณัฎฐ์ ภิญโญ", "วิชยุตม์ ทองย้อย", "ณฐมน พลวิชัย", "พิพัฒน์ แซ่โง้ว", "สุภณ ธนกรภคพงศ์"],
      icon: Mentors,
    },
  ]

  return (
    <div className="mx-auto col-md-6 mt-3 px-4">
      <NavHeader header={t("aboutUs")} />

      <div className="description-container">
        <img src={titleBackground} alt="titleBackground" />
        <h3>{t("team")}</h3>
      </div>
      <div className="description-paragraph mb-4">
        <p>{t("teamMsg1")}</p>
        <p>{t("teamMsg2")}</p>
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
                          <p className="mb-0" key={name}>
                            {name}
                          </p>
                        </li>
                      ))
                    : team.team_en.map((name) => (
                        <li key={name}>
                          <p className="mb-0" key={name}>
                            {name}
                          </p>
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
