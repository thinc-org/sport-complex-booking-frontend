import React from "react"
import { Button } from "react-bootstrap"
import { useState} from "react"
import { useForm } from "react-hook-form"
import {Link } from "react-router-dom"

export default function JoinWaitingRoom() {
  const { register, handleSubmit, errors } = useForm()
  let [showHelp, setShowHelp] = useState(false)

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  const onSubmit = (data: any) => {
    console.log(JSON.parse(JSON.stringify(data)))
  }

  return (
    <div className="wrapper">
      <div className="mx-auto col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="d-flex justify-content-center font-weight-bold  mt-3">Join a Waiting Room</h4>
          <div className="default-mobile-wrapper mt-4">
            <span className="row mt-3">
              <h6 className="mx-3 mt-1">Waiting Room Access Code</h6>
              <a onClick={toggleHelp}>Help</a>
            </span>
            {showHelp ? <p className="font-weight-light">The access code can by found when you create a waiting room.</p> : <></>}
            <div className="mt-2">
              <input
                name="access_code"
                type="text"
                ref={register({
                  required: "Enter a waiting room access code",
                  pattern: {
                    value: /^[A-Z0-9._%+-]/i,
                    message: "Enter a valid waiting room access code",
                  },
                })}
                placeholder="xxxxxx"
                className="form-control"
              />
              {errors.access_code && <p id="input-error">{errors.access_code.message}</p>}
            </div>
          </div>
          <br />
          <div className="button-group my-2">
            <Link to={"/reservenow"}>
              <Button className="btn-secondary">
                Cancel
              </Button>
            </Link>
            <Button variant="pink" type="submit">
              Join a Waiting Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
