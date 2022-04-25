import React from "react";
import "./portfolio.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetDashboard from "../../components/widgetDashboard/WidgetDashboard";
import TokenDasboard from "../../components/tokenDashbord/TokenDashboard";

const Portfolio = () => {
  return (
    <div className="portfolio">
      <Sidebar />
      <div className="portfolio__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="widgets__container">
          <div className="widgets_label">Top 10 Crypto</div>
          <WidgetDashboard />
        </div>
        <div className="main__container">
          <TokenDasboard />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
