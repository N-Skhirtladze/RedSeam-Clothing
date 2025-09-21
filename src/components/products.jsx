import React from "react";

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
    // console.log(products);
    return (
        <div className="cards">
            {products.map(product => (<Card key={product.id} product={product} />))}
        </div>
    )
}

export default DisplayCards;