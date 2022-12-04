import React from "react";
import CreateReview from "../components/CreateReview";
import Review from "../components/Review";

const Dummy = () => {
    return (
        <div>
            <div className="create-review">
                <CreateReview/>
            </div>
            <div className="Review">
                <Review/> 
            </div>
        </div>
    )
}

export default Dummy;