import Holdings from "../holdings/Holdings";
import Balance from "../balance/Balance";
import Watchlist from "../watchlist/Watchlist";
import Transaction from "../transaction/Transaction";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useEffect, useState, useCallback } from "react";
import { useDexPrice } from "../../hooks/useDexPrice";

const TokenDasboard = () => {
  const [assets, fetchResponse] = useTokenBalance([]);
  const [priceData, setAddresses] = useDexPrice();

  useEffect(() => {
    async function getAddress() {
      const tokenAddresses = await assets?.map((asset) => {
        return asset.token_address;
      });
      tokenAddresses && setAddresses(tokenAddresses);
    }
    getAddress();
  }, [assets]);
  return (
    <>
      <Holdings assets={assets} prices={priceData} />
      <Balance />
      <Watchlist />
      <Transaction />
    </>
  );
};

export default TokenDasboard;
