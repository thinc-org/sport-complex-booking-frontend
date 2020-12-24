import React from "react"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom"
import withUserGuard from "../../../guards/user.guard"

function Hooray() {

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">      
          <div className="text-center mt-5"  >
            <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="82" cy="82" r="82" fill="#FF80AB"/>
            <path d="M68.7497 100.418L50.3322 82.0003L44.0605 88.2278L68.7497 112.917L121.75 59.917L115.522 53.6895L68.7497 100.418Z" fill="#FAFAFA"/>
            </svg>  
          </div>
          <div className="default-mobile-wrapper mt-4 pb-0">
            <h4 className="text-center">HOORAY!</h4>
            <p className="text-center">Your reservation has successfully been made.</p>
            <br/>
            <div className="button-group">
              <Link to={"/waiting_room"}>
                <Button variant="pink">
                  View Waiting Room
                </Button>
              </Link>
          </div>
          </div>
      </div>
    </div>
  )
}

export default withUserGuard(Hooray)
