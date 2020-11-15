import React, { Component } from 'react'
import { useState, useEffect, useContext } from 'react';
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
import { NavHeader } from '../ui/navbar/navbarSideEffect'
//import MaterialIcon, {colorPalette} from 'material-icons-react';


export interface ReserveNowProps {

}

export interface ReserveNowState {

}


class ReserveNow extends React.Component<ReserveNowProps, ReserveNowState> {
    render() {
        return (
            <>
                <NavHeader header="Reserve Now" />
                <div className="wrapper">
                    <div className="mx-auto col-md-6">
                        <div className="default-wrapper">
                            <div className="row my-3">
                                <h6 className="mx-3">What do you want to do? </h6>
                                <div className="mx-2">
                                    {/* <MaterialIcon icon="alarm_on"/>      */}
                                </div>
                            </div>

                            <div className="button-group">
                                <Button variant="pink">Create a Waiting Room</Button>
                            </div>
                            <div className="button-group">
                                <Button variant="pink">Join a Waiting Room</Button>
                            </div>
                        </div>

                    </div>




                </div>
            </>
        );
    }
}

export default ReserveNow;