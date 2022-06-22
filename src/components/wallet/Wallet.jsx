import "./wallet.scss";
import { NavLink, useParams } from "react-router-dom";
import { useMoralis } from "react-moralis";
const Wallet = () => {
  const {
    isWeb3Enabled,
    isAuthenticated,
    account: walletAddress,
  } = useMoralis();
  const { chain } = useParams();
  // const toPath = (WalletId) => {
  //   return `/${walletAddress}/${WalletId}`;
  // };

  return (
    <div className="wallet-link">
      <NavLink
        to={`/portfolio/${walletAddress}/chain/${chain}`}
        className="link"
        activeclassname="active"
      >
        <span>Token</span>
      </NavLink>
      <NavLink
        to={`/portfolio/${walletAddress}/nft/chain/${chain}`}
        className="link"
        activeclassname="active"
      >
        <span>NFT</span>
      </NavLink>
    </div>
  );
};

export default Wallet;
