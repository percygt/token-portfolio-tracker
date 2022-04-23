import { useEffect, useState, useMemo } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

function FetchBalance() {
  const {
    Moralis,
    isInitialized,
    chainId,
    account: walletAddress,
    isAuthenticated,
  } = useMoralis();
  const [tokenDatas, setTokenDatas] = useState();
  const Web3Api = useMoralisWeb3Api();
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenBalances,
    {
      chain: chainId,
    }
  );

  const fetchBalanceData = async () => {
    const balanceData = await fetch();
    if (balanceData !== undefined && balanceData !== []) return balanceData;
  };

  useEffect(() => {
    (async () => {
      await fetchBalanceData().then((assets) => {
        setTokenDatas(assets);
      });
    })();
  }, [isInitialized, walletAddress, isAuthenticated]);

  return (
    <div>
      {!tokenDatas || !walletAddress || !isAuthenticated
        ? "Loading..."
        : tokenDatas.map((asset) => {
            return (
              <div className="wallet_content" key={asset.token_address}>
                <div className="left">
                  <div className="token_symbol_price">
                    <span className="token_symbol">{asset.symbol}</span>
                  </div>
                  <div className="token_name">{asset.name}</div>
                </div>
                <div className="right">
                  <div className="token_amount">
                    {parseFloat(
                      Moralis?.Units?.FromWei(asset.balance, asset.decimals)
                    ).toFixed(3)}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
export default FetchBalance;
