import React from "react"
import Logo from "../images/Logo.png"

function LessonInfo(props) {
  let lessonName = props.lessonName;
  let lessonFac = props.lessonFac;
  let lessonPrice = props.lessonPrice;
  let lessonFreeTrial = props.lessonFreeTrial;
  let Experience = props.Experience;

  let freetrialpos = "no"
  if(lessonFreeTrial) {
    freetrialpos = "a"
  }

  return (
    <div>
    <h5> {lessonName} </h5> <h6>at {lessonFac} </h6>
    <p>
    the teacher has {Experience} years of experience with this subject.
    </p>

    <p>
    the price of a lesson would be {lessonPrice} euro's per hour, and there is {freetrialpos} possiblity for a free trial of the lesson.
    </p>
    </div>
  )
}

export default LessonInfo