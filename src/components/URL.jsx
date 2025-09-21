import React from "react";
import { useState } from "react";

const createURL = (formData, criteria, currentPage) => {
    let URL = `https://api.redseam.redberryinternship.ge/api/products?page=${currentPage}`;
    if (formData && !criteria) {
        URL = `https://api.redseam.redberryinternship.ge/api/products?filter[price_from]=${formData.from}&filter[price_to]=${formData.to}&page=${currentPage}`;
    } else if (!formData && criteria) {
        URL = `https://api.redseam.redberryinternship.ge/api/products?sort=${criteria}&page=${currentPage}`;
    } else if (formData && criteria) {
        URL = `https://api.redseam.redberryinternship.ge/api/products?filter[price_from]=${formData.from}&filter[price_to]=${formData.to}&sort=${criteria}&page=${currentPage}`;
    }
    return URL;
}

export default createURL;