import React, { useState } from "react";
import { placeBid } from "../Service/api.js";
import "./bidding.css"; // Link to the external CSS file
import Header from "./header.js";

// Utility function to format currency in PKR
const formatCurrency = (value) => {
  const conversionRate = 300; // USD to PKR conversion rate
  const convertedValue = value * conversionRate; // Convert USD to PKR
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(convertedValue);
};

// Image Component
const CarImage = ({ src, alt }) => (
  <div className="bidding-image-container">
    <img src={src} alt={alt} />
  </div>
);

// Bid Info Component
const BidInfo = ({ currentBid, minIncrement }) => (
  <div className="bidding-details">
    <p>
      Current Bid: <strong>{formatCurrency(currentBid)}</strong>
    </p>
    <p>
      Minimum Bid Increment: <strong>{formatCurrency(minIncrement)}</strong>
    </p>
  </div>
);

// Bid Input Component
const BidInput = ({
  minBid,
  step,
  onBidChange,
  onPlaceBid,
  bid,
  isLoading,
}) => (
  <div>
    <input
      type="number"
      min={minBid}
      step={step}
      className="bidding-input"
      placeholder={`Min Bid: ${formatCurrency(minBid)}`}
      value={bid}
      onChange={onBidChange}
    />
    <button
      className="bidding-button"
      onClick={onPlaceBid}
      disabled={isLoading}
    >
      {isLoading ? "Placing..." : "Place Bid"}
    </button>
  </div>
);

// Main Bidding Component for Multiple Cars
const Bidding = () => {
  const [bid, setBid] = useState("");
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Car Model 1",
      year: 2020,
      mileage: "10,000 miles",
      currentBid: 20000,
      minIncrement: 1000,
      image: "https://example.com/car-model-1.jpg",
    },
    {
      id: 2,
      name: "Car Model 2",
      year: 2019,
      mileage: "15,000 miles",
      currentBid: 18000,
      minIncrement: 800,
      image: "https://example.com/car-model-2.jpg",
    },
    // Add more cars as needed
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleBidChange = (e) => setBid(e.target.value);

  const handlePlaceBid = async (carId, currentBid, minIncrement) => {
    if (isLoading) return;
    setIsLoading(true);

    const bidValue = parseFloat(bid);
    const minBid = currentBid + minIncrement;

    if (isNaN(bidValue) || bidValue < minBid) {
      alert(`Please enter a valid bid of at least ${formatCurrency(minBid)}`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await placeBid(carId, bidValue, "Arsal");
      if (response && response.success) {
        alert(`Bid placed successfully: ${formatCurrency(bidValue)}`);
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === carId ? { ...car, currentBid: bidValue } : car
          )
        );
      } else {
        alert("Bid placement failed. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the bid:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="bidding-container">
        <div className="bidding-grid">
          {cars.map((car) => (
            <div key={car.id} className="bidding-card">
              <CarImage src={car.image} alt={car.name} />
              <div className="bidding-text-container">
                <h2 className="bidding-title">{car.name}</h2>
                <p className="bidding-details">Year: {car.year}</p>
                <p className="bidding-details">Mileage: {car.mileage}</p>
                <BidInfo
                  currentBid={car.currentBid}
                  minIncrement={car.minIncrement}
                />
                <BidInput
                  minBid={car.currentBid + car.minIncrement}
                  step={car.minIncrement}
                  onBidChange={handleBidChange}
                  onPlaceBid={() =>
                    handlePlaceBid(car.id, car.currentBid, car.minIncrement)
                  }
                  bid={bid}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bidding;
