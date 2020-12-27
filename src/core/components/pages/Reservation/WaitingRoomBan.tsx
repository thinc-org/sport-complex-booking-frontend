import React from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import withUserGuard from "../../../guards/user.guard"
import { useAuthContext } from "../../../controllers/authContext"
import { History, LocationState } from "history";
import { useTranslation } from 'react-i18next'


interface historyProps {
 history: History<LocationState>;
}

function WaitingRoomBan(props: historyProps) {

  const { msg } = (props['location'] && props['location']['state']) || {};
  const {token} = useAuthContext()
  const {t} = useTranslation()
  
  useEffect(()=> {
    fetchValidity(token)
  }, [])

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
          <p>{t("waiting_room_ban")}</p>
          <Link to={"/"}>
            <div className="button-group">
              <Button className="mt-3 mb-0" variant="darkpink">{t("back_to_home")}</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withUserGuard(WaitingRoomBan)
