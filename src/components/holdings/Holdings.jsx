import "./holdings.scss";
import { useMoralis } from "react-moralis";
import { useEffect, useState, useCallback } from "react";
import GetPrice from "./GetPrice";

const Holdings = ({ assets, prices }) => {
  const { Moralis, account: walletAddress, isAuthenticated } = useMoralis();
  const [address, setAddress] = useState([]);
  const [tokenPrices, setTokenprice] = useState([]);
  console.log(tokenPrices);
  useEffect(() => {
    prices && setTokenprice(prices);
  }, [prices]);
  // const getPrice = (tokenAddress) => {
  //   console.log(tokenAddress);
  //     const tokenPrice = await Promise.all(
  //       prices?.filter((price) => {
  //         return price.address === tokenAddress;
  //       })
  //     );
  //     console.log(tokenPrice);
  //     // return tokenPrice[0].tokenData.price;
  // };

  return (
    <div className="holdings">
      <div className="holdings_label">Holdings</div>
      <div className="wallet">
        {!assets || !walletAddress || !isAuthenticated
          ? "Loading..."
          : assets?.map((asset) => {
              return (
                <div className="wallet_content" key={asset.token_address}>
                  <div className="left">
                    <div className="token_symbol_price">
                      <span className="token_symbol">{asset.symbol}</span>
                      <span className="token_price" style={{ color: "green" }}>
                        <GetPrice
                          prices={tokenPrices}
                          address={asset.token_address}
                        />
                      </span>
                    </div>
                    <div className="token_name">{asset.name}</div>
                  </div>
                  <div className="right">
                    <div className="token_amount">
                      {parseFloat(
                        Moralis?.Units?.FromWei(asset.balance, asset.decimals)
                      ).toLocaleString()}
                    </div>
                    <div className="token_value" style={{ color: "green" }}>
                      {/* <FetchDexTokenPrice
                        token_address={asset.token_address}
                        token_balance={parseFloat(
                          Moralis?.Units?.FromWei(asset.balance, asset.decimals)
                        )}
                      /> */}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Holdings;
