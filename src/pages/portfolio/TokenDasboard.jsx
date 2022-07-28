import Wallet from "../../components/wallet/Wallet";
import Profile from "../../components/profile/Profile";
import TokenDetails from "../../components/tokenDetails/TokenDetails";
import TokenBalance from "../../components/tokenBalance/TokenBalance";
import Chart from "../../components/walletChart/Chart";
import TokenTransfers from "../../components/tokenTransfers/TokenTransfer";

const TokenDasboard = () => {
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_left">
          <Profile />
          <Chart />
          <TokenDetails />
        </div>
        <div className="dashboard_right">
          <Wallet />
          <TokenBalance />
        </div>
      </div>
      <div className="dashboard_bottom">
        <TokenTransfers />
      </div>
    </>
  );
};

export default TokenDasboard;
