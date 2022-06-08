import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "./hooks/useCurrencyConvert";
import { useRemovedTokenStorage } from "./hooks/useRemovedTokenStorage";
import { useStarredTokenStorage } from "./hooks/useStarredTokenStorage";
import { useCGWatchStorage } from "./hooks/useCGWatchStorage";
import { getWrappedNative } from "./helpers/networks";
import { useMoralis } from "react-moralis";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [masterData, setMasterData] = useState([]);
  const [removedToken, setRemovedToken] = useRemovedTokenStorage();
  const [starredToken, setStarredToken] = useStarredTokenStorage();
  const [watchCG, setWatchCG] = useCGWatchStorage();
  const { conversion } = useCurrencyConvert(currency);
  const { chainId } = useMoralis();
  const nativeAddress = getWrappedNative(chainId)?.toLowerCase();
  const [asset, setAsset] = useState({ token_address: nativeAddress });
  console.log(masterData);
  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "PHP") setSymbol("₱");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        masterData,
        setMasterData,
        conversion,
        removedToken,
        setRemovedToken,
        starredToken,
        setStarredToken,
        watchCG,
        setWatchCG,
        asset,
        setAsset,
        nativeAddress,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
