import React, { useState, useEffect } from "react";
import "./balance.scss";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { PortfolioState } from "../../context/PortfolioContext";
import { getRoundDown } from "../../helpers/formatters";
import { useMoralis } from "react-moralis";

const Balance = () => {
  const {
    masterData,
    removedToken,
    setRemovedToken,
    asset,
    setAsset,
    nativeAddress,
  } = PortfolioState();
  const { symbol, conversion } = TopState();
  const { starredToken, setStarredToken } = MainState();
  const { account: walletAddress, isAuthenticated } = useMoralis();
  const [onHover, setOnHover] = useState(null);
  const [search, setSearch] = useState("");

  return <div className="balance"></div>;
};

export default Balance;
