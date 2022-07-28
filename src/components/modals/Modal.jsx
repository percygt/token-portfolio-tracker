import "./modal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import TransferModal from "./TransferModal";
import RemoveTokenModal from "./RemoveTokenModal";

const Modal = ({ open, onClose }) => {
  const [modalElement, setModalElement] = useState(null);
  useEffect(() => {
    if (open[0] === "transfer")
      setModalElement(<TransferModal close={onClose} />);
    if (open[0] === "removeToken")
      setModalElement(<RemoveTokenModal token={open[2]} close={onClose} />);
  }, [open]);

  if (!open[1]) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        {modalElement}
        <CloseIcon className="modal-close" onClick={onClose} />
      </div>
    </div>
  );
};

export default Modal;
