import "./nftTransfers.scss";
import { useNFTTransasctions } from "../../hooks/useNFTTransasctions";
import { useEffect, useState } from "react";
import {
  getEllipsisTxtRight,
  getEllipsisTxtTwo,
} from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import { useMoralis } from "react-moralis";
import { format } from "date-fns";
import { TopState } from "../../context/TopContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNFTMetadata } from "../../hooks/useNFTMetadata";

const NFTTransfer = () => {
  const { address, chain } = TopState();
  const { nftTransfers } = useNFTTransasctions(address, chain);
  const [data, setData] = useState([]);
  const { isLoading, nftMetadata } = useNFTMetadata(data, chain);
  const [nftTransData, setNFTtransData] = useState([]);

  useEffect(() => {
    const getData = nftTransfers.map((data) => {
      const newObject = {};
      newObject.token_address = data.token_address;
      newObject.token_id = data.token_id;
      return newObject;
    });
    setData(getData);
  }, [nftTransfers]);

  useEffect(() => {
    const mergedData = nftMetadata.map((item, i) => {
      return Object.assign({}, item, nftTransfers[i]);
    });
    setNFTtransData(mergedData);
  }, [nftMetadata]);

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
    <div className="transaction">
      <div className="transaction_label">
        {/* <ReceiptLongIcon className="transfer-icon" /> */}
        TRANSFERS
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <span>NFT</span>
            <span>FROM</span>
            <span>TO</span>
            <span>DATE</span>
            <span>TX HASH</span>
          </div>
        </div>
        {isLoading ? (
          <div className="tbody">
            <Skeleton count={10} />
          </div>
        ) : (
          <div className="tbody">
            {nftTransData.map((transfer, index) => (
              <div key={index} className="tr">
                <span>{`${transfer.name} #${transfer.token_id}`}</span>
                <CopyToClipboard text={transfer.from_address}>
                  <span>{getEllipsisTxtTwo(transfer.from_address, 6)}</span>
                </CopyToClipboard>
                <CopyToClipboard text={transfer.to_address}>
                  <span>{getEllipsisTxtTwo(transfer.to_address, 6)}</span>
                </CopyToClipboard>
                <span>
                  {format(new Date(transfer.block_timestamp), "dd MMM yyyy")}
                </span>
                <span>
                  <a
                    href={`${getExplorer(chain)}tx/${
                      transfer.transaction_hash
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTTransfer;
