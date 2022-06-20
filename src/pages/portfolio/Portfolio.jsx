import React from "react";
import "./portfolio.scss";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useMoralis, useNativeBalance } from "react-moralis";
import { useNativeBalanceCustom } from "../../hooks/useNativeBalanceCustom";
import { PortfolioState } from "../../context/PortfolioContext";
import { Dashboard } from "./Dashboard";
import { useErc20Balance } from "../../hooks/useErc20Balance";
import { MainState } from "../../context/MainContent";
// import { TopState } from "../../context/TopContext";

const Portfolio = () => {
  const { Moralis, chainId, account: walletAddress } = useMoralis();
  const { assets } = useErc20Balance(walletAddress, chainId);
  const [filteredAssets, setFilteredfilteredAssets] = useState([]);
  const { setMasterData, removedToken } = PortfolioState();
  const { starredToken } = MainState();

  const [priceData, setAddresses] = useDexPrice();
  const [contWidth, setContWidth] = useState(100);
  const [contHeight, setContHeight] = useState(100);
  const [height, setHeight] = useState(20);
  const contRef = useRef();
  const { nativeToken } = useNativeBalance();
  const { asset } = useNativeBalanceCustom();
  useEffect(() => {
    contHeight < 630 ? setHeight(25) : setHeight(30);
  }, [contHeight]);

  useEffect(() => {
    const getFilterefToken = async () => {
      if (
        Array.isArray(assets) &&
        assets[0]?.token_address &&
        asset?.balance &&
        nativeToken?.decimals
          ? true
          : false
      ) {
        const fullBalance = [
          {
            token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            balance: asset.balance,
            decimals: nativeToken.decimals,
            name: nativeToken.name,
            symbol: nativeToken.symbol,
          },
          ...assets,
        ];
        let tempArray = [];
        if (Array.isArray(fullBalance) && fullBalance[0]?.token_address) {
          await fullBalance?.forEach((data) => {
            if (!removedToken.includes(data.token_address))
              tempArray = [...tempArray, data];
          });
          if (tempArray.length && tempArray[0]?.token_address ? true : false) {
            setFilteredfilteredAssets(tempArray);
          }
        }
      }
    };
    getFilterefToken();
  }, [removedToken, nativeToken, asset, assets]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setContWidth(event[0].contentBoxSize[0].inlineSize);
      setContHeight(event[0].contentBoxSize[0].blockSize);
    });

    if (contRef) {
      resizeObserver.observe(contRef.current);
    }
  }, [contRef]);
  useEffect(() => {
    let checkArray =
      Array.isArray(priceData) &&
      Array.isArray(filteredAssets) &&
      priceData.length &&
      filteredAssets.length &&
      priceData[0]?.token_address &&
      filteredAssets[0]?.token_address
        ? true
        : false;
    if (checkArray) {
      const combinedData = filteredAssets.map((asset, i) => {
        let x = 255 / filteredAssets.length;
        let mult = i + 1;
        let r = 150 - x * mult;
        let g = 150 - (x * mult) / 4;
        let b = 150;
        let rgb = `rgb(${r},${g},${b})`;
        const includeData = priceData.filter(
          (data) => data?.token_address == asset?.token_address
        );
        let newData = { ...asset, ...includeData[0] };
        const balanceFrWei = Moralis?.Units?.FromWei(
          newData.balance,
          newData.decimals
        );
        const value = newData.price * balanceFrWei;
        newData.value = value;
        newData.balance = balanceFrWei;
        newData.color = rgb;
        starredToken?.includes(newData.token_address)
          ? (newData.starred = true)
          : (newData.starred = false);
        return newData;
      });
      if (chainId !== "0x61") {
        const pureData = combinedData.filter(
          (data) => parseFloat(data.price).toLocaleString() != 0
        );
        setMasterData(pureData);
      } else {
        setMasterData(combinedData);
      }
    }
  }, [filteredAssets, priceData, starredToken, chainId]);

  useEffect(() => {
    async function getAddress() {
      let checkArray =
        Array.isArray(filteredAssets) &&
        filteredAssets.length &&
        filteredAssets[0]?.token_address
          ? true
          : false;
      if (checkArray) {
        const tokenAddresses = filteredAssets?.map((asset) => {
          return asset.token_address;
        });
        tokenAddresses && setAddresses(tokenAddresses);
      }
    }
    getAddress();
  }, [setAddresses, filteredAssets]);

  return (
    <Dashboard
      contRef={contRef}
      height={height}
      contHeight={contHeight}
      contWidth={contWidth}
    />
  );
};

export default Portfolio;
