import { Link, Navigate, useNavigate } from "react-router-dom";


const Congrats = () => {
    const navigate = useNavigate();
    return (
        <>
            <img src="images/x-mark2.png" alt="" className="close-congrats" onClick={() => navigate("/checkout")}/>
            <img src="images/Frame 69.png" alt="" className="congrats-icon" />
            <h1 className="congrats">Congrats!</h1>
            <p className="congrats-text">Your order is placed successfully!</p>
            <button type="button" className="congrats-btn" onClick={() => navigate("/")}>Continue shopping</button>
        </>
    )
}

export default Congrats