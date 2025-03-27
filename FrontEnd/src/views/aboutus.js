import React from "react";
import Header from "./header";
import './about.css';
import Footer from "./footer1";
import { Link } from "react-router-dom";
export default function Aboutus() {
    return (
     <div>
        <div>
            <Header></Header>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
         <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          
          {/* About Section */}
          <section className="bg-gradient-to-r from-zinc-600 to-zinc-800 text-white py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About AutoBid</h1>
              <p className="text-xl mb-8">Revolutionizing the Car Auction Industry Since 2010</p>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-3 md:p-4 rounded-lg">
                <a href="/bidding">Explore Our Auctions</a>
              </button>
            </div>
          </section>
  
          {/* Journey Section */}
          <br></br>
          <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4">
                    Founded in 2010, AutoBid has transformed the car auction landscape by pioneering a state-of-the-art online platform. Our mission is to create a transparent, efficient, and accessible marketplace for automotive enthusiasts, dealers, and private sellers worldwide.
                  </p>
                  <p className="text-lg">
                    With over a decade of experience, we've facilitated the sale of more than 500,000 vehicles, connecting buyers with their dream cars and helping sellers maximize their returns. At AutoBid, we're not just an auction house – we're building a global community of car aficionados.
                  </p>
                </div>
                <div className="relative h-64 md:h-full">
                  <img src="https://c1india.com/wp-content/uploads/2020/05/Bidding-process.jpg" alt="Classic car auction" className="rounded-lg shadow-lg object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </section>
  
          {/* Auction Process Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Auction Process</h2>
              <br></br>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { step: "Step 1: Registration", description: "Create an account on AutoBid to start participating in auctions. Our user-friendly registration process ensures you can quickly get started." },
                  { step: "Step 2: Browse Auctions", description: "Explore a wide range of vehicles available for auction. Use our advanced filters to find the perfect car that meets your needs." },
                  { step: "Step 3: Place Your Bid", description: "Once you've found a car you like, place your bid. Our real-time bidding system ensures a fair and transparent process." },
                  { step: "Step 4: Win and Purchase", description: "If you win the auction, complete the purchase through our secure payment gateway. Enjoy your new vehicle with peace of mind." }
                ].map((item, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{item.step}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
                    <br></br>
          {/* Why Choose AutoBid Section */}
          <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Why Choose AutoBid?</h2>
              <br></br>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Trusted Platform", description: "AutoBid is a trusted name in the car auction industry, known for its transparency and reliability." },
                  { title: "Wide Selection", description: "We offer a diverse range of vehicles, from classic cars to modern models, ensuring there's something for everyone." },
                  { title: "Expert Support", description: "Our team of experts is available to assist you at every step, ensuring a smooth and enjoyable auction experience." }
                ].map((item, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
                    <br></br>
          {/* Quality Assurance Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Quality Assurance</h2>
              <br></br>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 md:h-full">
                  <img src="https://media.istockphoto.com/id/1213172042/vector/car-diagnostics-magnifie-key-checklist.jpg?s=612x612&w=0&k=20&c=qRVUFjUngWI1I3vcE7KM2pHW11OENWtSBm4udePWkWw=" alt="Vehicle inspection" className="rounded-lg shadow-lg object-cover w-full h-full" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Our 150-Point Inspection Process</h3>
                  <p className="text-lg mb-4">
                    At AutoBid, we're committed to transparency and quality. Every vehicle listed on our platform undergoes a rigorous 150-point inspection conducted by certified mechanics. This process ensures that you have a comprehensive understanding of the vehicle's condition before placing your bid.
                  </p>
                  <p className="text-lg">
                    Our inspection covers everything from the engine and transmission to the interior and exterior condition. Detailed reports, including high-resolution photos, are made available to all potential buyers, giving you the confidence to bid on your dream car, regardless of its location.
                  </p>
                </div>
              </div>
            </div>
          </section>
  
          {/* Customer Testimonials Section */}
          <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4">
                <br></br>
              <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
              <br></br>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { quote: "AutoBid made the car buying process so easy and transparent. I found my dream car and couldn't be happier!", name: "Alex Johnson" },
                  { quote: "The inspection reports were incredibly detailed, giving me the confidence to bid on a car located miles away.", name: "Sarah Lee" },
                  { quote: "I've sold multiple cars through AutoBid and always received great returns. Highly recommend their platform!", name: "Michael Smith" }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                    <span className="block mt-4 text-primary-foreground font-semibold">- {testimonial.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
                    <br></br>
          {/* Call to Action Section */}
          <section className="py-16 bg-zinc-600 text-white">
            <div className="container mx-auto px-4 text-center">
              {/* <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2> */}
              <p className="text-xl mb-8">Join AutoBid today and start your journey towards owning the perfect vehicle.</p>
              <button className="bg-accent text-accent-foreground hover:bg-accent/80 p-3 md:p-4 rounded-lg">
                <a href="/signup">Get Started</a>
              </button>
            </div>
          </section>
  
        </main>
      </div>
      <Footer></Footer>
     </div>
    );
  }
  