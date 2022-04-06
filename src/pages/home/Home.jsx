import React from "react";
import "./home.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widgets from "../../components/widgets/Widgets";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="widgets__container">
          <Widgets />
          <Widgets />
          <Widgets />
          <Widgets />
        </div>
      </div>
    </div>
  );
};

export default Home;
