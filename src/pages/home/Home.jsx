import "./home.scss";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { TopState } from "../../context/TopContext";
import home from "../../assets/svg/home.svg";

const Home = () => {
  const { chain } = useParams();
  const location = useLocation();
  const { address } = TopState();
  const { contWidth } = TopState();
  const width = contWidth <= 1600 ? 35 : 40;

  const checkURL = () => {
    if (location.pathname.split("/")[3] === "nft") {
      return `${chain ? chain : "56"}/nft`;
    } else return `${chain ? chain : "56"}/token`;
  };
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-left">
          <div className="home-title">
            <span>COGS</span> helps you keep track of everything in
            Cryptocurrency
          </div>
          <div className="home-body">
            As a financial metric, market cap allows you to compare the total
            circulating value of one cryptocurrency with another. Large cap
            cryptocurrencies such as Bitcoin and Ethereum have a market cap of
            over $10 billion.
          </div>
          <div className="home-nav">
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
          </div>
          <div className="home-body">Connect your wallet to get data!</div>
        </div>
        <div className="home-right">
          <img src={home} alt="home" style={{ height: `${width}rem` }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
