import "./transaction.scss";
import { useNativeTransactions } from "../../hooks/useNativeTransactions";
import { useMemo, useEffect, useState } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import { useMoralis } from "react-moralis";
import { format } from "date-fns";
import { useTokenMetadata } from "../../hooks/useTokenMetadata";
import { useDexPrice } from "../../hooks/useDexPrice";

const FetchConvertedValue = ({ data, address, value }) => {
  const { Moralis } = useMoralis();
  let decimals = 1;
  let symbol = "";
  if (address.length !== 0 && address !== undefined) {
    if (data.length !== 0 && data !== undefined) {
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
  if (address.length !== 0 && address !== undefined) {
    if (data.length !== 0 && data !== undefined) {
      data.map((obj) => {
        if (address === obj.address) {
          name = obj.name;
        }
        return null;
      });
    }
  }

  return <>{getEllipsisTxt(name, 6)}</>;
};
const TokenAmountValue = ({ priceData, address, data, value }) => {
  const { Moralis } = useMoralis();
  let price = 0;
  let amount = 0;
  let priceAmount = 0;
  if (address.length !== 0 && address !== undefined) {
    if (data.length !== 0 && data !== undefined) {
      data.map((obj) => {
        if (address === obj.address) {
          amount = parseFloat(Moralis?.Units?.FromWei(value, obj.decimals));
        }
        return null;
      });
    }
    if (priceData !== undefined) {
      priceData.map((e) => {
        if (e.token_address !== undefined && address === e.token_address) {
          price = parseFloat(e.price);
        }
        return null;
      });
    }
  }
  priceAmount = price * amount;
  return <>${priceAmount.toLocaleString()}</>;
};

const Transaction = () => {
  const { account: walletAddress, isAuthenticated, user } = useMoralis();
  const [transfers, isLoading, chainId] = useNativeTransactions();
  const [filteredTokenData, setFilteredTokenData] = useState([]);
  const [metadata, setAddress] = useTokenMetadata();
  const [priceData, setAddresses] = useDexPrice();

  useEffect(() => {
    const transferSet = new Set(
      transfers.map((transfer) => {
        return transfer.address;
      })
    );
    const filteredTransferAddress = [...transferSet];
    setAddress(filteredTransferAddress);
    setAddresses(filteredTransferAddress);
    console.log(priceData);
    if (metadata !== undefined && metadata.length !== 0) {
      setFilteredTokenData(metadata);
    }
  }, [transfers, metadata]);

  return (
    <div className="transaction grid-col-span-2">
      <table>
        <thead>
          <div>
            <div>Token</div>
            <div>From</div>
            <div>To</div>
            <div>Amount</div>
            <div>Value</div>
            <div>Date</div>
            <div>Tx Hash</div>
          </div>
        </thead>

        <tbody>
          {!transfers || !walletAddress || !isAuthenticated
            ? "Loading..."
            : transfers.map((transfer, index) => (
                <div key={index} className="transfer_content">
                  <div>
                    <FetchTokenName
                      data={filteredTokenData}
                      address={transfer.address}
                    />
                  </div>
                  <div>
                    {user.get("ethAddress") === transfer.from_address
                      ? "You"
                      : getEllipsisTxt(transfer.from_address, 5)}
                  </div>
                  <div>
                    {user.get("ethAddress") === transfer.to_address
                      ? "You"
                      : getEllipsisTxt(transfer.to_address, 5)}
                  </div>
                  <div>
                    <FetchConvertedValue
                      data={filteredTokenData}
                      address={transfer.address}
                      value={transfer.value}
                    />
                  </div>
                  <div>
                    {/* <TokenAmountValue
                      priceData={priceData}
                      address={transfer.address}
                      data={filteredTokenData}
                      value={transfer.value}
                    /> */}
                  </div>
                  <div>
                    {format(new Date(transfer.block_timestamp), "dd MMM yyyy")}
                  </div>
                  <div>
                    <a
                      href={`${getExplorer(chainId)}tx/${
                        transfer.transaction_hash
                      }`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
