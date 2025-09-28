import { useState } from "react";
import { useForm } from 'react-hook-form';
import Header from "../components/header";
import { Route, useNavigate, Link } from "react-router-dom";


const Registration = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(true)

    const handleInputType = (value, func) => {
        func(!value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const onSubmit = async (data) => {
        if (password === confirmPassword) {
            setConfirm(true);
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
        } else {
            setConfirm(false);
        }
    };

    return (
        <>
            <Header />
            <div className="for-left">
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
                                type={showPassword ? "password" : "text"}
                                placeholder="Password"
                                {...register("password", { minLength: { value: 4 } })}
                                onChange={handlePassword}
                                value={password}
                            />
                            <img
                                src="../images/Vector101.png"
                                alt=""
                                className="eye upper"
                                onClick={() => handleInputType(showPassword, setShowPassword)}
                            />

                            <input
                                type={showConfirmPassword ? "password" : "text"}
                                placeholder="Confirm password"
                                {...register("password_confirmation", { minLength: { value: 4 } })}
                                onChange={handleConfirmPassword}
                                value={confirmPassword}
                                style={{ border: confirm ? "1px solid #E1DFE1" : "1px solid red" }}
                            />
                            <img
                                src="../images/Vector101.png"
                                alt=""
                                className="eye lower"
                                onClick={() => handleInputType(showConfirmPassword, setShowConfirmPassword)}
                            />

                            <button type="submit">Register</button>
                        </form>
                        <p>Already member? <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}><span>Log in</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
