import { useEffect, useState, useRef, useMemo } from "react";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useNativeBalanceCustom } from "../../hooks/useNativeBalanceCustom";
import { PortfolioState } from "../../context/PortfolioContext";
import { useErc20Balance } from "../../hooks/useErc20Balance";
import { MainState } from "../../context/MainContent";
import { TopState } from "../../context/TopContext";
import { networkConfigs } from "../../helpers/networks";

const ProcessTokenMoralis = async () => {
  const { address, chain, chainDec, testNetChains } = TopState();
  const { assets, isLoading } = useErc20Balance(address, chain);
  const [filteredAssets, setFilteredfilteredAssets] = useState([]);
  const { setTokenData, removedToken, setTokenLoading } = PortfolioState();
  const { starredToken } = MainState();
  const { priceData, setAddresses } = useDexPrice(chain);
  const { balance } = useNativeBalanceCustom(address, chain);
  useEffect(() => {
    setTokenLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    const getFilterefToken = async () => {
      if (
        Array.isArray(assets) && assets[0]?.token_address && balance?.balance
          ? true
          : false
      ) {
        const fullBalance = [
          {
            token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            balance: balance.balance,
            decimals: networkConfigs[chain].decimals,
            name: networkConfigs[chain].currencyName,
            symbol: networkConfigs[chain].currencySymbol,
          },
          ...assets,
        ];
        let tempArray = [];
        if (Array.isArray(fullBalance) && fullBalance[0]?.token_address) {
          fullBalance?.forEach((data) => {
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
  }, [removedToken, balance, assets, address]);

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
        const includePriceData = priceData.filter(
          (data) =>
            data?.token_address == asset?.token_address && data?.status === 200
        );

        let fetchedData = { ...asset, ...includePriceData[0] };
        let newData = {};

        const urlAddress =
          fetchedData?.token_address ===
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            ? networkConfigs[chain].eth
            : fetchedData?.token_address;
        const chainUrl =
          fetchedData?.token_address ===
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            ? 1
            : chainDec;

        newData.contract_name = fetchedData?.name;
        newData.contract_decimals = fetchedData?.decimals;
        newData.contract_ticker_symbol = fetchedData?.symbol;
        newData.contract_address = fetchedData?.token_address;
        newData.logo_url = `https://logos.covalenthq.com/tokens/${chainUrl}/${urlAddress}.png`;
        newData.quote = parseFloat(fetchedData?.price)
          ? (parseFloat(fetchedData?.balance) /
              10 ** parseFloat(fetchedData?.decimals)) *
            parseFloat(fetchedData?.price)
          : 0;
        newData.quote_rate = parseFloat(fetchedData?.price)
          ? parseFloat(fetchedData?.price)
          : 0;
        newData.balance = parseFloat(fetchedData?.balance);
        newData.color = rgb;
        starredToken?.includes(fetchedData?.token_address)
          ? (newData.starred = true)
          : (newData.starred = false);
        return newData;
      });
      const testChain = testNetChains?.includes(chainDec);
      const finalTokenData = combinedData?.filter((data) => {
        if (testChain) return data;
        return data.quote_rate;
      });
      finalTokenData.sort((a, b) => {
        return b.quote - a.quote;
      });
      setTokenData(finalTokenData);
    }
  }, [filteredAssets, priceData, starredToken, chain, address]);

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

  //Process NFT Data
};

export default ProcessTokenMoralis;
