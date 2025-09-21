import React from "react";
import { useState } from "react";

const Sort = ({ setCriteria, dropDown, setDropDown, setPriceForm }) => {
    //const [criteria, setCriteria] = useState(null);
    // const [dropDown, setDropDown] = useState(false);
    const [changeCriteria, setChangeCriteria] = useState('Sort by');

    const handleOption = (e) => {
        if(e.target.innerHTML == "New products first"){
            setCriteria('-created_at');
        }else if(e.target.innerHTML == "Price, low to high"){
            setCriteria('price');
        }else if(e.target.innerHTML == "Price, high to low"){
            setCriteria('-price');
        }else{
            setCriteria(null);
        }
        setChangeCriteria(e.target.innerHTML);
        setDropDown(false);
        setPriceForm(false);
    }
    const handleDropDown = () => {
        setDropDown((prev) => prev = !prev);
        setPriceForm(false);
    }
    return (
        <>
            <div className="selected" onClick={handleDropDown}>
                <p>{changeCriteria}</p>
                <p className="drop-down-icon">{'>'}</p>
            </div>

            <ul className={!dropDown ? "options close" : "options open"}>
                <li onClick={handleOption}>Sort by</li>
                <li onClick={handleOption}>New products first</li>
                <li onClick={handleOption}>Price, low to high</li>
                <li onClick={handleOption}>Price, high to low</li>
            </ul>


        </>
    )
}


export default Sort