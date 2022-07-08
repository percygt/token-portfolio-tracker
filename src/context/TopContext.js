import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useMoralis } from "react-moralis";

const Top = createContext();
const TopContext = ({ children }) => {
  const { account: walletAddress, isAuthenticated, chainId } = useMoralis();
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [address, setAddress] = useState(null);
  const { conversion } = useCurrencyConvert(currency);
  const chain = chainId ? chainId : "0x38";

  useEffect(() => {
    if (address) setAddress(address);
    else if (address && walletAddress) setAddress(walletAddress);
    else setAddress(walletAddress);
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
        chain,
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
