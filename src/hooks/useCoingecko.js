import axios from "axios";
import { useEffect, useState, useCallback } from "react";

export const useCoingecko = (initialValue) => {
  const [coins, setCoins] = useState(initialValue);

  const fetchGeckoResponse = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      );
      console.log("fetching data from CoinGecko...");
      if (!response) return [];
      return response;
    } catch (err) {
      console.log(err.stack);
    }
  }, []);

  useEffect(() => {
    async function fetchAssets() {
      await fetchGeckoResponse().then((res) => {
        setCoins(res.data);
      });
    }

    fetchAssets();
  }, [fetchGeckoResponse]);

  return [coins, fetchGeckoResponse];
};
