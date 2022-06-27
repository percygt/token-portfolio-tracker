import "./profile.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TopState } from "../../context/TopContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyToClipboard from "react-copy-to-clipboard";
// import { getEllipsisTxt } from "../../helpers/formatters";

import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { address } = TopState();
  const notify = () =>
    toast("Copied", {
      position: "top-center",
      autoClose: 250,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "toast",
      bodyClassName: "toast-body",
    });

  return (
    <div className="profile-container">
      <div className="profile-icon">
        <AccountCircleIcon />
      </div>
      <div className="profile-address">{address}</div>
      <div className="profile-copy">
        <CopyToClipboard text={address}>
          <ContentCopyIcon onClick={notify} />
        </CopyToClipboard>
        <ToastContainer transition={Flip} />
      </div>
    </div>
  );
};

export default Profile;
