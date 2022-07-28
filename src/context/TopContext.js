import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useMoralis } from "react-moralis";
import COGS from "../assets/COGS-1.png";

const Top = createContext();
const TopContext = ({ children }) => {
  const { account: walletAddress, chainId } = useMoralis();

  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [address, setAddress] = useState(null);
  const [searchAddress, setSearchAddress] = useState(null);
  const { conversion } = useCurrencyConvert(currency);
  const chain = chainId ? chainId : "0x38";
  const chainDec = chainId ? parseInt(chainId, 16) : 56;
  const testNetChains = [3, 4, 42, 5, 1337, 97, 80001];
  const [contWidth, setContWidth] = useState(100);
  const [contHeight, setContHeight] = useState(100);
  const logo = <img src={COGS} alt="cogs-logo" className="logo" />;

  useEffect(() => {
    if (searchAddress) setAddress(searchAddress);
    else if (searchAddress && walletAddress) setAddress(searchAddress);
    else setAddress(walletAddress);
  }, [walletAddress, searchAddress]);

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
        chainDec,
        contHeight,
        setContHeight,
        contWidth,
        setContWidth,
        logo,
        testNetChains,
        searchAddress,
        setSearchAddress,
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
