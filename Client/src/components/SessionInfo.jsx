import React from "react"
import Logo from "../images/Logo.png"

function SessionInfo(props) {
  let sessionName = props.sessionName;
  let sessionFac = props.sessionFac;
  let sessionPrice = props.sessionPrice;
  let sessionFreeTrial = props.sessionFreeTrial;
  let Experience = props.Experience;

  let freetrialpos = "no"
  if(sessionFreeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {sessionName} </h5> <h6>at {sessionFac} </h6>
    <p>
    the tutor has {Experience} years of experience with this subject.
    </p>

    <p>
    the price of a session would be {sessionPrice} euro's per hour, and there is {freetrialpos} possiblity for a free trial of the session.
    </p>
    </div>
  )
}

export default SessionInfo