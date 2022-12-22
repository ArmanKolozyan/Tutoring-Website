import React from "react"

/**
 * INFORMATION ABOUT THE POST SHOWN WHEN VIEWING A PARTICULAR TUTORING POST
 */
function TutoringSessionInfo(props) {
  let title = props.title;
  let faculty = props.faculty;
  let price = props.price;
  let freeTrial = props.freeTrial;
  let experience = props.experience;

  let freetrialpos = "no"
  if(freeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {title} </h5> 
    <h6>This course is of the faculty {faculty} </h6>
    <p>
    The tutor has {experience} years of experience with this subject.
    </p>


    <p>
    The price of a tutoring post would be {price} euro's per hour, and there is {freeTrial} possiblity for a free trial of the tutoring session.
    </p>
    </div>
  )
}

export default TutoringSessionInfo