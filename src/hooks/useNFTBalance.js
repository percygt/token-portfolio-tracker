import { NFTBalance } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useNFTBalance = (addr, chainId) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const nftBalanceResponse = async () => {
      setIsLoading(true);
      if (addr) {
        try {
          const baseURL = NFTBalance(addr);
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
          const nftData = response?.data?.result;
          if (
            isMounted &&
            typeof response === "object" &&
            Array.isArray(nftData) &&
            nftData.length
          )
            setAssets(nftData);
        } catch (err) {
          if (isMounted) setAssets([]);
          console.log(err.stack);
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };
    nftBalanceResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [addr, chainId, API_KEY]);

  return { assets, isLoading };
};
