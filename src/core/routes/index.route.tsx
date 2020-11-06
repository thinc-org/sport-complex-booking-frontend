import * as React from "react";
import { useState, useEffect } from 'react';
import { Switch } from "react-router-dom";
import { Route } from "react-router"
import FrontLoginPage from '../components/pages/front-login'
import Landing from '../components/pages/LandingComponent'
import StaffLogin from '../components/pages/staff-login'
import StaffSidebar from '../components/ui/navbar/staff-sidebar'
import Sidebar from '../components/ui/navbar/navbar'
import StaffProfile from '../components/pages/staff-pages/staff-profile'
import StaffNavbar from '../components/ui/navbar/staff-navbar';

export default function MainRoute() {
  let [navHead, setNavHead] = useState('CU Sports Center')
  const val = { head: navHead, setHead: setNavHead }

  function staff(page, header) {
    return (
      <div className='staff background d-block' style={{ backgroundColor: 'white', minHeight: '80vh' }}>
        <div className='container d-block' >
          <div className='row justify-content-center' >
            <div className='col' style={{ backgroundColor: ' var(--lightpink-color)', marginTop: '5vh', marginBottom: '5vh', minHeight: '80vh', borderRadius: '15px' }}>
              <div className='row justify-content-center' style={{ minHeight: '80vh' }}>
                <div className='col-3 justify-content-center' style={{ maxHeight: '800px' }}>
                  <StaffSidebar />
                </div>
                <div className='col-9 mt-5' style={{ minHeight: '600px' }}>
                  <h1> {header} </h1>
                  {page}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar></Sidebar>
      <StaffNavbar />
      <Switch>
        <Route exact path="/" render={() => {
          return <Landing />
        }} />

        <Route path="/login" render={() => {
          return <FrontLoginPage />
        }} />
        <Route exact path="/register" render={() => {
          return <div>Under maintenance</div>
        }} />

        <Route exact path="/profile" render={() => {
          return <div>Under maintenance</div>
        }} />

        <Route exact path='/staffLogin' render={() => {
          return <StaffLogin />
        }} />

        <Route path='/staffprofile' render={() => {
          return (
            staff(<StaffProfile />, 'ยินดีต้อนรับ')
            // example
            // add pages here staff(page)
          )
        }} />

        <Route path='/จัดการสตาฟ' render={() => {
          return (
            // add pages here staff(page)
            <div>
              under maintainance
            </div>
          )
        }} />
      </Switch>
    </>
  )
}
