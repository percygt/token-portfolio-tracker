import React, { createContext, useContext, useEffect, useState } from "react";
import { useCurrencyConvert } from "../hooks/useCurrencyConvert";
import { useRemovedTokenStorage } from "../hooks/useRemovedTokenStorage";
import { getWrappedNative } from "../helpers/networks";
import { useMoralis } from "react-moralis";

const Portfolio = createContext();
const PortfolioContext = ({ children }) => {
  const [masterData, setMasterData] = useState([]);
  const [tokenData, setTokenData] = useState([]);
  const [nftData, setNFTData] = useState([]);
  const [removedToken, setRemovedToken] = useRemovedTokenStorage();
  const { chainId } = useMoralis();
  const chain = chainId ? chainId : "0x38";
  const nativeAddress = getWrappedNative(chain)?.toLowerCase();
  const [nftCurrentItems, setNFTCurrentItems] = useState([]);
  const [tokenCurrentItems, setTokenCurrentItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredToken, setFilteredToken] = useState([]);
  const [filteredTNFT, setFilteredTNFT] = useState([]);
  const [asset, setAsset] = useState(null);
  const [nft, setNFT] = useState(null);
  const [assetHover, setAssetHover] = useState(null);
  const [assetClick, setAssetClick] = useState(null);
  const [nftHover, setNFTHover] = useState(null);
  const [nftClick, setNFTClick] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [nftLoading, setNFTLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const filtered = tokenData.filter(
      (data) =>
        data.contract_name.toLowerCase().includes(search.toLowerCase()) ||
        data.contract_ticker_symbol.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredToken(filtered);
  }, [search, tokenData]);
  useEffect(() => {
    setItemOffset(0);
  }, [search]);
  useEffect(() => {
    const filtered = nftData.filter(
      (data) =>
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.token_address.toLowerCase().includes(search.toLowerCase()) ||
        data.token_hash.toLowerCase().includes(search.toLowerCase()) ||
        data.token_id.toLowerCase().includes(search.toLowerCase()) ||
        data.token_id.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTNFT(filtered);
  }, [search, nftData]);

  useEffect(() => {
    assetClick
      ? setAsset(assetClick)
      : assetHover
      ? setAsset(assetHover)
      : setAsset(null);
  }, [assetClick, assetHover]);

  useEffect(() => {
    nftClick ? setNFT(nftClick) : nftHover ? setNFT(nftHover) : setNFT(null);
  }, [nftClick, nftHover]);
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
        nftCurrentItems,
        setNFTCurrentItems,
        search,
        setSearch,
        filteredToken,
        assetHover,
        setAssetHover,
        assetClick,
        setAssetClick,
        openModal,
        setOpenModal,
        nftData,
        setNFTData,
        tokenData,
        setTokenData,
        nftHover,
        setNFTHover,
        nftClick,
        setNFTClick,
        nft,
        setNFT,
        filteredTNFT,
        tokenCurrentItems,
        setTokenCurrentItems,
        tokenLoading,
        setTokenLoading,
        nftLoading,
        setNFTLoading,
        itemOffset,
        setItemOffset,
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
