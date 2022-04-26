import { useEffect, useState, useCallback } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useTokenBalance = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const {
    Moralis,
    chainId,
    account: walletAddress,
    isAuthenticated,
    isInitialized,
  } = useMoralis();
  const { fetch, data, error } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenBalances,
    {
      chain: chainId,
    }
  );
  useEffect(() => {
    let isMounted = true;
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch();
        console.log("fetching balance from moralis...");
        if (isMounted) {
          if (!response) setAssets([]);
          else setAssets(response);
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
  }, [fetch]);

  return [assets, isLoading];
};
