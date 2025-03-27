import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAcceptedBids } from "../Service/api";
import Header from "./header";
import "./mainbidding.css";
import Footer from "./footer1";

export default function Mainbidding() {
  useEffect(() => {
    getAllCars();
    getBids();
  }, []);

  const [getCars, setCars] = useState([]);
  const [acceptedBids, setAcceptedBids] = useState([]); // State to hold accepted bids
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const getAllCars = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/carRegistration/all`
      );
      const filteredCars = result.data.filter((car) => car.userId !== userId); // Assuming the car object has an ownerId field
      setCars(filteredCars || []);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const getBids = async () => {
    try {
      const acceptedBidsData = await getAcceptedBids(); // Directly use returned data
      setAcceptedBids(acceptedBidsData); // Set accepted bids state
      console.log("Accepted Bids:", acceptedBidsData);
    } catch (error) {
      console.error("Error fetching accepted bids:", error);
      // Handle the case where no bids are found gracefully if needed
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-background">
        <Header></Header>

        <header>
          <h5 className="text-3xl font-bold">Car Auction Platform</h5>
        </header>
        <br />

        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">Featured Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {getCars.map((car) => (
              <Card key={car._id} car={car} acceptedBids={acceptedBids} />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

function Card({ car, acceptedBids }) {
  const imageStyle = {
    width: "300px",
    height: "200px",
  };

  // Log the accepted bids and car for debugging
  console.log("Accepted Bids:", acceptedBids);
  console.log("Current Car:", car);

  // Find if there’s a bid for this car by the current user, safely using optional chaining
  const userBid = acceptedBids.find(
    (bid) => bid?.bid?.carid === car._id
  );
  
  // Log userBid for debugging
  console.log("User Bid:", userBid);

  // Determine button content based on bid status and car status
  let buttonContent;

  if (car.status === "available") {
    // Car is available, allow placing a bid
    buttonContent = (
      <Link to={`/cardetails`} state={{ car }}>
        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/80 transition-all w-full">
          Place Bid
        </button>
      </Link>
    );
  } else {
    // Car is unavailable
    if (userBid) {
      // Check the status of the user's bid
      if (userBid.bid.status === "Accepted") {
        buttonContent = (
          <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
            Accepted
          </button>
        );
      } else if (userBid.bid.status === "Rejected") {
        buttonContent = (
          <button className="bg-red-600 text-white px-4 py-2 rounded-md w-full cursor-not-allowed">
            Rejected
          </button>
        );
      } else if (userBid.bid.status === "Pending") {
        buttonContent = (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full cursor-not-allowed">
            Pending
          </button>
        );
      }
    } else {
      // No bid by this user and the car is unavailable, show "Sold Out"
      buttonContent = (
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md w-full cursor-not-allowed">
          Sold Out
        </button>
      );
    }
  }

  return (
    <div>
      <div
        className="bg-card text-card-foreground rounded-lg shadow w-72"
        key={car._id}
      >
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.brand}`}
          style={imageStyle}
          className="object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {`${car.make.toUpperCase()} ${car.brand.toUpperCase()}`}
          </h2>
          <p className="text-muted-foreground">Year: {car.model}</p>
          {buttonContent}
        </div>
      </div>
    </div>
  );
}
