import React from "react"
import image1 from "../../assets/images/image 1.png"
import image2 from "../../assets/images/image 2.png"
import ellipse1 from "../../assets/images/Ellipse 1.png"
import ellipse2 from "../../assets/images/Ellipse 2.png"
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { NavHeader } from '../ui/navbar/navbarSideEffect'
function Landing() {
  return (
    <>
      <NavHeader isOnStaffPage={true} />
      <div className="d-block pt-5 p-0 landing" style={{ backgroundColor: 'var(--bg-color)', width: '100vw', height: '100%' }}>
        <div className="col p-4 m-0 textgroup">
          <h4> Chulalongkorn University </h4>
          <h4> Sports Center </h4>
          <h6 className='d-none d-md-block' style={{ paddingTop: '6%' }}>
            Insert the information of the sports center here
        </h6>
        </div>
        <div className='imagegroup row'>
          <div className='offset-md-6 col-md-5 p-0'>
            <img className="image ellipse1" src={ellipse1} />
            <img className="image image1" src={image1} />
            <img className="image ellipse2" src={ellipse2} />
            <img className="image image2" src={image2} />
          </div>
        </div>
        <div className="col-md-4 mb-4 fixed-bottom button">
          <Link className="landing btn btn-lg col button-group" to="/login">
            <Button variant='pink'>
              Enter Sports Center
          </Button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default Landing
