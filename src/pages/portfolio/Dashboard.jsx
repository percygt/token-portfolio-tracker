import Chart from "../../components/walletChart/Chart";
import Holdings from "../../components/holdings/Holdings";
import MakeTransaction from "../../components/makeTransaction/MakeTransaction";
import TokenTransfer from "../../components/transactions/TokenTransfer";
import Balance from "../../components/balance/Balance";
import Chain from "../../components/chain/Chain";
import Wallet from "../../components/wallet/Wallet";
import Pagination from "../../components/pagination/Pagination";
import Profile from "../../components/profile/Profile";

export const Dashboard = ({ contWidth, contHeight, contRef, height }) => {
  return (
    <div className="dashboard" ref={contRef}>
      <Wallet />
      <div className="dashboard_top">
        <div className="dashboard_left">
          <Profile />
          <Chart contWidth={contWidth} contHeight={contHeight} />
        </div>
        <div className="dashboard_right">
          <Chain />
          <Balance />
          <Pagination />
        </div>
      </div>
      <div className="dashboard_bottom">
        <TokenTransfer />
      </div>
    </div>
  );
};
