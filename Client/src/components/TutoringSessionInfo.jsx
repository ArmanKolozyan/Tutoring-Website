import React from "react"
import Logo from "../images/Logo.png"

function TutoringSessionInfo(props) {
  let tutoringSessionName = props.tutoringSessionName;
  let tutoringSessionFac = props.tutoringSessionFac;
  let tutoringSessionPrice = props.tutoringSessionPrice;
  let tutoringSessionFreeTrial = props.tutoringSessionFreeTrial;
  let experience = props.experience;

  let freetrialpos = "no"
  if(tutoringSessionFreeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {tutoringSessionName} </h5> 
    <h6>This course is of the faculty {tutoringSessionFac} </h6>
    <p>
    The tutor has {experience} years of experience with this subject.
    </p>


    <p>
    The price of a tutoring session would be {tutoringSessionPrice} euro's per hour, and there is {freetrialpos} possiblity for a free trial of the tutoring session.
    </p>
    </div>
  )
}

export default TutoringSessionInfo