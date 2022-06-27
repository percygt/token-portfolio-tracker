import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useStarredTokenStorage } from "../hooks/useStarredTokenStorage";
import { useCGWatchStorage } from "../hooks/useCGWatchStorage";
import { useMoralis } from "react-moralis";
const Top = createContext();
const TopContext = ({ children }) => {
  const { account: walletAddress } = useMoralis();
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [address, setAddress] = useState("");
  const { conversion } = useCurrencyConvert(currency);
  useEffect(() => {
    if (!address) setAddress(walletAddress);
    else setAddress(address);
  }, [walletAddress]);
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
        address,
        setAddress,
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
