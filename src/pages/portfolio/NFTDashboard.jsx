import Wallet from "../../components/wallet/Wallet";
import Profile from "../../components/profile/Profile";
import NFTBalance from "../../components/nftBalance/NFTBalance";
import NFTDisplay from "../../components/nftDisplay/NFTDisplay";
import NFTDetails from "../../components/nftDetails/NFTDetails";
import NFTTransfer from "../../components/nftTransfers/NFTTransfer";

const NFTDashboard = () => {
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_left">
          <Profile />
          <NFTDisplay />
          <NFTDetails />
        </div>
        <div className="dashboard_right">
          <Wallet />
          <NFTBalance />
        </div>
      </div>
      <div className="dashboard_bottom">
        <NFTTransfer />
      </div>
    </>
  );
};

export default NFTDashboard;
