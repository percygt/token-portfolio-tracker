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
  const [currentItems, setCurrentItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredToken, setFilteredToken] = useState([]);
  useEffect(() => {
    const filtered = masterData.filter(
      (data) =>
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredToken(filtered);
  }, [search, masterData]);
  // const filteredToken = masterData.filter(
  //   (data) =>
  //     data.name.toLowerCase().includes(search.toLowerCase()) ||
  //     data.symbol.toLowerCase().includes(search.toLowerCase())
  // );
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
        currentItems,
        setCurrentItems,
        search,
        setSearch,
        filteredToken,
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
