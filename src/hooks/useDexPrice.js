import axios from "axios";
import { useEffect, useState } from "react";
import { getWrappedNative } from "../helpers/networks";

const IsNative = (address) =>
  address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const useDexPrice = (chain) => {
  const [addresses, setAddresses] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    setIsLoading(true);
    const getDataPrices = async (tokenAddresses) =>
      Promise.all(
        tokenAddresses.map(async (address) => {
          const tokenAddress = IsNative(address)
            ? getWrappedNative(chain)
            : address;
          try {
            console.log("fetching data from DEX...");
            const response = await axios.get(
              `https://api.pancakeswap.info/api/v2/tokens/${tokenAddress}`,
              { cancelToken: source.token }
            );
            const tokenData = response?.data?.data;

            if (
              isMounted &&
              typeof response === "object" &&
              Object.entries(tokenData).length
                ? true
                : false
            ) {
              return Object.assign(tokenData, {
                token_address: address,
                status: response?.status,
              });
            }
          } catch (err) {
            if (isMounted) {
              return { token_address: address, status: err?.response?.status };
            }
            console.log(err);
          }
        })
      );

    async function fetchAssets() {
      if (addresses.length) {
        const tokenPriceData = await getDataPrices(addresses);
        setPriceData(tokenPriceData);
        isMounted && setIsLoading(false);
      }
    }
    fetchAssets();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [addresses, chain]);
  return { isLoading, priceData, setAddresses };
};
