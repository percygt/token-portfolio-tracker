import { AddressBalance } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAddressBalance = (addr, chainId) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_CKEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const balanceResponse = async () => {
      setIsLoading(true);
      if (addr) {
        try {
          const baseURL = AddressBalance(addr, chainId);
          const options = {
            params: {
              "quote-currency": "USD",
              format: "JSON",
              nft: true,
              "no-nft-fetch": false,
              key: API_KEY,
            },
            headers: {
              accept: "application/json",
            },
          };
          const response = await axios.get(baseURL, options, {
            cancelToken: source.token,
          });
          console.log(response);
          const addressData = response?.data?.data?.items;
          if (
            isMounted &&
            typeof response === "object" &&
            Array.isArray(addressData) &&
            addressData.length
          )
            setAssets(addressData);
        } catch (err) {
          if (isMounted) setAssets([]);
          console.log(err.stack);
        } finally {
          isMounted && setIsLoading(false);
        }
      }
    };
    let interval = setInterval(() => {
      balanceResponse();
    }, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
      source.cancel();
    };
  }, [addr, chainId, API_KEY]);

  return { assets, isLoading };
};
