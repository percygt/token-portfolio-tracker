import "./holdings.scss";
// import FetchBalance from "./FetchBalance";
import { useEffect, useState, useCallback } from "react";
import FetchDexTokenPrice from "./FetchDexTokenPrice";

import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

const Holdings = () => {
  const {
    Moralis,
    chainId,
    account: walletAddress,
    isAuthenticated,
  } = useMoralis();
  const [tokenDatas, setTokenDatas] = useState([]);
  const Web3Api = useMoralisWeb3Api();
  const { fetch } = useMoralisWeb3ApiCall(Web3Api.account.getTokenBalances, {
    chain: chainId,
  });

  const fetchResponse = useCallback(async () => {
    try {
      const response = await fetch();
      if (!response) return [];
      return response;
    } catch (err) {
      console.log(err.stack);
    }
  }, [fetch]);

  useEffect(() => {
    async function fetchAssets() {
      await fetchResponse().then((balance) => {
        setTokenDatas(balance);
      });
    }
    fetchAssets();
  }, [walletAddress, isAuthenticated, fetchResponse]);
  return (
    <div className="holdings">
      <div className="holdings_label">Holdings</div>
      <div className="wallet">
        {/* <FetchBalance data={tokenDatas} /> */}
        {!tokenDatas || !walletAddress || !isAuthenticated
          ? "Loading..."
          : tokenDatas?.map((asset) => {
              return (
                <div className="wallet_content" key={asset.token_address}>
                  <div className="left">
                    <div className="token_symbol_price">
                      <span className="token_symbol">{asset.symbol}</span>
                      <span className="token_price" style={{ color: "green" }}>
                        <FetchDexTokenPrice
                          token_address={asset.token_address}
                          token_balance="false"
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
                      <FetchDexTokenPrice
                        token_address={asset.token_address}
                        token_balance={parseFloat(
                          Moralis?.Units?.FromWei(asset.balance, asset.decimals)
                        )}
                      />
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
