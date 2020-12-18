import React, { Component, createContext } from 'react';

let defaultValue: any;
export const UserContext = createContext(defaultValue);

class ReservationContextProvider extends Component {

  state = {
    WaitingRoom: {
      date: Date,
      sports: String,
      court: String,
      time: String,      
    }
  }
  
  setWaitingRoomDetails = (value: String) => {
    this.setState({ WaitingRoom: value});
    console.log("SET WAITINGROOM CONTEXT IS CALLED")
  }
  render() { 
    return (
      <UserContext.Provider value={{...this.state, setWaitingRoomDetails: this.setWaitingRoomDetails}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
 
export default ReservationContextProvider;