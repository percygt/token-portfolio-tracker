import React from "react";
import "./home.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">container</div>
      {/* <Navbar /> */}
    </div>
  );
};

export default Home;
