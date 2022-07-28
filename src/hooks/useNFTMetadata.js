import { NFTMetadata } from "../config/api";
import axios from "axios";
import { useEffect, useState } from "react";

export const useNFTMetadata = (metaAddr, chainId) => {
  const [nftMetadata, setNFTMetadata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_MORALIS_API_KEY;
  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    setIsLoading(true);
    const metadataResponse = async (data, chain) => {
      const address = data.token_address;
      const id = data.token_id;
      try {
        const baseURL = NFTMetadata(address, id);
        const options = {
          params: { chain },
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.get(baseURL, options, {
          cancelToken: source.token,
        });
        if (
          isMounted &&
          typeof response === "object" &&
          Object.entries(response.data).length
            ? true
            : false
        ) {
          return response.data;
        }
      } catch (err) {
        if (isMounted) return {};
        console.log(err.response.status);
      }
    };

    const requests = metaAddr.map(
      (data, index) =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve(metadataResponse(data, chainId)),
            index * 500
          )
        )
    );

    async function fetchAssets() {
      if (metaAddr && metaAddr.length) {
        const metadata = await Promise.all(requests);
        setNFTMetadata(metadata);
        isMounted && setIsLoading(false);
      }
    }
    fetchAssets();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [metaAddr, chainId]);
  return { isLoading, nftMetadata };
};
