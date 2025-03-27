import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Header from "./header";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: {
      country: "US", // Default country
      postalCode: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Call your backend to create a PaymentIntent
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 2000 }), // Example amount: $20.00
      });
      const { clientSecret } = await response.json();

      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: formData.email,
            name: formData.name,
            address: {
              country: formData.address.country,
              postal_code: formData.address.postalCode,
            },
          },
        },
      });

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (err) {
      setMessage(`Payment error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div>
        <div>
          <Header></Header>
        </div>
        <br></br>
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
          <br></br><br></br><br></br>
      <h3>Stripe Payment</h3>
      {/* Email Field */}

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="test@example.com"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Card Information */}
      <label>Card Information</label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        style={{
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Name on Card */}
      <label>Name on Card</label>
      <input
        type="text"
        name="name"
        placeholder="Zhang San"
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Country/Region */}
      <label>Country or Region</label>
      <select
        name="address.country"
        value={formData.address.country}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
        <option value="AU">Australia</option>
        {/* Add more countries as needed */}
      </select>

      {/* Postal Code */}
      <input
        type="text"
        name="address.postalCode"
        placeholder="12345"
        value={formData.address.postalCode}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#5469d4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {message && (
        <p style={{ marginTop: "15px", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </form>
    </div>
  );
};

export default PaymentForm;
