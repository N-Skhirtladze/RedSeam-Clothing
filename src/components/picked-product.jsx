import { useEffect, useState } from "react";

const PickedProduct = ({ product, setFinalCost, setProductList }) => {
    const [newQuantity, setNewQuantity] = useState(product.quantity);
    const token = localStorage.getItem('token');
    const id = Math.floor(product.variationId / 100);

    const handlePostQuantity = async () => {
        const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                quantity: newQuantity
            })
        });
        const result = await response.json();
    }

    useEffect(() => {
        // setFinalCost(prev => prev = newQuantity * product.price);
        const stored = JSON.parse(localStorage.getItem("product-list")) || [];
        const updated = stored.map(p =>
            p.variationId === product.variationId ? { ...p, quantity: newQuantity } : p
        );
        localStorage.setItem("product-list", JSON.stringify(updated));
        handlePostQuantity();
    }, [newQuantity, product])

    const handleDecrease = () => {
        if (newQuantity > 1) {
            setNewQuantity(prev => prev - 1);
            setFinalCost(prev => prev - product.price);
            // handlePostQuantity();
        }
    }
    const handleIncrease = () => {
        console.log(newQuantity)
        setNewQuantity(prev => prev + 1);
        setFinalCost(prev => prev + product.price);
        // handlePostQuantity()
    }
    const handleRemove = () => {
        const stored = JSON.parse(localStorage.getItem("product-list"));
        const updated = stored.filter(p =>
            p.variationId != product.variationId
        );
        setProductList(updated);
        localStorage.setItem("product-list", JSON.stringify(updated));
        const handleRemoveRequest = async () => {
            const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    color: product.color,
                    size: product.size
                })
            });

            
            console.log(response)
        }
        handleRemoveRequest();

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
                    <p className="add"><span onClick={handleDecrease} style={{ color: (newQuantity - 1) ? "" : "#E1DFE1" }}>-</span>{newQuantity}<span onClick={handleIncrease}>+</span></p>
                    <p className="remove" onClick={handleRemove}>remove</p>
                </div>
            </div>
        </div>
    )
}

export default PickedProduct;