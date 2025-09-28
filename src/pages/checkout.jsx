import { useState, useEffect } from "react";
import Header from "../components/header";
import PickedProduct from "../components/picked-product";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Checkout = () => {
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("product-list")) || null);
    const { register, handleSubmit } = useForm();
    const [finalCost, setFinalCost] = useState(0);
    const [zip, setZip] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || null;

    useEffect(() => {
        localStorage.setItem("product-list", JSON.stringify(productList));
        setFinalCost(productList.reduce((acc, p) => acc + p.price * p.quantity, 0))
    }, [productList]);

    const handleChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
        setZip(onlyNums);
    };

    const onSubmit = async (data) => {
        const response = await fetch("https://api.redseam.redberryinternship.ge/api/cart/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            navigate("/congrats");
        }
    }


    return (
        <>
            <Header />
            <h1 className="chackout-h1">Checkout</h1>
            <div className="checkout-content">
                <div className="checkout-form">
                    <p>Order details</p>
                    <form onSubmit={handleSubmit(onSubmit)} id="checkout-form">
                        <div className="flex-input">
                            <input type="text" placeholder="Name" {...register("name")} required />
                            <input type="text" placeholder="Surname" {...register("surname")} required />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                },
                            })}
                            id="email-input"
                            required
                        />
                        <img src="../images/envelope.png" alt="" className="email-icon" />
                        <div className="flex-input">
                            <input type="text" placeholder="Address" {...register("address")} required />
                            <input type="text" {...register("zip_code")} placeholder="Zip code" value={zip} onChange={handleChange} required />
                        </div>
                    </form>
                </div>
                <div className="for-buy">
                    {finalCost ? (<>
                        <div className="checkout-picked-product">
                            {productList.map((product) => (<PickedProduct key={product.variationId} product={product} setFinalCost={setFinalCost} setProductList={setProductList} />))}
                        </div>
                        <div className="price-detail">
                            <p className="subtotal">Items subtotal <span>${finalCost}</span></p>
                            <p className="delivery">Delivery <span>$5</span></p>
                            <p className="total">Total <span>${finalCost + 5}</span></p>
                        </div>
                        <button type="submit" form="checkout-form" style={{ color: "white" }} className="pay-btn" onClick={() => localStorage.setItem("product-list", JSON.stringify([]))}>Pay</button></>) :
                        <div className="no-item">
                            <img src="../images/Making Credit Purchase Online Securely.png" alt="" />
                            <p className="oops">Ooops!</p>
                            <p className="oops-reason">You’ve got nothing in your cart just yet...</p>
                            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}> <button type="button" className="start-shoping">Start shoping</button> </Link>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Checkout;