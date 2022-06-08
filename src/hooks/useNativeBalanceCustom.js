import { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useNativeBalanceCustom = () => {
  const [asset, setAsset] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { chainId } = useMoralis();
  const { fetch } = useMoralisWeb3ApiCall(Web3Api.account.getNativeBalance, {
    chain: chainId,
  });
  useEffect(() => {
    let isMounted = true;
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch();

        if (isMounted) {
          if (
            typeof response === "object" &&
            response !== null &&
            !Array.isArray(response)
          )
            setAsset(response);
        }
      } catch (err) {
        if (isMounted) {
          setAsset([]);
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

  return { asset, isLoading };
};
