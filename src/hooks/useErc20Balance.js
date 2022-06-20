import { Erc20Balance } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useErc20Balance = (address, chainId) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const erc20BalanceResponse = async () => {
      setIsLoading(true);
      try {
        const baseURL = Erc20Balance(address);
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
    };
    erc20BalanceResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [address, chainId]);

  return { assets, isLoading };
};
