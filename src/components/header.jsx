import React from "react"

const Header = () => {
    return(
        <header>
            <img src="./images/Logo.png" alt="" className="logo" />
            <ul>
                <li><img src="./images/user.png" alt="" className="user" /></li>
                <li>Log in</li>
            </ul>
        </header>
    )
}

export default Header;