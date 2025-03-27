import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { deleteCarRegistration, selectBid } from "../Service/api"; // Ensure deleteCarRegistration is imported
import "./carslookbook.css";
import Header from "./header";
import "./home.css";
import Popup from "./popup";
import Footer from "./footer1";
// Import the Popup component

const Carslookbook = () => {
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // Track the selected car for bidding
  const [showPopup, setShowPopup] = useState(false); // Track if the popup is visible

  useEffect(() => {
    getCarDetail();
  }, []);

  const getCarDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://localhost:8080/api/carRegistration/carslookbook`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);
      setCarData(result.data || []);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const deleteDetails = async (id) => {
    try {
      await deleteCarRegistration(id);
      setCarData(carData.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car details:", error);
    }
  };

  const openPopup = (car) => {
    setSelectedCar(car);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCar(null);
  };

  const handleSelectBid = async (bid) => {
    try {
      console.log("Selecting bid ID:", bid._id, "for car ID:", selectedCar._id); // Log the bid ID
      await selectBid(selectedCar._id, bid._id); // Call the selectBid function from api.js
      closePopup(); // Refresh car details to reflect the accepted bid
      getCarDetail(); // Refresh car details after selection
    } catch (error) {
      console.error("Error selecting bid:", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Car Lookbook</title>
        <meta property="og:title" content="AutoBid" />
      </Helmet>
      <Header />
      <br></br>
      <br></br><br></br>
      <br></br>
      <div className="car-list">
        {carData.length > 0 ? (
          carData.map((car) => (
            <div key={car._id} className="car-card">
              <img
                src={car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
              />
              <h3>{`${car.make} ${car.brand}`}</h3>
              <h5>{car.model}</h5>
              <p>
                <strong>Estimated Value:</strong> ${car.estimatedvalue}
              </p>
              <p>
                <strong>Description:</strong> {car.detaildescription}
              </p>
              {/* Display bids */}
              <h4>Bids:</h4>
              {car.bids && car.bids.length > 0 ? (
                <div>
                  {car.bids.map((bid) => (
                    <div key={bid._id}>
                      <p>
                        {/* <strong>Bidder:</strong> {bid.bid.bidder.name} - */}
                        <strong> Amount:</strong> ${bid.bid.amount} -
                        <strong> Date:</strong>{" "}
                        {new Date(bid.bid.date).toLocaleDateString()}
                      </p>
                      {bid.bid.status === "Accepted" ? (
                        <button>Bid Accepted</button>
                      ) : bid.bid.status === "Rejected" ? (
                        <button>Bid Rejected</button>
                      ) : (
                        <button onClick={() => openPopup(car)}>
                          Select Bid
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No bids placed.</p>
              )}
              <br></br>
              <button onClick={() => deleteDetails(car._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
      {showPopup && selectedCar && (
        <Popup
          bids={selectedCar.bids}
          onClose={closePopup}
          onSelect={handleSelectBid}
        />
      )}
      <Footer></Footer>
    </div>
  );
};

export default Carslookbook;
