import "./tokenTransfer.scss";
import { useNativeTransactions } from "../../hooks/useNativeTransactions";
import { useEffect, useState } from "react";
import { getEllipsisTxt, getEllipsisTxtRight } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import { useMoralis } from "react-moralis";
import { format } from "date-fns";
import { useTokenMetadata } from "../../hooks/useTokenMetadata";
import { useDexPrice } from "../../hooks/useDexPrice";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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
const TokenAmountValue = ({ priceData, address, data, value }) => {
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
        if (address === e?.token_address) {
          price = parseFloat(e.price);
        }
        return null;
      });
    }
  }
  priceAmount = price * amount;
  return <>${priceAmount.toLocaleString()}</>;
};

const TokenTransfers = () => {
  const {
    account: walletAddress,
    isAuthenticated,
    user,
    chainId,
  } = useMoralis();
  const { transfers } = useNativeTransactions(walletAddress, chainId);
  const [filteredTokenData, setFilteredTokenData] = useState([]);
  const [metaAddr, setMetaAddr] = useState([]);
  const { metadata } = useTokenMetadata(metaAddr, chainId);
  const [priceData, setAddresses] = useDexPrice();

  useEffect(() => {
    const transferSet = new Set(transfers.map((transfer) => transfer.address));
    const filteredTransferAddress = [...transferSet];
    setMetaAddr(filteredTransferAddress);
    setAddresses(filteredTransferAddress);
  }, [transfers, chainId]);

  useEffect(() => {
    if (metadata !== undefined && metadata.length !== 0) {
      setFilteredTokenData(metadata);
    }
  }, [metadata]);

  return (
    <div className="transaction">
      <div className="transaction_label">
        <ReceiptLongIcon className="transfer-icon" />
        Transfers
      </div>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Value</th>
            <th>Date</th>
            <th>Tx Hash</th>
          </tr>
        </thead>
        {!transfers.length || !walletAddress || !isAuthenticated || !chainId ? (
          <tbody>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
            <tr>
              <td>Loading..</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={index} className="transfer_content">
                <td className="tx_token_name">
                  <FetchTokenName
                    data={filteredTokenData}
                    address={transfer.address}
                  />
                </td>
                <td className="tx_from_address">
                  {user.get("ethAddress") === transfer.from_address
                    ? "You"
                    : getEllipsisTxt(transfer.from_address, 5)}
                </td>
                <td className="tx_to_address">
                  {user.get("ethAddress") === transfer.to_address
                    ? "You"
                    : getEllipsisTxt(transfer.to_address, 5)}
                </td>
                <td className="tx_amount">
                  <FetchConvertedValue
                    data={filteredTokenData}
                    address={transfer.address}
                    value={transfer.value}
                  />
                </td>
                <td>
                  <TokenAmountValue
                    priceData={priceData}
                    address={transfer.address}
                    data={filteredTokenData}
                    value={transfer.value}
                  />
                </td>
                <td className="tx_date">
                  {format(new Date(transfer.block_timestamp), "dd MMM yyyy")}
                </td>
                <td className="tx_hash">
                  <a
                    href={`${getExplorer(chainId)}tx/${
                      transfer.transaction_hash
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TokenTransfers;
