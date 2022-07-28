import { PortfolioState } from "../../context/PortfolioContext";
import "./removeTokenModal.scss";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
const RemoveTokenModal = ({ token, close }) => {
  const { removedToken, setRemovedToken } = PortfolioState();
  const handleClickTrash = () => {
    setRemovedToken([...removedToken, token]);
    close();
  };
  return (
    <div className="remove-token-container">
      <div className="remove-token-content">
        <ReportGmailerrorredIcon className="remove-token-icon" />
        <span>Token spam will be removed from your wallet</span>
      </div>

      <div className="btn-container">
        <button className="btn-cancel" onClick={close}>
          Cancel
        </button>
        <button className="btn-confirm" onClick={(e) => handleClickTrash()}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RemoveTokenModal;
