import React from "react"

function GroupSessionDescription(props) {
  let description = props.description;


  return (
    <div>
    <textarea value = {description} readOnly>
</textarea>
    </div>
  )
}

export default GroupSessionDescription