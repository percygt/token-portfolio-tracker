import "./chain.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useMoralis } from "react-moralis";
const Chain = () => {
  const {
    isWeb3Enabled,
    isAuthenticated,
    account: walletAddress,
  } = useMoralis();
  const location = useLocation();
  console.log(location.pathname.split("/")[3]);
  const toPath = (chainId) => {
    if (location.pathname.split("/")[3] === "nft") {
      return `/portfolio/${walletAddress}/nft/chain/${chainId}`;
    } else return `/portfolio/${walletAddress}/chain/${chainId}`;
  };

  return (
    <div className="chain-list">
      <NavLink to={toPath("all")} className="link" activeclassname="active">
        <span>All</span>
      </NavLink>
      <NavLink to={toPath(1)} className="link" activeclassname="active">
        <span>Eth</span>
      </NavLink>
      <NavLink to={toPath(137)} className="link" activeclassname="active">
        <span>BSC</span>
      </NavLink>
      <NavLink to={toPath(56)} className="link" activeclassname="active">
        <span>Matic</span>
      </NavLink>
      <NavLink to={toPath(2020)} className="link" activeclassname="active">
        <span>Axie</span>
      </NavLink>
    </div>
  );
};

export default Chain;
