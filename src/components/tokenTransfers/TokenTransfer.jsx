import "./tokenTransfer.scss";
import { useTokenTransactions } from "../../hooks/useTokenTransactions";
import { useEffect, useState } from "react";
import {
  getEllipsisTxtRight,
  getEllipsisTxtTwo,
} from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import { useMoralis } from "react-moralis";
import { format } from "date-fns";
import { useTokenMetadata } from "../../hooks/useTokenMetadata";
import { useDexPrice } from "../../hooks/useDexPrice";
import { TopState } from "../../context/TopContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FetchConvertedValue = ({ data, address, value }) => {
  const { Moralis } = useMoralis();
  let decimals = 1;
  let symbol = "";

  if (address) {
    if (Array.isArray(data) && data?.length && data[0]?.decimals) {
      data.map((obj) => {
        if (address === obj.address) {
          decimals = obj.decimals;
          symbol = obj.symbol;
        }
        return null;
      });
    }
  }

  return (
    <>
      {parseFloat(Moralis?.Units?.FromWei(value, decimals)).toLocaleString()}{" "}
      {symbol}
    </>
  );
};

const FetchTokenName = ({ data, address }) => {
  let name = "";
  if (address) {
    if (Array.isArray(data) && data?.length && data[0]?.decimals) {
      data.map((obj) => {
        if (address === obj.address) {
          name = obj.name;
        }
        return null;
      });
    }
  }

  return <>{getEllipsisTxtRight(name, 25)}</>;
};
const TokenAmountValue = ({
  priceData,
  address,
  data,
  value,
  conversion,
  symbol,
}) => {
  const { Moralis } = useMoralis();
  let price = 0;
  let amount = 0;
  let priceAmount = 0;
  if (address) {
    if (Array.isArray(data) && data?.length && data[0]?.decimals) {
      data.map((obj) => {
        if (address === obj.address) {
          amount = parseFloat(Moralis?.Units?.FromWei(value, obj.decimals));
        }
        return null;
      });
    }
    if (
      Array.isArray(priceData) &&
      priceData.length &&
      priceData[0]?.token_address
        ? true
        : false
    ) {
      priceData.map((e) => {
        if (e?.status === 200) {
          price = parseFloat(e.price);
        } else {
          price = 0;
        }
        return null;
      });
    }
  }
  priceAmount = price * amount * conversion;
  return (
    <>
      {symbol}
      {priceAmount.toLocaleString()}
    </>
  );
};

const TokenTransfers = () => {
  const { address, chain, conversion, symbol } = TopState();
  const { transfers } = useTokenTransactions(address, chain);
  const [filteredTokenData, setFilteredTokenData] = useState([]);
  const [metaAddr, setMetaAddr] = useState([]);
  const { isLoading, metadata } = useTokenMetadata(metaAddr, chain);
  const { priceData, setAddresses } = useDexPrice();
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
  useEffect(() => {
    const transferSet = new Set(transfers.map((transfer) => transfer.address));
    const filteredTransferAddress = [...transferSet];
    setMetaAddr(filteredTransferAddress);
    setAddresses(filteredTransferAddress);
  }, [transfers, chain]);

  useEffect(() => {
    if (metadata !== undefined && metadata.length !== 0) {
      setFilteredTokenData(metadata);
    }
  }, [metadata]);

  return (
    <div className="transaction">
      <div className="transaction_label">
        {/* <ReceiptLongIcon className="transfer-icon" /> */}
        TRANSFERS
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <span>TOKEN</span>
            <span>FROM</span>
            <span>TO</span>
            <span>AMOUNT</span>
            <span>VALUE</span>
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
            {transfers.map((transfer, index) => (
              <div key={index} className="transfer_content tr">
                <span className="tx_token_name">
                  <FetchTokenName
                    data={filteredTokenData}
                    address={transfer.address}
                  />
                </span>
                <CopyToClipboard text={transfer.from_address}>
                  <span className="tx_from_address" onClick={notify}>
                    {address.toLowerCase() === transfer.from_address
                      ? "Owner"
                      : getEllipsisTxtTwo(transfer.from_address, 5)}
                  </span>
                </CopyToClipboard>
                <CopyToClipboard text={transfer.to_address}>
                  <span className="tx_to_address" onClick={notify}>
                    {address.toLowerCase() === transfer.to_address
                      ? "Owner"
                      : getEllipsisTxtTwo(transfer.to_address, 5)}
                  </span>
                </CopyToClipboard>
                <span className="tx_amount">
                  <FetchConvertedValue
                    conversion={conversion}
                    data={filteredTokenData}
                    address={transfer.address}
                    value={transfer.value}
                  />
                </span>
                <span>
                  <TokenAmountValue
                    symbol={symbol}
                    conversion={conversion}
                    priceData={priceData}
                    address={transfer.address}
                    data={filteredTokenData}
                    value={transfer.value}
                  />
                </span>
                <span className="tx_date">
                  {format(new Date(transfer.block_timestamp), "dd MMM yyyy")}
                </span>
                <span className="tx_hash">
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

export default TokenTransfers;
