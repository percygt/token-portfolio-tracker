import "./profile.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TopState } from "../../context/TopContext";
import { PortfolioState } from "../../context/PortfolioContext";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import CopyToClipboard from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const { address, setAddress, searchAddress, setSearchAddress, contWidth } =
    TopState();
  const { tokenData } = PortfolioState();
  const { account: walletAddress, chainId } = useMoralis();
  const [closeSearch, setCloseSearch] = useState(false);
  const navigate = useNavigate();
  const width = contWidth <= 1600 ? 26 : 27;
  const notify = () =>
    toast("Copied", {
      position: "top-center",
      autoClose: 250,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "toast-copy",
      bodyClassName: "toast-copy-body",
    });
  const handleCLoseSearch = () => {
    setCloseSearch(false);
    setSearchAddress(null);
    if (walletAddress) {
      setAddress(walletAddress);
    } else {
      navigate("/portfolio/new");
      setAddress(null);
    }
  };
  useEffect(() => {
    searchAddress ? setCloseSearch(true) : setCloseSearch(false);
  }, [searchAddress]);
  return (
    <div className="profile-container" style={{ minWidth: `${width}rem` }}>
      <div className="profile-icon">
        <AccountCircleIcon />
      </div>
      <div className="profile-address">
        {!tokenData.length ? (
          <span style={{ backgroundColor: "transparent", border: "none" }}>
            <Skeleton count={1} />
          </span>
        ) : (
          <CopyToClipboard text={address}>
            <span onClick={notify}>{address?.toUpperCase()}</span>
          </CopyToClipboard>
        )}
        <div className="profile-copy">
          <CopyToClipboard text={address}>
            <ContentCopySharpIcon onClick={notify} />
          </CopyToClipboard>
        </div>
      </div>

      {closeSearch ? (
        <CloseIcon
          className="profile-icon-close"
          onClick={(e) => handleCLoseSearch()}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
