import { TokenTransfers } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useTokenTransactions = (address, chainId) => {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const transactionResponse = async () => {
      setIsLoading(true);
      try {
        const baseURL = TokenTransfers(address);
        const options = {
          params: { chain: chainId, limit: 20 },
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY,
          },
        };

        const response = await axios.get(baseURL, options, {
          cancelToken: source.token,
        });

        if (isMounted) {
          if (
            Array.isArray(response?.data?.result) &&
            response?.data?.result?.length
          )
            setTransfers(response?.data?.result);
        }
        // return response;
      } catch (err) {
        if (isMounted) setTransfers([]);
        console.log(err.stack);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    if (address && chainId) {
      transactionResponse();
    }

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [address, chainId]);

  return { transfers, isLoading };
};
