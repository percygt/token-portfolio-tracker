import "./wallet.scss";
import { NavLink, useParams } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { TopState } from "../../context/TopContext";
const Wallet = () => {
  const { address } = TopState();
  const { chain } = useParams();
  // const toPath = (WalletId) => {
  //   return `/${walletAddress}/${WalletId}`;
  // };

  return (
    <div className="wallet-link">
      <NavLink
        to={`/portfolio/${address}/chain/${chain}`}
        className="link"
        activeclassname="active"
      >
        <span>Token</span>
      </NavLink>
      <NavLink
        to={`/portfolio/${address}/nft/chain/${chain}`}
        className="link"
        activeclassname="active"
      >
        <span>NFT</span>
      </NavLink>
    </div>
  );
};

export default Wallet;
