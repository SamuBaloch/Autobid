import React, { useState } from "react";
import "./admin.css";
import { FaCar, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // State to manage active section

  const dashboardData = [
    {
      title: "Total Cars",
      icon: <FaCar />,
      value: 245,
      description: "+20% from last month",
    },
    {
      title: "Active Auctions",
      icon: <FaClock />,
      value: 15,
      description: "5 ending in 24 hours",
    },
    {
      title: "Total Revenue",
      icon: <FaDollarSign />,
      value: "$45,231.89",
      description: "+15% from last month",
    },
    {
      title: "Active Users",
      icon: <FaUsers />,
      value: 573,
      description: "+201 since last hour",
    },
  ];

  const pendingCars = [
    { make: "Toyota", model: "Camry", year: 2020, seller: "John Doe" },
    { make: "Honda", model: "Civic", year: 2019, seller: "Jane Smith" },
    { make: "Ford", model: "Mustang", year: 2021, seller: "Bob Johnson" },
  ];

  const manageAuctions = [
    {
      make: "BMW",
      model: "3 Series",
      year: 2021,
      currentBidUSD: "$35,000.00",
      currentBidPKR: "PKR 10,045,000.00",
      endTime: "2023-06-18 15:00",
    },
    {
      make: "Mercedes",
      model: "C-Class",
      year: 2020,
      currentBidUSD: "$32,000.00",
      currentBidPKR: "PKR 9,184,000.00",
      endTime: "2023-06-19 14:00",
    },
    {
      make: "Audi",
      model: "A4",
      year: 2022,
      currentBidUSD: "$38,000.00",
      currentBidPKR: "PKR 10,906,000.00",
      endTime: "2023-06-20 16:00",
    },
  ];

  const payments = [
    {
      amountUSD: "$32,000.00",
      amountPKR: "PKR 9,184,000.00",
      type: "Incoming",
      status: "Completed",
      date: "2023-06-15",
    },
    {
      amountUSD: "$28,500.00",
      amountPKR: "PKR 8,179,500.00",
      type: "Outgoing",
      status: "Pending",
      date: "2023-06-16",
    },
    {
      amountUSD: "$45,000.00",
      amountPKR: "PKR 12,915,000.00",
      type: "Incoming",
      status: "Completed",
      date: "2023-06-14",
    },
  ];

  return (
    <div className="admin">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection("Dashboard")}>📊 Dashboard</li>
          <li onClick={() => setActiveSection("Pending Cars")}>🚗 Pending Cars</li>
          <li onClick={() => setActiveSection("Manage Auctions")}>🔨 Manage Auctions</li>
          <li onClick={() => setActiveSection("Payments")}>💳 Payments</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Conditional Rendering for Each Section */}
        {activeSection === "Dashboard" && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-cards">
              {dashboardData.map((data, index) => (
                <div key={index} className="card">
                  <div className="card-header">
                    <span className="card-icon">{data.icon}</span>
                    <h3>{data.title}</h3>
                  </div>
                  <div className="card-content">
                    <h1>{data.value}</h1>
                    <p>{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "Pending Cars" && (
          <div className="pending-cars">
            <h2>Pending Cars</h2>
            <div className="pending-cars-list">
              {pendingCars.map((car, index) => (
                <div key={index} className="car-card">
                  <h3>{`${car.make} ${car.model} (${car.year})`}</h3>
                  <p>Seller: {car.seller}</p>
                  <div className="actions">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "Manage Auctions" && (
          <div className="manage-auctions">
            <h2>Manage Auctions</h2>
            <table className="auction-table">
              <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Current Bid (USD)</th>
                  <th>Current Bid (PKR)</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {manageAuctions.map((auction, index) => (
                  <tr key={index}>
                    <td>{auction.make}</td>
                    <td>{auction.model}</td>
                    <td>{auction.year}</td>
                    <td>{auction.currentBidUSD}</td>
                    <td>{auction.currentBidPKR}</td>
                    <td>{auction.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Payments" && (
          <div className="payments">
            <h2>Payments</h2>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Amount (USD)</th>
                  <th>Amount (PKR)</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.amountUSD}</td>
                    <td>{payment.amountPKR}</td>
                    <td>{payment.type}</td>
                    <td>{payment.status}</td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
