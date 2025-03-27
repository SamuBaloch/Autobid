import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCarRegistration } from "../Service/api.js"; // Import your backend function
import "./Seller.css";
import Header from "./header.js";

const Seller = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phoneno: "",
    address: "",
    city: "",
    province: "",
    postalcode: "",
    nameofoffering: "",
    estimatedvalue: "",
    brand: "",
    make: "",
    model: "",
    variant: "",
    chassisNumber: "",
    color: "",
    numberPlate: "",
    detaildescription: "",
    biddingDuration: "", // Bidding duration in hours
  });

  const [image, setImage] = useState(null); // State for image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    let isValid = true;

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.phoneno)) {
      toast.error("Please enter a valid 10-digit phone number");
      isValid = false;
    }

    if (formData.address.trim() === "" || formData.city.trim() === "") {
      toast.error("Address and city are required");
      isValid = false;
    }

    if (formData.province.trim() === "") {
      toast.error("Province is required");
      isValid = false;
    }

    if (formData.chassisNumber.trim() === "") {
      toast.error("Chassis number is required");
      isValid = false;
    }

    if (formData.numberPlate.trim() === "") {
      toast.error("Number plate is required");
      isValid = false;
    }

    if (formData.estimatedvalue.trim() === "") {
      toast.error("Please enter an estimated value");
      isValid = false;
    }

    if (formData.biddingDuration.trim() === "" || isNaN(formData.biddingDuration) || formData.biddingDuration <= 0) {
      toast.error("Please enter a valid bidding duration (in hours)");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        let imageUrl = "";

        if (image) {
          const uploadData = new FormData();
          uploadData.append("file", image);
          uploadData.append("upload_preset", "mmoli04q"); // Cloudinary preset

          const response = await fetch("https://api.cloudinary.com/v1_1/dldist5ds/image/upload", {
            method: "POST",
            body: uploadData,
          });

          const data = await response.json();
          imageUrl = data.secure_url;
        }

        const carData = { ...formData, imageUrl };
        const serverResponse = await createCarRegistration(carData);

        if (serverResponse) {
          toast.success("Form submitted successfully!");
          setFormData({
            email: "",
            phoneno: "",
            address: "",
            city: "",
            province: "",
            postalcode: "",
            nameofoffering: "",
            estimatedvalue: "",
            brand: "",
            make: "",
            model: "",
            variant: "",
            chassisNumber: "",
            color: "",
            numberPlate: "",
            detaildescription: "",
            biddingDuration: "",
          });
          Navigate("/mainseller");
        } else {
          toast.error("Submission failed. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during submission. Please try again.");
      }
    } else {
      toast.error("Validation failed. Please check the form fields.");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <br />
      <br />
      <div className="form-container">
        <h2>List Your Car for Auction</h2>
        <p>Enter the details below to advertise your car.</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phoneno"
              placeholder="Phone Number"
              value={formData.phoneno}
              onChange={handleChange}
            />
            <input
              type="file"
              name="carImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalcode"
              placeholder="Postal Code"
              value={formData.postalcode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
            />
            <input
              type="text"
              name="variant"
              placeholder="Variant"
              value={formData.variant}
              onChange={handleChange}
            />
            <input
              type="text"
              name="chassisNumber"
              placeholder="Chassis Number"
              value={formData.chassisNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
            />
            <input
              type="text"
              name="numberPlate"
              placeholder="Number Plate"
              value={formData.numberPlate}
              onChange={handleChange}
            />
            <input
              type="text"
              name="nameofoffering"
              placeholder="Name of Offering"
              value={formData.nameofoffering}
              onChange={handleChange}
            />
            <input
              type="text"
              name="estimatedvalue"
              placeholder="Estimated Value"
              value={formData.estimatedvalue}
              onChange={handleChange}
            />
            <textarea
              name="detaildescription"
              placeholder="Describe your car in detail..."
              value={formData.detaildescription}
              onChange={handleChange}
            />
            <input
              type="number"
              name="biddingDuration"
              placeholder="Bidding Duration (in hours)"
              value={formData.biddingDuration}
              onChange={handleChange}
            />
          </div>
          <button type="submit">List Car for Auction</button>
        </form>
      </div>
    </div>
  );
};

export default Seller;
