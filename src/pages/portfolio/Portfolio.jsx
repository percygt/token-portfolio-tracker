import React from "react";
import "./portfolio.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widget";
import Watchlist from "../../components/watchlist/Watchlist";
import Balance from "../../components/balance/Balance";
import Holdings from "../../components/holdings/Holdings";
import Transaction from "../../components/transaction/Transaction";

const Home = () => {
  return (
    <div className="portfolio">
      <Sidebar />
      <div className="portfolio__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="widgets__container">
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
        <div className="main__container">
          <Holdings />
          <Balance />
          <Watchlist />
          <Transaction />
        </div>
      </div>
    </div>
  );
};

export default Home;
