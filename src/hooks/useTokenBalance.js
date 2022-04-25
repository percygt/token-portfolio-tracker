import { useEffect, useState, useCallback } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useTokenBalance = (initialValue) => {
  const [assets, setAssets] = useState(initialValue);
  const Web3Api = useMoralisWeb3Api();
  const {
    Moralis,
    chainId,
    account: walletAddress,
    isAuthenticated,
    isInitialized,
  } = useMoralis();
  const { fetch } = useMoralisWeb3ApiCall(Web3Api.account.getTokenBalances, {
    chain: chainId,
  });
  const fetchResponse = useCallback(async () => {
    try {
      const response = await fetch();
      console.log("fetching balance from moralis...");
      if (!response) return [];
      return response;
    } catch (err) {
      console.log(err.stack);
    }
  }, [fetch]);

  useEffect(() => {
    async function fetchAssets() {
      await fetchResponse().then((balance) => {
        setAssets(balance);
      });
    }
    if (isInitialized) {
      fetchAssets();
    }
  }, [fetchResponse]);

  return [assets, fetchResponse, isInitialized];
};
