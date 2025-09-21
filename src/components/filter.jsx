import React from "react";
import { useState } from "react";

const Filter = ({ setPriceForm, setDropDown, priceForm, firstInputProps, secondInputProps, handleSubmit,  setFormData, }) => {
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");
  
    const handleChange = (setter) => (e) => {
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      setter(onlyNums);
    };

    const onSubmit = (data) => {
        setFormData((prev) => prev = data);
        console.log(data);
        setFirstValue("");
        setSecondValue("");
    };

    const closeForms = () => {
        setDropDown(false);
        setPriceForm(false);
    }
    return (
        <div className={!priceForm ? "filter-div close" : "filter-div open"}>
            <p className="select-price">Select price</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-tags">
                    <input type="text" {...firstInputProps} placeholder="From" value={firstValue} onChange={handleChange(setFirstValue)} required />
                    <input type="text" {...secondInputProps} placeholder="To" value={secondValue} onChange={handleChange(setSecondValue)} required />
                </div>
                <button type="submit" onClick={closeForms}>Apply</button>
            </form>
        </div>
    )
}

export default Filter;