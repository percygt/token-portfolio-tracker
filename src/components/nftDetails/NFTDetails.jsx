import "./nftDetails.scss";
import { PortfolioState } from "../../context/PortfolioContext";
import { FaInfoCircle } from "react-icons/fa";
import { FaMicroscope } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { networkConfigs } from "../../helpers/networks";
import { TopState } from "../../context/TopContext";
import BSC from "../../assets/token-logo/svg/bnb.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const IsNative = (address) =>
  address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const NFTDetails = () => {
  const { nftClick, nativeAddress } = PortfolioState();
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

  return nftClick ? (
    <div className="nft-action-items">
      <div className="nft-info">
        <button className="nft-details-btn">
          <FaInfoCircle />
          <span>Learn more</span>
        </button>
      </div>
      <div className="token-contract">
        <CopyToClipboard text={nftClick?.token_address}>
          <button className="nft-details-btn" onClick={notify}>
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
      <div className="hash">
        <CopyToClipboard text={nftClick?.token_hash}>
          <button className="nft-details-btn" onClick={notify}>
            <FaHashtag />
            <span>Hash</span>
            <MdOutlineContentCopy />
          </button>
        </CopyToClipboard>
      </div>

      <div className="block-explorer">
        <a
          href={`${networkConfigs[chain].blockExplorerUrl}token/${
            IsNative(nftClick?.token_address)
              ? nativeAddress
              : nftClick?.token_address
          }?a=${nftClick?.token_id}`}
          target="_blank"
        >
          <button className="nft-details-btn">
            <FaMicroscope />
            <span>Explorer</span>
          </button>
        </a>
      </div>

      <div className="transfer-token">
        <button className="nft-details-btn">
          <MdSend />
          <span>Send</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="token-action-items"></div>
  );
};

export default NFTDetails;
