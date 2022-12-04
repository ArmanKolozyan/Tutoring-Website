import React from "react";
import Logo from "../images/Logo.png"

const Welcome = () => {
    return (
        <div className="welcome">
            <hr/>
            <div className="logo">
                <img src={Logo} alt=""/>
            </div>
            <div className="title">
                <p>Welcome</p>
            </div>
            <div className="subtitle">
                <p>to ASA Tutoring</p>
            </div>
            <div className="introduction">
                <div class="row mt-3">
                    <div class="col-xl-4 mx-auto mb-1">
                        <p>
                            ASA Tutoring is a webservice created by 3 students of the Computer Science branch at the Vrije Universiteit Brussel.
                            The webservice was founded with the purpose of assisting VUB students in their studies.
                        </p>
                    </div>
                    <div class="col-xl-4 mx-auto mb-1">
                        <p>
                            Students can search for tutoring sessions on subjects they are struggling with.
                            They can also create group sessions with other students to discuss subject matters or study together.
                            And much more!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;