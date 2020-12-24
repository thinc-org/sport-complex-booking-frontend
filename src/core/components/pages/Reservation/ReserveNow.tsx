import React from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom"
import { getCookie } from '../../../contexts/cookieHandler'
import withUserGuard from "../../../guards/user.guard"

function ReserveNow() {  
  const [is_thai_language] = useState<Boolean>(getCookie('is_thai_language') === "true")

  return (
    <div className="wrapper">
      <h4 className="d-flex justify-content-center font-weight-bold mt-3">{is_thai_language ? "จองสนาม" : "Reserve Now"}</h4>
      <div className="mx-auto col-md-6">  
        <div className="default-mobile-wrapper mt-4">
          <span className="row my-3">
            <h6 className="mx-3">{is_thai_language ? "กรุณาเลือกเมนูที่คุณค้องการ" : "What do you want to do?"} </h6>
          </span>
          <Link to={"/createwaitingroom"}>
            <div className="button-group">
            <Button variant="pink">{is_thai_language ? "สร้างห้องรอการจอง" : "Create a Waiting Room"}</Button>
          </div>
          </Link>
          <Link to={"/joinwaitingroom"}>
            <div className="button-group">
              <Button variant="darkpink">{is_thai_language ? "เข้าห้องรอการจอง" : "Join a Waiting Room"}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(ReserveNow)