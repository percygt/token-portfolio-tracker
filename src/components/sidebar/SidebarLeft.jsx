import React from "react";
import "./sidebarLeft.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ConstructionIcon from "@mui/icons-material/Construction";
import InfoIcon from "@mui/icons-material/Info";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { useMoralis } from "react-moralis";

const SidebarLeft = () => {
  const logo = "prcy.";
  const { chain } = useParams();
  const location = useLocation();
  const {
    isWeb3Enabled,
    isAuthenticated,
    account: walletAddress,
  } = useMoralis();
  const checkURL = () => {
    if (location.pathname.split("/")[3] === "nft") {
      return `nft/chain/${chain ? chain : "all"}`;
    } else return `chain/${chain ? chain : "all"}`;
  };
  return (
    <div className="sidebar-left">
      <div className="top">
        <Link to="/">
          <span className="logo">{logo}</span>
        </Link>
      </div>

      <div className="bottom">
        <NavLink
          to={
            isAuthenticated && walletAddress !== null
              ? `portfolio/${walletAddress}/${checkURL()}`
              : "portfolio/new"
          }
          className="link"
          activeclassname="active"
        >
          <AccountBalanceWalletIcon className="icon" />
          <span>Portfolio</span>
        </NavLink>
        <NavLink to="swap" className="link" activeclassname="active">
          <SwapHorizIcon className="icon" />
          <span>Swap</span>
        </NavLink>
        <NavLink to="tools" className="link" activeclassname="active">
          <ConstructionIcon className="icon" />
          <span>Tools</span>
        </NavLink>
        <NavLink to="about" className="link" activeclassname="active">
          <InfoIcon className="icon" />
          <span>About</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarLeft;
