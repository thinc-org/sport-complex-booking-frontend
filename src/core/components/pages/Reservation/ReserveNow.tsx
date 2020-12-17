import React from "react"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom"


export default function ReserveNow() {
  return (
    <div className="wrapper">
      <h4 className="d-flex justify-content-center font-weight-bold mt-3">Reserve Now</h4>
      <div className="mx-auto col-md-6">  
        <div className="default-mobile-wrapper mt-4">
          <span className="row my-3">
            <h6 className="mx-3">What do you want to do? </h6>
            
          </span>
          
          <Link to={"/createwaitingroom"}>
            <div className="button-group">
            <Button variant="pink">Create a Waiting Room</Button>
          </div>
          </Link>
          <Link to={"/joinwaitingroom"}>
            <div className="button-group">
              <Button variant="darkpink">Join a Waiting Room</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
