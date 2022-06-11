import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useStarredTokenStorage } from "../hooks/useStarredTokenStorage";
import { useCGWatchStorage } from "../hooks/useCGWatchStorage";
import { useMoralis } from "react-moralis";

const Top = createContext();
const TopContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [starredToken, setStarredToken] = useStarredTokenStorage();
  const [watchCG, setWatchCG] = useCGWatchStorage();
  const { conversion } = useCurrencyConvert(currency);
  const { chainId } = useMoralis();
  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "PHP") setSymbol("₱");
  }, [currency]);

  return (
    <Top.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        conversion,
        starredToken,
        setStarredToken,
        watchCG,
        setWatchCG,
      }}
    >
      {children}
    </Top.Provider>
  );
};

export default TopContext;

export const TopState = () => {
  return useContext(Top);
};
