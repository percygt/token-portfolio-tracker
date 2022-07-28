import React from "react";
import "./sidebarLeft.scss";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { TopState } from "../../context/TopContext";
import Help from "../help/Help";

const SidebarLeft = () => {
  const { chain } = useParams();
  const location = useLocation();
  const { address, logo } = TopState();

  const checkURL = () => {
    if (location.pathname.split("/")[4] === "nft") {
      return `${chain ? chain : 56}/nft`;
    } else return `${chain ? chain : 56}/token`;
  };
  return (
    <div className="sidebar-left">
      <div className="sidebar-left-top">
        <Link to="/">
          <div className="cogs-logo">
            {logo}
            <span>COGS</span>
          </div>
        </Link>
      </div>

      <div className="mid">
        <NavLink
          to={
            address && address !== null
              ? `portfolio/${address}/${checkURL()}`
              : "portfolio/new"
          }
          className="link"
          activeclassname="active"
        >
          <AccountBalanceWalletOutlinedIcon className="icon" />
          <span>Portfolio</span>
        </NavLink>
        <NavLink to="swap" className="link" activeclassname="active">
          <SwapHorizontalCircleOutlinedIcon className="icon" />
          <span>Swap</span>
        </NavLink>
        <NavLink to="tools" className="link" activeclassname="active">
          <BuildCircleOutlinedIcon className="icon" />
          <span>Tools</span>
        </NavLink>
        {/* <NavLink to="about" className="link" activeclassname="active">
          <InfoOutlinedIcon className="icon" />
          <span>About</span>
        </NavLink> */}
      </div>
      <div className="bottom">
        <Help />
      </div>
    </div>
  );
};

export default SidebarLeft;
