import React, { useState } from "react"
import { Link } from "react-router-dom";

const Header = () => {
    const user = localStorage.getItem("token") || null;
    return (
        <header>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", width: "0px", height: "0px" }}><img src="images/Logo.png" alt="" className="logo" /></Link>
            <ul>
                <li><img src="images/user.png" alt="" className="user" /></li>
                {user ? <img src="images/shopping-cart.png" /> : <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}><li>Log in</li></Link>}
            </ul>
        </header>
    )
}

export default Header;