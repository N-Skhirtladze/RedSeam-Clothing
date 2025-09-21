import React from "react";
import { useState } from "react";

const DisplayCriteria = ({ price, setFormData}) => {
    const handleClear = () => {
        setFormData(null); 
    }
    return (
        <div className="criteria-div">
            <div className="criteria">
                <p>Price: {price.from}-{price.to} </p>
                <img src="./images/x-mark.png" alt="" onClick={handleClear} />
            </div>
        </div>
    )
}

export default DisplayCriteria;
