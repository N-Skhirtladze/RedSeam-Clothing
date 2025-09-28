import { Link } from "react-router-dom";
import PickedProduct from "./picked-product";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen, productList, setProductList, finalCost, setFinalCost }) => {
    return (
        <div className={isOpen ? "sidebar open-sidebar" : "sidebar"}>
            <div className="sidebar-header">
                <p className="producs-amount">Shopping cart ({productList.length})</p>
                <img src="../images/x-mark2.png" alt="" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className="picked-items">
                {productList.map((product) => (<PickedProduct key={product.variationId} product={product} setFinalCost={setFinalCost} setProductList={setProductList} />))}
            </div>
            {finalCost ? (<><div className="price-detail">
                <p className="subtotal">Items subtotal <span>${finalCost}</span></p>
                <p className="delivery">Delivery <span>$5</span></p>
                <p className="total">Total <span>${finalCost + 5}</span></p>
            </div>
                <Link to='/checkout'style={{ textDecoration: "none", color: "inherit" }} className="checkout-btn"><p style={{color: "white"}}>Go to checkout</p></Link></>) :
                <div className="no-item">
                    <img src="../images/Making Credit Purchase Online Securely.png" alt="" />
                    <p className="oops">Ooops!</p>
                    <p className="oops-reason">You’ve got nothing in your cart just yet...</p>
                    <Link to='/' style={{ textDecoration: "none", color: "inherit" }}> <button type="button" className="start-shoping">Start shoping</button> </Link>
                </div>
            }

        </div >
    )
}

export default Sidebar;