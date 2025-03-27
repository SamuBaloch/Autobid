import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // Send token to the backend for verification
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/verify", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: { token }, // Attach the token as a query parameter
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message); // Success message
          setSuccess(true);
        } else {
          setMessage(data.message || "Verification failed. Please try again.");
          setSuccess(false);
        }
      } catch (error) {
        setMessage("An error occurred while verifying your email.");
        setSuccess(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage("No verification token found.");
      setSuccess(false);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={{ color: success ? "green" : "red" }}>{message}</h1>
      {success && (
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default VerifyEmail;
