import React from "react"
import image1 from "../../assets/images/image 1.png"
import image2 from "../../assets/images/image 2.png"
import ellipse1 from "../../assets/images/Ellipse 1.png"
import ellipse2 from "../../assets/images/Ellipse 2.png"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { NavHeader } from "../ui/navbar/navbarSideEffect"
function Landing() {
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <div className="container">
        <div className=" row d-block pt-5 pt-sm-2 pt-md-5  p-0 landing" style={{ backgroundColor: "var(--bg-color)", width: "100vw" }}>
          <div className="col col-md-10 p-4 pt-sm-2 m-0 textgroup">
            <h4> Chulalongkorn University </h4>
            <h4> Sports Center </h4>
            <h6 className="d-none d-sm-block col-9 col-lg-7 col-xl-5" style={{ paddingTop: "4%" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h6>
          </div>
          <div className="col-sm-6 col-md-6 fixed-bottom button">
            <Link className="landing btn col button-group pt-5 pt-md-2 offset-xs-2 offset-lg-1 offset-xl-0" to="/login">
              <Button variant="pink" className="mb-0">
                Enter Sports Center
              </Button>
            </Link>
          </div>

          <div className="imagegroup row">
            <div className="offset-md-6 col-md-5 p-0">
              <img className="image ellipse1" src={ellipse1} />
              <img className="image image1" src={image1} />
              <img className="image ellipse2" src={ellipse2} />
              <img className="image image2" src={image2} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
