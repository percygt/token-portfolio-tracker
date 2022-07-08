import React from "react";
import "./App.scss";
import Home from "./pages/home/Home";
import Portfolio from "./pages/portfolio/Portfolio";
import Swap from "./pages/swap/Swap";
import Tools from "./pages/tools/Tools";
import About from "./pages/about/About";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import Layout from "./Layout";
import New from "./pages/new/New";

const App = ({ isServerInfo }) => {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    account: walletAddress,
  } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio">
            <Route path="new" index element={<New />} />
            <Route path=":address">
              <Route path="chain/:chain" element={<Portfolio />} />
              <Route path="nft" element={<Portfolio />}>
                <Route path="chain/:chain" element={<Portfolio />} />
              </Route>
            </Route>
          </Route>
          <Route path="swap" element={<Swap />} />
          <Route path="tools" element={<Tools />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
