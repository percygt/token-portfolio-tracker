import React from "react";
import "./sidebar.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ConstructionIcon from "@mui/icons-material/Construction";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import LNDToggle from "./LNDToggle";

const Sidebar = () => {
  const logo = "prcy.";
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">{logo}</span>
        </Link>
      </div>

      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="active">
              <AccountBalanceWalletIcon className="icon" />
              <span>Portfolio</span>
            </li>
          </Link>
          <Link to="/swap" style={{ textDecoration: "none" }}>
            <li>
              <SwapHorizIcon className="icon" />
              <span>Swap</span>
            </li>
          </Link>
          <Link to="/tools" style={{ textDecoration: "none" }}>
            <li>
              <ConstructionIcon className="icon" />
              <span>Tools</span>
            </li>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <li>
              <InfoIcon className="icon" />
              <span>About</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">
        <LNDToggle />
      </div> */}
    </div>
  );
};

export default Sidebar;
