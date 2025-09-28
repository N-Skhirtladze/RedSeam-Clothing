import { useState, useEffect } from "react";
import Header from "../components/header";
import PickedProduct from "../components/picked-product";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Checkout = () => {
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("product-list")) || null);
    const { register, handleSubmit } = useForm();
    const [finalCost, setFinalCost] = useState(0);

    useEffect(() => {
        localStorage.setItem("product-list", JSON.stringify(productList));
        setFinalCost(productList.reduce((acc, p) => acc + p.price * p.quantity, 0))
    }, [productList]);




    return (
        <>
            <Header />
            <div className="checkout-content">
                <div className="checkout-form">

                </div>
                <div className="for-buy">
                    <div className="checkout-picked-product">
                        {productList.map((product) => (<PickedProduct key={product.variationId} product={product} setFinalCost={setFinalCost} setProductList={setProductList} />))}
                    </div>
                    {finalCost ? (<><div className="price-detail">
                        <p className="subtotal">Items subtotal <span>${finalCost}</span></p>
                        <p className="delivery">Delivery <span>$5</span></p>
                        <p className="total">Total <span>${finalCost + 5}</span></p>
                    </div>
                        <Link to='/checkout' style={{ textDecoration: "none", color: "inherit" }} className="checkout-btn"><p style={{ color: "white" }}>Go to checkout</p></Link></>) :
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