import Header from "../components/header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(true);
    const navigate = useNavigate();


    const handleInputType = (value, func) => {
        func(!value);
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch("https://api.redseam.redberryinternship.ge/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("API response:", result);
            localStorage.setItem("token", JSON.stringify(result.token));
            navigate("/");

        } catch (err) {
            console.error("Error:", err);
        }
    };
    return (
        <>
            <Header />
            <div className="for-left">
                <div className="login">
                    <img src="../images/Rectangle 10.png" alt="" className="reg-log-cover" />
                    <div className="login-form">
                        <h1>Log in</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    },
                                })}
                                required
                            />

                            <input
                                type={show ? "password" : "text"}
                                placeholder="Password"
                                {...register("password", { minLength: { value: 4 } })}
                            />
                            <img
                                src="../images/Vector101.png"
                                alt=""
                                className="eye for-login"
                                onClick={() => handleInputType(show, setShow)}
                            />

                            <button type="submit">Log in</button>
                        </form>
                        <p>Already member? <Link to="/registration" style={{ textDecoration: "none", color: "inherit" }}><span>registartion</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;