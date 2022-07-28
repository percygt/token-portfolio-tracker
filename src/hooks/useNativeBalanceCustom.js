import { NativeBalance } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useNativeBalanceCustom = (addr, chainId) => {
  const [balance, setBalance] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const nativeBalanceResponse = async () => {
      setIsLoading(true);
      if (addr) {
        try {
          const baseURL = NativeBalance(addr);
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
            if (Object.keys(response).length) setBalance(response.data);
          }
          // return response;
        } catch (err) {
          if (isMounted) setBalance([]);
          console.log(err.stack);
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };
    nativeBalanceResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [addr, chainId, API_KEY]);

  return { balance, isLoading };
};
