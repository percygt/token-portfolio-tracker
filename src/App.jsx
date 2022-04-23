import React from "react";
import "./App.scss";
import Portfolio from "./pages/portfolio/Portfolio";
import Swap from "./pages/swap/Swap";
import Tools from "./pages/tools/Tools";
import About from "./pages/about/About";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Portfolio />} />
            <Route path="swap" element={<Swap />} />
            <Route path="tools" element={<Tools />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
