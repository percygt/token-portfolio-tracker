import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useDexPrice = () => {
  const [addresses, setAddresses] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDexResponse = useCallback(async (tokenAddresses) => {
    const prices = Promise.all(
      tokenAddresses.map(async (tokenAddress) => {
        try {
          const response = await axios.get(
            `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`
          );
          const tokenData = response.data.data;
          console.log("fetching data from DEX...");
          if (!response) return [];
          return { tokenData, tokenAddress };
        } catch (err) {
          const tokenData = { price: "0", price_BNB: "0" };
          return { tokenData, tokenAddress };
        }
      })
    );

    return prices;
  }, []);
  // const tokenPrices = useMemo(() => price, []);
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    async function fetchAssets() {
      setIsLoading(true);
      const tokenPriceData = await fetchDexResponse(addresses);
      if (isMounted) {
        setPriceData(tokenPriceData);
      }
      isMounted && setIsLoading(false);
    }
    fetchAssets();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [fetchDexResponse, addresses]);
  return [priceData, setAddresses, isLoading];
};
