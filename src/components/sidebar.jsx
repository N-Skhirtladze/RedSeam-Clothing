const Sidebar = ({isOpen}) => {
    return (
        <div className={!isOpen ? "sidebar open-sidebar" : "sidebar"}>
            <div className="sidebar-header">
                <p className="producs-amount">Shopping cart (0)</p>
                <img src="../images/x-mark2.png" alt="" />
            </div>
            <div className="picked-items">

            </div>
            <div className="price-detail">

            </div>
            <button type="button" className="checkout-btn">Go to checkout</button>
        </div>
    )
}

export default Sidebar;