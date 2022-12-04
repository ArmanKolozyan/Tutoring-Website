import React from "react";
import { FaStar } from "react-icons/fa";

const CreateReview = () => {

    const colors = {
        ourBlue: "#1e328d",
        ourOrange: "#fc3e03"
    }

    const nrStars = 5
    const stars = Array(nrStars).fill(0); // lijst van "nrStars" aantal elementen geïnitialiseerd met 0'en
    const [nrGivenStars, setGivenStars] = React.useState(0); // per default is de rating = 0
    const [nrSelectedStars, setNrSelectedStars] = React.useState(undefined); // per default werden er nog geen sterren geselecteerd

    const handleMouseClick = value => {
        setGivenStars(value)
    };

    const handleMouseOver = value => {
        setNrSelectedStars(value)
    };

    const handleMouseLeave = () => {
        setNrSelectedStars(undefined)
    };

    return (
        <div className="create-review">
            <h1>Rate your experience</h1>
            <div className="stars">
                {stars.map((_, index) => { // gaat elk element van de lijst "stars" naar een ster mappen
                    return (
                        <FaStar
                            key={index}
                            size={25} // grootte van sterren
                            style={{
                                marginRight: 10
                            }}
                            color={(nrSelectedStars || nrGivenStars) > index ? colors.ourOrange : colors.ourBlue} // indien "index" groter is dan het aantal geselecteerde OF gegeven sterren => kleur de ster horende bij de index in het oranje
                            onClick={() => handleMouseClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
            <textarea placeholder="Describe your experience"/>
            <button>Submit</button>
        </div>
    )
}

export default CreateReview;

