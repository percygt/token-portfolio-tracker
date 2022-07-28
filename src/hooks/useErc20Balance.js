import { Erc20Balance } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useErc20Balance = (addr, chainId) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const erc20BalanceResponse = async () => {
      setIsLoading(true);
      if (addr) {
        try {
          const baseURL = Erc20Balance(addr);
          const options = {
            params: { chain: chainId },
            headers: {
              accept: "application/json",
              "X-API-Key": API_KEY,
            },
          };
          const response = await axios.get(baseURL, options, {
            cancelToken: source.token,
          });
          if (isMounted) {
            if (Array.isArray(response.data) && response.data.length)
              setAssets(response.data);
          }
          // return response;
        } catch (err) {
          if (isMounted) setAssets([]);
          console.log(err.stack);
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };
    erc20BalanceResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [addr, chainId, API_KEY]);

  return { assets, isLoading };
};
