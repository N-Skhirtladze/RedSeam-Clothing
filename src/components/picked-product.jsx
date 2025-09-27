import { useEffect, useState } from "react";

const PickedProduct = ({ product, setFinalCost, setProductList }) => {
    const [newQuantity, setNewQuantity] = useState(product.quantity);

    useEffect(() => {
        // setFinalCost(prev => prev = newQuantity * product.price);
        const stored = JSON.parse(localStorage.getItem("product-list")) || [];
        const updated = stored.map(p =>
            p.id === product.id ? { ...p, quantity: newQuantity } : p
        );
        localStorage.setItem("product-list", JSON.stringify(updated));
    }, [newQuantity, product])

    const handleDecrease = () => {
        console.log(newQuantity)
        if (newQuantity > 1) {
            setNewQuantity(prev => prev - 1);
            setFinalCost(prev => prev - product.price)
        }
    }
    const handleIncrease = () => {
        console.log(newQuantity)
        setNewQuantity(prev => prev + 1);
        setFinalCost(prev => prev + product.price)
    }
    const handleRemove = () => {
        const stored = JSON.parse(localStorage.getItem("product-list"));
        const updated = stored.filter(p =>
            p.id != product.id
        );
        setProductList(updated);
        localStorage.setItem("product-list", JSON.stringify(updated)); 
    }
    return (
        <div className="picked-product">
            <img src={product.image} alt="" />
            <div className="picked-product-details">
                <div className="picked-product-header">
                    <p className="picked-name">{product.name}</p>
                    <p className="picked-price">${product.price}</p>
                </div>
                <p className="picked-color">{product.color}</p>
                <p className="picked-size">{product.size}</p>
                <div className="add-remove">
                    <p className="add"><span onClick={handleDecrease} style={{color: (newQuantity - 1) ? "" : "#E1DFE1" }}>-</span>{newQuantity}<span onClick={handleIncrease}>+</span></p>
                    <p className="remove" onClick={handleRemove}>remove</p>
                </div>
            </div>
        </div>
    )
}

export default PickedProduct;