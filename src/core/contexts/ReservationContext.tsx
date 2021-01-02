import React, { Component, createContext } from "react"

interface UserConstruct {
  WaitingRoom: {
    date: Date
    sports: string
    court: string
    time: string
  }
  setWaitingRoomDetails: (value: string) => void
}

export const UserContext = createContext({} as UserConstruct)

class ReservationContextProvider extends Component {
  state = {
    WaitingRoom: {
      date: new Date(),
      sports: "",
      court: "",
      time: "",
    },
  }

  setWaitingRoomDetails = (value: string) => {
    this.setState({ WaitingRoom: value })
    console.log("SET WAITINGROOM CONTEXT IS CALLED")
  }
  render() {
    const value = { ...this.state, setWaitingRoomDetails: this.setWaitingRoomDetails }
    return <UserContext.Provider value={value}>{this.props.children}</UserContext.Provider>
  }
}

export default ReservationContextProvider
