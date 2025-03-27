import React from "react";
import "./Popup.css"; // Import your CSS file

const Popup = ({ bids, onClose, onSelect }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Select a Bid</h3>
        {bids.map((bid) => (
          <div key={bid._id} className="bid-option">
            <p>
              <strong>Bidder:</strong> {bid.bid.bidder.name} -
              <strong> Amount:</strong> ${bid.bid.amount}
            </p>
            <button onClick={() => onSelect(bid)}>Select</button>
          </div>
        ))}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
