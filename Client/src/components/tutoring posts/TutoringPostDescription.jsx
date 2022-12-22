import React from "react"


/**
 * DESCRIPTION SHOWN WHEN VIEWING A PARTICULAR TUTORING POST 
 */
function TutoringPostDescription(props) {
  let description = props.description;


  return (
    <div>
    <textarea value = {description} readOnly>
</textarea>
    </div>
  )
}

export default TutoringPostDescription