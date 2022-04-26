import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useDexPrice = () => {
  const [addresses, setAddresses] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    setIsLoading(true);
    const getDataPrices = async (tokenAddresses) =>
      Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
          try {
            console.log("fetching data from DEX...");
            const response = await axios.get(
              `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`,
              { cancelToken: source.token }
            );
            const tokenData = response.data.data;
            if (isMounted) {
              return Object.assign(tokenData, { token_address: tokenAddress });
            }
          } catch (err) {
            const tokenData = { price: "0", price_BNB: "0" };
            if (isMounted) {
              return Object.assign(tokenData, { token_address: tokenAddress });
            }
          }
        })
      );

    async function fetchAssets() {
      const tokenPriceData = await getDataPrices(addresses);
      setPriceData(tokenPriceData);
      // console.log(tokenPriceData);
      isMounted && setIsLoading(false);
    }
    fetchAssets();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [addresses]);
  return [priceData, setAddresses];
};
