import "./chain.scss";
import { NavLink, useLocation } from "react-router-dom";
import { TopState } from "../../context/TopContext";
const Chain = () => {
  const { address } = TopState();
  const location = useLocation();

  const toPath = (chainId) => {
    if (location.pathname.split("/")[3] === "nft") {
      return `/portfolio/${address}/nft/chain/${chainId}`;
    } else return `/portfolio/${address}/chain/${chainId}`;
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
