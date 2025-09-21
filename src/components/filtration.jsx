import React from "react";
import Sort from "./sort";
import Filter from "./filter";
import { useState } from "react";

const Filtration = ({ setCriteria, firstInputProps, secondInputProps, handleSubmit, setFormData, }) => {
    const [dropDown, setDropDown] = useState(false);
    const [priceForm, setPriceForm] = useState(false);

    const handlePriceForm = () => {
        setDropDown(false);
        setPriceForm(!priceForm);
    }

    return (
        <div className="filtration">
            <h1>Products</h1>
            <ul className="filter-components">
                <li className="shown-products">Showing 1–10 of 100 results</li>
                <li className="filter">
                    <ul>
                        <li onClick={handlePriceForm}><img src="./images/adjustments-horizontal.png" alt="" className="filter-icon" /></li>
                        <li onClick={handlePriceForm}>Filter</li>
                        <li>
                            <Filter setPriceForm={setPriceForm} setDropDown={setDropDown} priceForm={priceForm} firstInputProps={firstInputProps} secondInputProps={secondInputProps} handleSubmit={handleSubmit} setFormData={setFormData} />
                        </li>
                    </ul>
                </li>
                <li className="sorting">
                    <Sort setCriteria={setCriteria} dropDown={dropDown} setDropDown={setDropDown} setPriceForm={setPriceForm} />
                </li>
            </ul>
        </div>
    )
}

export default Filtration;