import React from "react"
import landing from "../../assets/images/landing.png"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { NavHeader } from "../ui/navbar/navbarSideEffect"
function Landing() {
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <div className="container landing" style={{ backgroundColor: "var(--bg-color)" }}>
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
          <div className="col-12 small-imagegroup landing d-block d-sm-none">
            <img className="landing small-relative-img" src={landing} />
          </div>
          <Link className="landing btn col button-group d-block d-sm-none pt-4 mt-3" to="/login">
            <Button variant="pink" className="mb-0">
              Enter Sports Center
            </Button>
          </Link>
        </div>
      </div>
      <img src={landing} className="landing relative-img d-none d-sm-block" />
    </>
  )
}

export default Landing
