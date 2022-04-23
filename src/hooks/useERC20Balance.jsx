import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useERC20Balance = (params) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, chainId, account: walletAddress } = useMoralis();

  const [assets, setAssets] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance().then((result) => setAssets(result));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, isInitialized, chainId]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: params?.chain || chainId,
      })
      .then((result) => result);
  };

  return { fetchERC20Balance, assets };
};
