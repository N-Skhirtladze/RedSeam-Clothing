import React from "react";
import { Link } from "react-router-dom";


const Card = ({ product }) => {
    return (
        <div className="card">
            <img src={`${product.cover_image}`} alt="" />
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.price}</p>
        </div>
    )
}

const DisplayCards = ({ products }) => {
    const user = localStorage.getItem("token") || null;
    // console.log(products);
    return (
        <div className="cards">
            {products.map(product => (<Link key={product.id} to={user ? `/products/${product.id}` : "/login"} style={{ textDecoration: "none", color: "inherit" }}><Card product={product} /> </Link>))}
        </div>
    )
}

export default DisplayCards;