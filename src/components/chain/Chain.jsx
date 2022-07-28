import "./chain.scss";
import { NavLink, useLocation } from "react-router-dom";
import { TopState } from "../../context/TopContext";
// import { SiEthereum } from "react-icons/si";
// import { SiBinance } from "react-icons/si";
import ETH from "../../assets/token-logo/svg/ethereum.svg";
import BSC from "../../assets/token-logo/svg/bnb.svg";
import POLYGON from "../../assets/token-logo/svg/polygon.svg";
import AXS from "../../assets/token-logo/svg/axs.svg";

const Chain = () => {
  const { address } = TopState();
  const location = useLocation();

  const toPath = (chainId) => {
    if (location.pathname.split("/")[4] === "nft") {
      return `/portfolio/${address}/${chainId}/nft`;
    } else return `/portfolio/${address}/${chainId}/token`;
  };

  return (
    <div className="chain-list">
      {/* <NavLink to={toPath("all")} className="link" activeclassname="active">
        <span>ALL</span>
      </NavLink> */}
      <NavLink to={toPath(56)} className="link" activeclassname="active">
        <img src={BSC} alt="" />
        <span>BSC</span>
      </NavLink>
      <NavLink to={toPath(1)} className="link" activeclassname="active">
        <img src={ETH} alt="" />
        <span>ETHERIUM</span>
      </NavLink>
      <NavLink to={toPath(137)} className="link" activeclassname="active">
        <img src={POLYGON} alt="" />
        <span>POLYGON</span>
      </NavLink>
      <NavLink to={toPath(2020)} className="link" activeclassname="active">
        <img src={AXS} alt="" />
        <span>AXIE</span>
      </NavLink>
    </div>
  );
};

export default Chain;
