import React from "react";

import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
import BlogPostCard from "../components/blog-post-card";
import CategoryCard from "../components/category-card";
import ItemCard from "../components/item-card";
import SectionHeading from "../components/section-heading";
import "./home.css";
import Footer from "./footer1";
import Mainbidding from "./mainbidding1";

const Home = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div >
      {/* <Helmet>
        <title>AutoBid</title>
        <meta property="og:title" content="AutoBid" />
      </Helmet> */}
      <div className="home-navbar">
        <header data-role="Header" className="home-header max-width-container">
          <div className="home-navbar1">
            <div className="home-middle">
              <div className="home-left">
                <Link to="/mainseller" className="navbar-link">
                  SELLER
                </Link>
                <Link to="/carslookbook" className="navbar-link">
                  CARS LOOKBOOK
                </Link>
                <Link to="/bidding" className="navbar-link">
                  BIDDING
                </Link>
              </div>
              <Link to="/home" className="navbar-logo-title">
                AUTOBID
              </Link>
              <div className="home-right">
                <Link to="/aboutus" className="navbar-link">
                  ABOUT US
                </Link>
                <Link to="/userprofile" className="navbar-link">
                  PROFILE
                </Link>
                
                {/* <span className="navbar-link">BLOG</span> */}
                {/* <span className="navbar-link">CONTACT</span> */}
                {localStorage.getItem("token") ? (
                  <button onClick={handleLogout}>LOGOUT</button>
                ) : (
                  <>
                    <Link to="/login" className="navbar-link">
                      LOGIN
                    </Link>
                    <Link to="/signup" className="navbar-link">
                      SIGN UP
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* <img
                alt="iconsbxscart3271299"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMjQnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTIxLjgyMiA3LjQzMUMyMS42MzUgNy4xNjEgMjEuMzI4IDcgMjEgN0g3LjMzM0w2LjE3OSA0LjIzQzUuODY3IDMuNDgyIDUuMTQzIDMgNC4zMzMgM0gyVjVINC4zMzNMOS4wNzcgMTYuMzg1QzkuMjMyIDE2Ljc1NyA5LjU5NiAxNyAxMCAxN0gxOEMxOC40MTcgMTcgMTguNzkgMTYuNzQxIDE4LjkzNyAxNi4zNTJMMjEuOTM3IDguMzUyQzIyLjA1MiA4LjA0NCAyMi4wMDkgNy43IDIxLjgyMiA3LjQzMVonIGZpbGw9JyMxNjE2MTYnLz4KPHBhdGggZD0nTTEwLjUgMjFDMTEuMzI4NCAyMSAxMiAyMC4zMjg0IDEyIDE5LjVDMTIgMTguNjcxNiAxMS4zMjg0IDE4IDEwLjUgMThDOS42NzE1NyAxOCA5IDE4LjY3MTYgOSAxOS41QzkgMjAuMzI4NCA5LjY3MTU3IDIxIDEwLjUgMjFaJyBmaWxsPScjMTYxNjE2Jy8+CjxwYXRoIGQ9J00xNy41IDIxQzE4LjMyODQgMjEgMTkgMjAuMzI4NCAxOSAxOS41QzE5IDE4LjY3MTYgMTguMzI4NCAxOCAxNy41IDE4QzE2LjY3MTYgMTggMTYgMTguNjcxNiAxNiAxOS41QzE2IDIwLjMyODQgMTYuNjcxNiAyMSAxNy41IDIxWicgZmlsbD0nIzE2MTYxNicvPgo8L3N2Zz4K"
                className="home-image1"
              />
              <img
                alt="iconsbxsheartcircle3271300"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMjQnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyIDJDNi40ODYgMiAyIDYuNDg2IDIgMTJDMiAxNy41MTQgNi40ODYgMjIgMTIgMjJDMTcuNTE0IDIyIDIyIDE3LjUxNCAyMiAxMkMyMiA2LjQ4NiAxNy41MTQgMiAxMiAyWk0xNi4xODYgMTIuNzRMMTIgMTYuOTI2TDcuODE0IDEyLjc0QzYuNzI1IDExLjY1MiA2LjcyNSA5LjkyNyA3LjgxNCA4LjgzM0M4LjkwOCA3Ljc0NSAxMC42MzIgNy43NDUgMTEuNzIgOC44MzNMMTIgOS4xMTJMMTIuMjc5IDguODMzQzEzLjM2NyA3Ljc0NSAxNS4wOTIgNy43NDUgMTYuMTg1IDguODMzQzE3LjI3NCA5LjkyNyAxNy4yNzQgMTEuNjUxIDE2LjE4NiAxMi43NFonIGZpbGw9JyMxNjE2MTYnLz4KPC9zdmc+Cg=="
                className="home-image2"
              />
              <img
                alt="AccountCircle3271301"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjQnIGhlaWdodD0nMjQnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KPHBhdGggZD0nTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNUMxMy42NiA1IDE1IDYuMzQgMTUgOEMxNSA5LjY2IDEzLjY2IDExIDEyIDExQzEwLjM0IDExIDkgOS42NiA5IDhDOSA2LjM0IDEwLjM0IDUgMTIgNVpNMTIgMTkuMkM5LjUgMTkuMiA3LjI5IDE3LjkyIDYgMTUuOThDNi4wMyAxMy45OSAxMCAxMi45IDEyIDEyLjlDMTMuOTkgMTIuOSAxNy45NyAxMy45OSAxOCAxNS45OEMxNi43MSAxNy45MiAxNC41IDE5LjIgMTIgMTkuMlonIGZpbGw9JyMxNjE2MTYnLz4KPC9zdmc+Cg=="
                className="home-image3"
              /> */}
          </div>
          <div data-role="BurgerMenu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-nav">
              <div className="home-container02">
                <span className="home-logo-center1">AutoBid</span>
                <div
                  data-role="CloseMobileMenu"
                  className="home-close-mobile-menu"
                >
                  <svg viewBox="0 0 1024 1024" className="home-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <div className="home-middle1">
                <span className="home-text06">ADD CARS</span>
                <span className="home-text07">CARS LOOKBOOK</span>
                <span className="home-text08">SPECIAL</span>
                <span className="home-text09">ABOUT</span>
                <span className="home-text10">BLOG</span>
                <span className="home-text11">CONTACT</span>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon04">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon06">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="home-icon08">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
      </div>
      <br></br><br></br><br></br><br></br>
      <div className="home-main">
        <div className="home-hero section-container">
          <div className="home-max-width max-width-container">
            <div className="home-hero1">
              <div className="home-container03">
                <div className="home-info">
                  <img
                    alt="Rectangle43271305"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMicgaGVpZ2h0PSc1Micgdmlld0JveD0nMCAwIDIgNTInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxyZWN0IHdpZHRoPScyJyBoZWlnaHQ9JzUyJyBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScwLjUnLz4KPC9zdmc+Cg=="
                    className="home-image4"
                  />
                  <span className="home-text12">
                    <span>Biding</span>
                    <br></br>
                    <span>trends - 2024</span>
                  </span>
                </div>
                <h1 className="home-text16">AutoBid</h1>
                <div className="home-container04"></div>
                <div className="home-btn-group">
              <Link  to="/bidding">   <button className="button">Explore the collection</button></Link> 
                </div>
              </div>
              <img
                alt="image23271449"
                src="https://images.unsplash.com/photo-1592334802311-090b88b9f252?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE2M3x8Y2FyJTIwfGVufDB8fHx8MTcxODUyMjY0Mnww&amp;ixlib=rb-4.0.3&amp;w=600"
                className="home-image5"
              />
            </div>
          </div>
        </div>
        <div className="section-container column">
          <div className="home-max-width1 max-width-container">
            <SectionHeading
              heading="SHOP BY CATEGORIES"
              subtitle="Start biding based on the categories you are interested in"
            ></SectionHeading>
            <div className="home-cards-container">
              <CategoryCard
                name="Cars"
                categoryImg="https://images.unsplash.com/photo-1534093607318-f025413f49cb?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ3fHxjYXJzfGVufDB8fHx8MTcxODUyMjg0MHww&amp;ixlib=rb-4.0.3&amp;w=1500"
                rootClassName="category-card-root-class-name2"
              ></CategoryCard>
              <CategoryCard
                name="SUVS"
                categoryImg="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDF8fFNVVlN8ZW58MHx8fHwxNzE4NTIyODg0fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
                rootClassName="category-card-root-class-name1"
              ></CategoryCard>
              <CategoryCard
                name="Trucks"
                categoryImg="https://images.unsplash.com/photo-1616340786004-7c444e530ce3?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQwfHx0cnVja3N8ZW58MHx8fHwxNzE4NTIyOTU3fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
                rootClassName="category-card-root-class-name"
              ></CategoryCard>
            </div>
          </div>
          <div className="home-banner">
            <div className="home-container05">
              <h3 className="home-text17">AutoBid</h3>
            </div>
          </div>
          <div className="home-container06 max-width-container">
            <div className="home-container07">
              <span className="home-text18">
                AutoBidis a premier online platform for car auctions, connecting
                buyers and sellers since 2005. We provide a wide selection of
                vehicles, transparent bidding processes, and competitive prices.
                Our website features the latest auction listings, upcoming
                events, and exclusive deals. Visitors can browse through various
                car makes and models, participate in live auctions, and find
                their dream vehicle at BidCar.
              </span>
              <img
                alt="M3271427"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTk5JyBoZWlnaHQ9JzIwMCcgdmlld0JveD0nMCAwIDE5OSAyMDAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxwYXRoIGQ9J00zNy4zMDI2IDcxLjI5MjVMOTkuMzgyNyAxODIuMzEzTDE2MS40NjMgNzEuMjkyNUwxNzUuNjIyIDIwMEgxOTguNzY1TDE3NS42MjIgMEw5OS4zODI3IDEzNy45NTlMMjMuMTQzOSAwTDAgMjAwSDIzLjE0MzlMMzcuMzAyNiA3MS4yOTI1WicgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMC4wNicvPgo8L3N2Zz4K"
                className="home-svg"
              />
           <Link to='/aboutus'>  <button className="button">Read more</button></Link> 
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="max-width-container">
            <SectionHeading
              heading="Trending Bids"
              subtitle="Discover our top-selling cars of the month, latest arrivals, and exclusive deals from AutoBid that you won't want to miss"
            ></SectionHeading>
            <div className="home-gallery">
              <Mainbidding></Mainbidding>
            </div>
          </div>
        </div>
        <div className="home-full-width-banner section-container">
          <div className="home-left4">
            <div className="home-content">
              <span className="home-text19">LOOKBOOKS</span>
            </div>
            <div className="home-btn button">
          <Link to='/carslookbook'>    <span className="home-text20">Explore now</span></Link>
            </div>
          </div>
          <img
            alt="Rectangle13271410"
            src="https://images.unsplash.com/photo-1597220602515-eb4471175886?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ0fHxyYW5nZSUyMHJvdmVyfGVufDB8fHx8MTcxODUyNDE0Nnww&amp;ixlib=rb-4.0.3&amp;w=1500"
            className="home-image6"
          />
        </div>
        <div className="section-container">
          <div className="max-width-container">
            <SectionHeading
              heading="Our blog"
              subtitle="Read the latest news and Auction related articles"
              rootClassName="section-heading-root-class-name"
            ></SectionHeading>
            <div className="home-container08">
              <BlogPostCard
                imageSrc="https://images.unsplash.com/photo-1513036191774-b2badb8fcb76?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEzfHxjYXJzfGVufDB8fHx8MTcxODUyMjgzMnww&amp;ixlib=rb-4.0.3&amp;w=1500"
                rootClassName="blog-post-card-root-class-name"
                description="Click the link to read more"
                newProp="Upcoming Bids of this month"
              ></BlogPostCard>
              <BlogPostCard
                title="Unique natural color combinations"
                newProp="Unique natural color combinations"
                imageSrc="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDZ8fGNhcnN8ZW58MHx8fHwxNzE4NTIyODMyfDA&amp;ixlib=rb-4.0.3&amp;w=1500"
                description="Click the Link to read more"
              ></BlogPostCard>
              <BlogPostCard
                title="Special combinations for nature lovers"
                newProp="Special combinations for nature lovers"
                imageSrc="https://images.unsplash.com/photo-1567818735868-e71b99932e29?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDMwfHxjYXJzfGVufDB8fHx8MTcxODUyMjg0MHww&amp;ixlib=rb-4.0.3&amp;w=1500"
                description="Click the link for further information"
              ></BlogPostCard>
            </div>
          </div>
        </div>
      </div>
      <div >
        <div >
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
