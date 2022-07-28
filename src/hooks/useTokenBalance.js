import { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

import { getWrappedNative } from "../helpers/networks";

export const useTokenBalance = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { account: walletAddress, isAuthenticated, chainId } = useMoralis();

  // const { data: nativeBalance, nativeToken } = useNativeBalance();
  const { fetch } = useMoralisWeb3ApiCall(Web3Api.account.getTokenBalances, {
    chain: chainId,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch();
        if (isMounted) {
          const checkArray =
            Array.isArray(response) && response.length ? true : false;
          if (checkArray) {
            setAssets(response);
          }
        }
      } catch (err) {
        if (isMounted) {
          setAssets([]);
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
  }, [fetch, walletAddress]);

  return [assets, isLoading];
};
