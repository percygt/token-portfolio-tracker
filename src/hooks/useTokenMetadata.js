import { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useTokenMetadata = () => {
  // console.log(address);
  const [metadata, setMetadata] = useState([]);
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { chainId } = useMoralis();
  const { fetch } = useMoralisWeb3ApiCall(Web3Api.token.getTokenMetadata, {
    chain: chainId,
    addresses: address,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch();

        if (isMounted) {
          if (Array.isArray(response) && response.length) setMetadata(response);
        }
      } catch (err) {
        if (isMounted) {
          setMetadata([]);
          console.log(err.stack);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchResponse();
    return () => {
      isMounted = false;
    };
  }, [fetch]);
  return [metadata, setAddress];
};
