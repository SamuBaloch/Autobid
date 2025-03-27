import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../index.css"; // Assuming you have global styles here
import { handleError, handleSuccess } from "../utils";
import Header from "../views/header";
import "./Login.css"; // Add your login-specific styles here
import Footer from "../views/footer1";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error, id } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userId", id);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <Header></Header>
      <br />
      <br />
      <br />
      <div className="login-page">
        <div className="login-container">
          <div className="login-image-container">
            <img
              src="https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/muscle-car-chromebook-wallpaper.jpg"
              alt="Car"
              className="login-image"
            />
            <h2 className="login-image-text">Login to Join the Best Car Auctions!</h2>
          </div>
          <div className="login-form-container">
            <div className="login-box">
              <h1>Login to AutoBid</h1>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={loginInfo.email}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={loginInfo.password}
                    className="input-field"
                  />
                </div>
                <button type="submit" className="login-btn">
                  Login
                </button>
              </form>
              <div className="signup-link">
                <span>
                  Don’t have an account? <Link to="/signup">Sign up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
