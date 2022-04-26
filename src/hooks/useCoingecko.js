import axios from "axios";
import { useEffect, useState } from "react";

export const useCoingecko = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchGeckoResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
          { cancelToken: source.token }
        );
        console.log("fetching data from CoinGecko...");

        if (isMounted) {
          if (!response) setCoins([]);
          else setCoins(response.data);
        }
        // return response;
      } catch (err) {
        if (isMounted) setCoins([]);
        console.log(err.stack);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchGeckoResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, []);

  return [coins, isLoading];
};
