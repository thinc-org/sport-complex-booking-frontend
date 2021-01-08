import React from "react"
import landing from "../../assets/images/landing.png"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { NavHeader } from "../ui/navbar/navbarSideEffect"
function Landing() {
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <div className="container" style={{ backgroundColor: "var(--bg-color)" }}>
        <div className="row landing" style={{ height: "100vh" }}>
          <div className="d-none d-sm-block my-auto col-sm-8 textgroup landing">
            <h4> Chulalongkorn University </h4>
            <h4> Sports Center </h4>
            <h6 className="col-11 pl-0" style={{ paddingTop: "4%" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h6>
            <Link className="d-none d-sm-block col-10 col-md-8 col-lg-6 pl-0 pt-5 btn button" to="/login">
              <Button variant="pink" className="w-100">
                Enter Sports Center
              </Button>
            </Link>
          </div>
          <div className="d-block d-sm-none col-12 mt-5 pt-4 pl-4 textgroup small ">
            <h4> Chulalongkorn University </h4>
            <h4> Sports Center </h4>
          </div>

          <div className="landing smallimagegroup col-12 col-sm-4 p-0 d-block d-sm-none">
            <div className="group small">
              <img className="img" src={landing} alt="" />
            </div>
          </div>
        </div>
        <img src={landing} className="landing relative-img d-none d-sm-block" alt="" />

        <div className="d-block d-sm-none col-12 fixed-bottom button">
          <Link className="landing btn col button-group pt-5" to="/login">
            <Button variant="pink" className="mb-0">
              Enter Sports Center
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Landing
