import React from "react"

function TutoringSessionDescription(props) {
  let description = props.description;


  return (
    <div>
    <textarea value = {description} readOnly>
</textarea>
    </div>
  )
}

export default TutoringSessionDescription