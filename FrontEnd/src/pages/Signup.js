import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../index.css";
import { handleError, handleSuccess } from "../utils";
import Header from "../views/header";
import "./Signup.css";
import Footer from "../views/footer1";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
  });
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [suggestedDomains] = useState(["@gmail.com", "@yahoo.com", "@outlook.com"]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });

    if (name === "email" && value.includes("@")) {
      setShowEmailSuggestions(false);
    } else if (name === "email") {
      setShowEmailSuggestions(true);
    }
  };

  const handleEmailSuggestionClick = (suggestion) => {
    setSignupInfo((prevState) => ({
      ...prevState,
      email: prevState.email.split("@")[0] + suggestion,
    }));
    setShowEmailSuggestions(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    if (!emailRegex.test(email)) return false;

    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, cnic } = signupInfo;
  
    if (!name || !email || !password || !cnic) {
      return handleError("All fields are required");
    }
  
    if (password !== signupInfo.confirmPassword) {
      return handleError("Passwords do not match");
    }
  
    if (!validateEmail(email)) {
      return handleError(
        "Please enter a valid email address with one of the following domains: @gmail.com, @yahoo.com, @outlook.com"
      );
    }
  
    if (!/^\d{13}$/.test(cnic)) {
      return handleError("Please enter a valid 13-digit CNIC number");
    }
  
    // Password validation: at least 8 characters and one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return handleError(
        "Password must be at least 8 characters long and include at least one special character"
      );
    }
  
    // Exclude confirmPassword from signupInfo before sending to the backend
    const { confirmPassword, ...signupData } = signupInfo;
  
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred");
    }
  };
  

  return (
    <div>
      <Header></Header>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <div className="signup-page">
      <div className="signup-container">
        <div className="signup-image-container">
          <img
            src="https://applescoop.org/image/wallpapers/iphone/supercars-super-car-luxury-motors-mobile-wallpaper-red-sky-high-res-31-10-2024-1730435521-hd-wallpaper.jpg"
            alt="Car"
            className="signup-image"
          />
          <h2 className="signup-image-text">Join Us and Explore the Best Car Auctions!</h2>
        </div>
        <div className="signup-form-container">
          <div className="signup-box">
            <h1>Create an Account</h1>
            <form onSubmit={handleSignup}>
              <div className="input-group">
                <label htmlFor="name">User Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter your user name..."
                  value={signupInfo.name}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={signupInfo.email}
                  className="input-field"
                  required
                />
                {showEmailSuggestions && (
                  <ul className="email-suggestions">
                    {suggestedDomains.map((domain) => (
                      <li
                        key={domain}
                        onClick={() => handleEmailSuggestionClick(domain)}
                        className="email-suggestion-item"
                      >
                        {signupInfo.email.split("@")[0] + domain}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={signupInfo.password}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password..."
                  value={signupInfo.confirmPassword}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="cnic">CNIC</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="cnic"
                  placeholder="Enter your 13-digit CNIC..."
                  value={signupInfo.cnic}
                  className="input-field"
                  required
                />
              </div>
              {/* <div className="input-group">
                <label htmlFor="address">Address</label>
                <textarea
                  onChange={handleChange}
                  name="address"
                  placeholder="Enter your address..."
                  value={signupInfo.address}
                  className="input-field"
                  rows="3"
                  required
                ></textarea>
              </div> */}
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
            <div className="login-link">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Signup;
