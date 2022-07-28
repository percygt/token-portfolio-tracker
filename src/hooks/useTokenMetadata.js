import { Metadata } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useTokenMetadata = (metaAddr, chainId) => {
  // console.log(address);
  const [metadata, setMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const metadataResponse = async () => {
      setIsLoading(true);
      if (Array.isArray(metaAddr) && metaAddr.length) {
        try {
          const baseURL = Metadata();
          const params = new URLSearchParams();
          params.append("chain", chainId);
          metaAddr.forEach((addr) => {
            params.append("addresses", addr);
          });

          const options = {
            params: params,
            headers: {
              accept: "application/json",
              "X-API-Key": API_KEY,
            },
          };

          const response = await axios.get(baseURL, options, {
            cancelToken: source.token,
          });
          if (isMounted) {
            if (Array.isArray(response?.data) && response?.data?.length)
              setMetadata(response?.data);
          }
        } catch (err) {
          if (isMounted) setMetadata([]);
          console.log(err.stack);
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };

    metadataResponse();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [metaAddr, chainId]);
  return { isLoading, metadata };
};
