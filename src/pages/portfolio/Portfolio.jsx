import React from "react";
import "./portfolio.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TokenDasboard from "../../components/tokenDashbord/TokenDashboard";
import Carousel from "../../components/carousel/Carousel";
import RightSidebar from "../../components/rightSIdeBar/RightSidebar";

const Portfolio = () => {
  return (
    <div className="portfolio">
      <Sidebar />
      <div className="portfolio__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="widgets__container">
          <Carousel />
        </div>
        <div className="main__container">
          <TokenDasboard />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Portfolio;
