import React from "react"

function TutoringSessionInfo(props) {
  let tutoringPostName = props.tutoringPostName;
  let tutoringPostFac = props.tutoringPostFac;
  let tutoringPostPrice = props.tutoringPostPrice;
  let tutoringPostFreeTrial = props.tutoringPostFreeTrial;
  let experience = props.experience;

  let freetrialpos = "no"
  if(tutoringPostFreeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {tutoringPostName} </h5> 
    <h6>This course is of the faculty {tutoringPostFac} </h6>
    <p>
    The tutor has {experience} years of experience with this subject.
    </p>


    <p>
    The price of a tutoring post would be {tutoringPostPrice} euro's per hour, and there is {freetrialpos} possiblity for a free trial of the tutoring session.
    </p>
    </div>
  )
}

export default TutoringSessionInfo