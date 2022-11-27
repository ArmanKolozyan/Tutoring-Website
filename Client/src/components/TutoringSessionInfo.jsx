import React from "react"
import Logo from "../images/Logo.png"

function TutoringSessionInfo(props) {
  let tutoringSessionName = props.tutoringSessionName;
  let tutoringSessionFac = props.tutoringSessionFac;
  let tutoringSessionPrice = props.tutoringSessionPrice;
  let tutoringSessionFreeTrial = props.tutoringSessionFreeTrial;
  let Experience = props.Experience;

  let freetrialpos = "no"
  if(tutoringSessionFreeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {tutoringSessionName} </h5> <h6>at {tutoringSessionFac} </h6>
    <p>
    the tutor has {Experience} years of experience with this subject.
    </p>

    <p>
    the price of a tutoring session would be {tutoringSessionPrice} euro's per hour, and there is {freetrialpos} possiblity for a free trial of the tutoring session.
    </p>
    </div>
  )
}

export default TutoringSessionInfo