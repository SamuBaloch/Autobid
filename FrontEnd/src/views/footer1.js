import React from "react";
import "./footer1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/bidding">Current Auctions</a></li>
            <li><a href="addcars">Sell Your Car</a></li>
            <li><a href="aboutus">How It Works</a></li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Auction Lane<br />Car City, ST 12345</p>
          <p>Phone: (555) 123-4567</p>
          <p>Email: <a href="mailto:info@carauctions.com">info@carauctions.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest auctions and car news.</p>
          <form>
            
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AutoBid. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
