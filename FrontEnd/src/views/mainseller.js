import React, { useState } from 'react';
import './mainseller.css';
import Header from './header';
import { Link } from 'react-router-dom';
import Carslookbook from './carslookbook1';
import Footer from './footer1';
// import Footer from './footer'

export default function Mainseller() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal handlers
  const openModal = (title, description) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Add car to watchlist
  const addToWatchlist = (car) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, car]);
  };

  // Remove car from watchlist
  const removeFromWatchlist = (index) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((_, i) => i !== index));
  };

  // Add bid to bids section
  const addBid = (car) => {
    setBids((prevBids) => [...prevBids, car]);
  };

  // Example cars for demonstration
  const exampleCars = [
    { title: '2021 Tesla Model 3', bid: 50000 ,src:'https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/NhM3iXT7RZOIckqmuxJX' },
    { title: '2020 BMW X5', bid: 45000 ,src:'https://www.europeanprestige.co.uk/blobs/stock/112/images/97a47c1f-c4db-4e62-981c-b70419822dce/1j6a5823-2.jpg?width=2000&height=1333" alt="Car Image" className="w-full h-40 object-cover rounded-md mb-4' }
  ];

  // Add example cars to watchlist and bids on component load
  React.useEffect(() => {
    exampleCars.forEach((car) => {
      addToWatchlist(car);
      addBid(car);
    });
  }, []);

  // Filter cars based on search input
  const filteredWatchlist = watchlist.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredBids = bids.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-8">
        <section className="mb-8">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2 className="text-xl font-semibold mb-4">Welcome, Seller!</h2>
          <p className="text-muted-foreground">Track your bids and manage your watchlist.</p>
        </section>
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            
            <select className="bg-input text-foreground p-2 rounded-lg ml-4 border border-border focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Filter by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Listings</option>
            </select>
          </div>
        </section>
        <section className="mb-8">
       <Link to="/addcars"> <button className="bg-accent text-accent-foreground hover:bg-accent/80 p-4  md:w-auto">
        Add New Car
        </button></Link>
                      <br></br>
                      <br></br>
          <h3 className="text-lg font-semibold mb-4">Featured Cars</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card p-4 rounded-lg shadow-md">
              <img src="https://media.ed.edmunds-media.com/audi/a6/2022/oem/2022_audi_a6_sedan_prestige_fq_oem_1_1600.jpg" alt="Featured Car Image" className="w-full h-40 object-cover rounded-md mb-4" />
              <h4 className="text-lg font-bold mb-2">2022 Audi A6</h4>
              <p className="text-muted-foreground mb-2">Starting Bid: 60,000 Pkr</p>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg w-full" onClick={() => openModal('2022 Audi A6', 'Starting Bid: $60,000')}>
                View Details
              </button>
            </div>
          </div>
        </section>
        <section className="mb-8">
            <br></br>
          <h3 className="text-lg font-semibold mb-4">Your Cars</h3>
          <div id="watchlist" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Carslookbook></Carslookbook>
          </div>
        </section>
        <section className="mt-8">
            <br></br>
          <h3 className="text-lg font-semibold mb-4">Your Bids</h3>
          <div id="bids" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBids.map((car, index) => (
              <div key={index} className="bg-card p-4 rounded-lg shadow-md" title={car.title}>
                <img src={car.src} />
                <h4 className="text-lg font-bold mb-2">{car.title}</h4>
                <p className="text-muted-foreground mb-2">Your Bid: {car.bid} Pkr</p>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg w-full" onClick={() => openModal(car.title, `Your Bid: $${car.bid}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-8">
            <br></br>
          <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg shadow-md">
              <p className="text-muted-foreground mb-2">"Car Auction Hub made buying my dream car a breeze. Highly recommend!"</p>
              <span className="font-semibold">- Alex J.</span>
            </div>
            <br></br>
            <div className="bg-card p-4 rounded-lg shadow-md">
              <p className="text-muted-foreground mb-2">"Great platform with excellent customer service."</p>
              <span className="font-semibold">- Jamie L.</span>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <br></br>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-muted-foreground">Car Auction Hub is a leading online marketplace for car enthusiasts and buyers. Our mission is to provide a seamless and transparent car buying experience.</p>
        </section>
      </main>
      <Footer></Footer>
      {modalVisible && (
        <div id="carModal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-card p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 id="modalTitle" className="text-xl font-bold mb-4">{modalTitle}</h2>
            <p id="modalDescription" className="text-muted-foreground mb-4">{modalDescription}</p>
            <button className="bg-destructive text-destructive-foreground hover:bg-destructive/80 p-2 rounded-lg w-full" onClick={closeModal}>
              Close
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}
