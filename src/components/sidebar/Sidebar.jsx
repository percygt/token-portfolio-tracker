import React from "react";
import "./sidebar.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ConstructionIcon from "@mui/icons-material/Construction";
import InfoIcon from "@mui/icons-material/Info";
import LNDToggle from "./LNDToggle";

const Sidebar = () => {
  const logo = "prcy.";
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">{logo}</span>
      </div>

      <div className="center">
        <ul>
          <li>
            <AccountBalanceWalletIcon className="icon" />
            <span>Portfolio</span>
          </li>
          <li>
            <SwapHorizIcon className="icon" />
            <span>Trade</span>
          </li>
          <li>
            <ConstructionIcon className="icon" />
            <span>Tools</span>
          </li>
          <li>
            <InfoIcon className="icon" />
            <span>About</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <LNDToggle />
      </div> */}
    </div>
  );
};

export default Sidebar;
