import "./tokenDetails.scss";
import { PortfolioState } from "../../context/PortfolioContext";
import { FaInfoCircle } from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";
import { networkConfigs } from "../../helpers/networks";
import { TopState } from "../../context/TopContext";
import BSC from "../../assets/token-logo/svg/bnb.svg";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import CopyToClipboard from "react-copy-to-clipboard";
import { SwapToken } from "../../config/api";

import { toast } from "react-toastify";

const TokenDetails = () => {
  const { assetClick, setOpenModal } = PortfolioState();
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
  const { chain } = TopState();

  return assetClick ? (
    <div className="token-action-items">
      <div className="token-info">
        <button className="token-details-btn">
          <FaInfoCircle />
          <span>Learn more</span>
        </button>
      </div>
      <div className="token-contract">
        <CopyToClipboard text={assetClick?.contract_address}>
          <button className="token-details-btn" onClick={notify}>
            <img
              src={BSC}
              style={{ width: "0.9rem" }}
              className="token-contract-icon"
            />
            <span>Contract</span>
            <MdOutlineContentCopy />
          </button>
        </CopyToClipboard>
      </div>
      <div className="block-explorer">
        <a
          href={`${networkConfigs[chain].blockExplorerUrl}address/${assetClick?.contract_address}`}
          target="_blank"
        >
          <button className="token-details-btn">
            <FaMicroscope />
            <span>Explorer</span>
          </button>
        </a>
      </div>
      <div className="swap-token">
        <a
          href={SwapToken(assetClick?.contract_address)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="token-details-btn">
            <FaDonate />
            <span>Buy</span>
          </button>
        </a>
      </div>
      <div className="transfer-token">
        <button className="token-details-btn">
          <MdSend />
          <span onClick={() => setOpenModal(["transfer", true])}>Send</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="token-action-items"></div>
  );
};

export default TokenDetails;
