import "./donate.scss";
import Donation from "../../assets/donate.png";
import { getEllipsisTxt } from "../../helpers/formatters";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import CopyToClipboard from "react-copy-to-clipboard";
import ETH from "../../assets/token-logo/svg/ethereum.svg";
import BSC from "../../assets/token-logo/svg/bnb.svg";
import POLYGON from "../../assets/token-logo/svg/polygon.svg";
import AXS from "../../assets/token-logo/svg/axs.svg";
import USDT from "../../assets/token-logo/svg/usdt.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TopState } from "../../context/TopContext";
const Donate = () => {
  const personalAddress = "0xB5F4Bcbb064B2fCB4d6E794Edd794403731DE29D";
  const { contWidth } = TopState();
  const width = contWidth <= 1600 ? 35 : 40;

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
  return (
    <div className="donate">
      <div className="donate-container">
        <div className="donate-right">
          <img src={Donation} alt="" style={{ height: `${width}rem` }} />
        </div>
        <div className="donate-left">
          <div className="donate-title">Donate</div>
          <div className="donate-body">
            <div className="donate-content">
              We are inviting the community to submit applications for our fund.
              These grants will provide support to develop and maintain the
              project. Sponsors of COGS get early access to great features in
              the future.
            </div>
            <div className="donate-links">
              <span className="donate-token-name">
                <img src={BSC} alt="bnb" />
                BNB
              </span>
              <span className="donate-token-address" onClick={notify}>
                <CopyToClipboard text={personalAddress}>
                  <>
                    {getEllipsisTxt(personalAddress, 5)}
                    <ContentCopySharpIcon className="address-copy-icon" />
                  </>
                </CopyToClipboard>
              </span>
            </div>
            <div className="donate-links">
              <span className="donate-token-name">
                <img src={ETH} alt="eth" />
                ETH
              </span>
              <span className="donate-token-address" onClick={notify}>
                <CopyToClipboard text={personalAddress}>
                  <>
                    {getEllipsisTxt(personalAddress, 5)}
                    <ContentCopySharpIcon className="address-copy-icon" />
                  </>
                </CopyToClipboard>
              </span>
            </div>
            <div className="donate-links">
              <span className="donate-token-name">
                <img src={POLYGON} alt="matic" />
                MATIC
              </span>
              <span className="donate-token-address" onClick={notify}>
                <CopyToClipboard text={personalAddress}>
                  <>
                    {getEllipsisTxt(personalAddress, 5)}
                    <ContentCopySharpIcon className="address-copy-icon" />
                  </>
                </CopyToClipboard>
              </span>
            </div>
            <div className="donate-links">
              <span className="donate-token-name">
                <img src={USDT} alt="usdt" />
                USDT
              </span>
              <span className="donate-token-address" onClick={notify}>
                <CopyToClipboard text={personalAddress}>
                  <>
                    {getEllipsisTxt(personalAddress, 5)}
                    <ContentCopySharpIcon className="address-copy-icon" />
                  </>
                </CopyToClipboard>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
