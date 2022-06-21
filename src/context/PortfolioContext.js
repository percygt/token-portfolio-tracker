import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useRemovedTokenStorage } from "../hooks/useRemovedTokenStorage";
import { getWrappedNative } from "../helpers/networks";
import { useMoralis } from "react-moralis";

const Portfolio = createContext();
const PortfolioContext = ({ children }) => {
  const [masterData, setMasterData] = useState([]);
  const [removedToken, setRemovedToken] = useRemovedTokenStorage();
  const { chainId } = useMoralis();
  const nativeAddress = getWrappedNative(chainId)?.toLowerCase();
  const [asset, setAsset] = useState(null);

  return (
    <Portfolio.Provider
      value={{
        masterData,
        setMasterData,
        removedToken,
        setRemovedToken,
        asset,
        setAsset,
        nativeAddress,
      }}
    >
      {children}
    </Portfolio.Provider>
  );
};

export default PortfolioContext;

export const PortfolioState = () => {
  return useContext(Portfolio);
};
