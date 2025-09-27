import { useState } from "react";
import { useForm } from 'react-hook-form';
import Header from "../components/header";
import { Route, useNavigate, Link } from "react-router-dom";


const Registration = () => {
    const { register, handleSubmit } = useForm();
    const [password, setPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(true);
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
            navigate("/login");
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
            <Header />
            <div className="registration">
                <img src="../images/Rectangle 10.png" alt="" className="reg-log-cover" />
                <div className="registration-form">
                    <h1>Registration</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Username" {...register("username")} />

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
                            type={password ? "password" : "text"}
                            placeholder="Password"
                            {...register("password", { minLength: { value: 4 } })}
                        />
                        <img
                            src="../images/Vector101.png"
                            alt=""
                            className="eye upper"
                            onClick={() => handleInputType(password, setPassword)}
                        />

                        <input
                            type={confirmPassword ? "password" : "text"}
                            placeholder="Confirm password"
                            {...register("password_confirmation", { minLength: { value: 4 } })}
                        />
                        <img
                            src="../images/Vector101.png"
                            alt=""
                            className="eye lower"
                            onClick={() => handleInputType(confirmPassword, setConfirmPassword)}
                        />

                        <button type="submit">Register</button>
                    </form>
                    <p>Already member? <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}><span>Log in</span></Link></p>
                </div>
            </div>
        </>
    );
};

export default Registration;
