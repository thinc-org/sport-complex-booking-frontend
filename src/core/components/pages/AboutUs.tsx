import React from 'react';
import withUserGuard from '../../guards/user.guard';
import { Button, Row, Col } from "react-bootstrap"
import prodcutOwner from "../../assets/images/productOwner.svg"
import Backend from "../../assets/images/Backend.svg"
import Design from "../../assets/images/Design.svg"
import Frontend from "../../assets/images/Frontend.svg"
import Mentors from "../../assets/images/Mentors.svg"
import ProjectManager from "../../assets/images/ProjectManager.svg"
import titleBackground from "../../assets/images/titleBackground.svg"

function AboutUs() {

  return (
    <div className="mx-auto col-md-6 mt-3">
      <div className="description-container">
        <img src={titleBackground} alt="titleBackground" />
        <h3>Description</h3>
      </div>
      <div className="description-paragraph">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget turpis eros. Suspendisse elit a nisi auctor fermentum. Nunc luctus sed arcu sed bibendum. </p>
        <hr/>
      </div>
      <div className="description-container">
        <img src={titleBackground} alt="titleBackground" />
        <h3>Team</h3>
      </div>
      <div className="description-paragraph mb-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={prodcutOwner} alt="productOwnerIcon"/>
          </div>
          <div className="vertical-line" ></div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>Product Owner</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
      <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={ProjectManager} alt="productOwnerIcon"/>
          </div>
          <div className="vertical-line" ></div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>Project Manager</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
      <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={Frontend} alt="productOwnerIcon"/>
          </div>
          <div className="vertical-line" ></div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>Frontend Developers</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
       <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={Backend} alt="productOwnerIcon"/>
          </div>
          <div className="vertical-line" ></div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>Backend Developers</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
      <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={Design} alt="productOwnerIcon"/>
          </div>
          <div className="vertical-line" ></div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>UI/UX Designers</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
      <Row className="my-3">
        <Col className="col-2 pr-0">
          <div className="team-icon-container">
            <img className="icon" src={Mentors} alt="productOwnerIcon"/>
          </div>
        </Col>
        <Col className="col-sm-9">
          <div className="default-mobile-wrapper animated-card pb-1">
            <h4>Special Thanks to</h4>
            <ul className="list-unstyled">
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
              <li><p className="mb-0">Name Surname</p></li>
            </ul>
          </div>
        </Col>
      </Row>      
    </div>
  )

}

export default withUserGuard(AboutUs)