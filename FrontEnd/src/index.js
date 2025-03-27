import React from "react";
import ReactDOM from "react-dom";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./style.css";
import Carslookbook from "./views/carslookbook";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Seller from "./views/seller.js";
import "./index.css";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Aboutus from "./views/aboutus.js";
import Cardetails from "./views/cardetail.js";
import Mainbidding from "./views/mainbidding.js";
import Mainseller from "./views/mainseller.js";
import VerifyEmail from "./views/VerifyEmail.js";
import Admin from "./views/admin.js";
import UserProfile from "./views/userprofile.js";
import PaymentForm from "./views/paymentform.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stripe Configuration
const stripePromise = loadStripe("your_publishable_key"); // Replace with your Stripe Publishable Key

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/mainseller" element={<Mainseller />} />
          <Route path="/carslookbook" element={<Carslookbook />} />
          <Route path="/bidding" element={<Mainbidding />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cardetails" element={<Cardetails />} />
          <Route path="/addcars" element={<Seller />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Handle redirects */}
        </Routes>
      </Elements>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
