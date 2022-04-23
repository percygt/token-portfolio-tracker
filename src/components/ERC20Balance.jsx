import { useERC20Balances } from "react-moralis";
import { useEffect, useState, useMemo } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import axios from "axios";
function ERC20Balance() {
  const { Moralis, chainId } = useMoralis();
  const [tokenDatas, setTokenDatas] = useState([]);
  // const [address, setAddress] = useState([]);
  const Web3Api = useMoralisWeb3Api();
  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenBalances,
    {
      chain: chainId,
    }
  );
  // console.log(address);

  const fetchBalanceData = async () => {
    const balanceData = await fetch();
    if (balanceData !== undefined && balanceData !== []) return balanceData;
  };

  const fetchTokenPrice = async (arr) => {
    if (!arr) return [];
    // console.log(address);
    const tokenAddress = arr;
    return await axios
      .get("https://api.pancakeswap.info/api/v2/tokens/" + tokenAddress)
      .then((result) => {
        return result.data.data;
      })
      .catch((error) => {
        return { price: "0", price_BNB: "0" };
      });
  };

  // const tokenPrice = useMemo(() => fetchTokenPrice(address), [address]);
  // console.log(tokenPrice);

  useEffect(() => {
    (async () => {
      await fetchBalanceData().then((assets) => {
        setTokenDatas(assets);
        // const balanceDatas = [];
        // const moralisDatas = assets;
        // moralisDatas.forEach((asset) => {
        //   const moralisData = asset;
        //   setAddress(moralisData.token_address);
        // });
      });
      // await tokenPrice.then((res) => console.log(res));
    })();
  }, [fetch]);

  return (
    <div>
      {tokenDatas === undefined
        ? "Loading..."
        : tokenDatas.map((asset) => {
            return (
              <div className="wallet_content" key={asset.token_address}>
                <div className="left">
                  <div className="token_symbol_price">
                    <span className="token_symbol">{asset.symbol}</span>
                    {/* <span className="token_price">
                      {parseFloat(asset.price).toFixed(3)}USD
                    </span> */}
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
export default ERC20Balance;
