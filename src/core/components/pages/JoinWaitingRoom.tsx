import React, { Component } from 'react'
import { useState, useEffect, useContext } from 'react';
import { Form, ToggleButton, Container, Button, ToggleButtonGroup } from 'react-bootstrap';
import { NavHeader } from '../../routes/index.route';
// import MaterialIcon, {colorPalette} from 'material-icons-react';
// import HelpIcon from '@material-ui/icons/Help';

export interface JoinWaitingRoomProps {

}
 
export interface JoinWaitingRoomState {
    
}

 
class JoinWaitingRoom extends React.Component<JoinWaitingRoomProps, JoinWaitingRoomState> {
    render() { 
        return ( 
            <div className="wrapper">
                <div className="mx-auto col-md-6">
                    <div className="default-wrapper">
                        <div className="row my-3">
                            <h6 className="mx-3">Waiting Room Access Code </h6>
                            <div className="mx-2">
                                {/* <MaterialIcon icon="help"/>      */}
                            </div>   
                        </div>
                    
                        
                        <div className="">
                            <form>
                                <label className="form-label">First name</label>
                                <input type="text" className="form-control" id="validationCustom01" required></input>
                                <div className="valid-feedback"></div>
                            </form>
                        </div>

                        

                        
                    </div>
                    <br/>

                    <div className="button-group my-2">
                            <Button variant="pink">Join a Waiting Room</Button>
                    </div>
                    
                </div>
                

                
                
            </div>
         );
    }
}
 
export default JoinWaitingRoom;