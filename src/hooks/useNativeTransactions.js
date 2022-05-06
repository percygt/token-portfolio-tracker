import { useEffect, useState } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

export const useNativeTransactions = () => {
  const [transfers, setTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress, chainId } = useMoralis();
  const { fetch, data } = useMoralisWeb3ApiCall(
    Web3Api.account.getTokenTransfers,
    {
      address: walletAddress,
      chain: chainId,
      limit: 10,
      // cursor: cursor,
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
          if (!response) setTransfers([]);
          else setTransfers(response?.result);
        }
      } catch (err) {
        if (isMounted) {
          setTransfers([]);
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
  }, [fetch, chainId, isInitialized, walletAddress]);

  return [transfers, isLoading, chainId];
};
