import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCookie } from "../../../contexts/cookieHandler"
import withUserGuard from "../../../guards/user.guard"
import { useAuthContext } from "../../../controllers/authContext"

function WaitingRoomBan(props) {

  const [is_thai_language] = useState(getCookie('is_thai_langauge') === 'true')
  const { msg } = (props.location && props.location.state) || {};
  const {token} = useAuthContext()
  
  useEffect(()=> {
    fetchValidity(token)
  })

  const fetchValidity = async (token: String |undefined) => {

    let axios = require('axios');
    let config = {
      method: 'post',
      url: 'http://localhost:3000/reservation/checkvalidity',
      headers: { 
        'Authorization': 'bearer ' + token
      }
    };
    await axios(config)
    .then((response:Object) => {
      let resMsg = response['data']['message']
      if (resMsg === "valid user") {
        props.history.push({pathname: '/home'});
      }
    })
    .catch((error: Object) => {
      console.log(error)
      props.history.push({pathname: '/login'});
    });

  }

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <div className="default-mobile-wrapper mt-4">
          <h4>{msg}</h4>
          <p>{is_thai_language ? "คุณไม่ได้รับอนุญาตให้สร้างห้องรอ": "You do not have the permission to create a waiting room."}</p>

          <Link to={"/"}>
            <div className="button-group">
              <Button className="mt-3 mb-0" variant="darkpink">{is_thai_language ? "กลับสู่หน้าหลัก" : "Go back to home page"}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(WaitingRoomBan)
