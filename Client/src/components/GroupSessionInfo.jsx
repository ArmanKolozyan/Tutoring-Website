import React from "react"
import Logo from "../images/Logo.png"
import ProgressBar from 'react-bootstrap/ProgressBar';

function GroupSessionInfo(props) {
  let GroupSessionName = props.GroupSessionName;
  let GroupSessionFac = props.GroupSessionFac;
  let GroupSessionPrice = props.GroupSessionPrice;
  let GroupSessionFree = props.GroupSessionFree;
  let Experience = props.Experience;
  let GroupSessionLimited = props.GroupSessionLimited
  let GroupSessionSpaces = props.GroupSessionSpaces


  let SpotsTakenSession = 14;

  let priceText = "the cost of participation in this groupsession is " + GroupSessionPrice
  if(GroupSessionFree) {
    priceText = " part of this group session is free!"
  }

  let limitedpacestext = "There are unlimited spots for this groupsession";
  let limitedspacetext2 = ""
  if(GroupSessionLimited) {
    limitedpacestext = "This is a groupsession with limited space, and"
    limitedspacetext2 = SpotsTakenSession + " out of the " + GroupSessionSpaces + " have been taken already!"
  }

  return (
    <div>
    <p>
    <h6> The Target audience of this groupsession is:</h6>
    <h6> People from the {GroupSessionFac} faculty, specifically {GroupSessionName} students.</h6>
</p>

    <p>
    {limitedpacestext}
    <br>
    </br>
    {limitedspacetext2}
    <ProgressBar min={0} max={GroupSessionSpaces} now={SpotsTakenSession} label={`${SpotsTakenSession} of ${GroupSessionSpaces}`}      />
    </p>



    <p>
    {priceText}
    </p>
    </div>
  )
}

export default GroupSessionInfo