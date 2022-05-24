import axios from "axios";
import { useEffect, useState } from "react";

export const useCoingecko = (url) => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchGeckoResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        console.log("fetching data from CoinGecko...");

        if (isMounted) {
          if (Array.isArray(response.data && response.data.length))
            setCoins([]);
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
