import { useEffect, useState } from "react";
import { useNFTBalance } from "../../hooks/useNFTBalance";
import { TopState } from "../../context/TopContext";
import { PortfolioState } from "../../context/PortfolioContext";
import axios from "axios";

const ProcessNFTMoralis = async () => {
  const { address, chain } = TopState();
  const { assets } = useNFTBalance(address, chain);
  const { setNFTLoading, setNFTData } = PortfolioState();

  useEffect(() => {
    let isMounted = true;
    setNFTLoading(true);
    const nftWithURI = assets.filter((data) => data.token_uri);
    const source = axios.CancelToken.source();
    const getNFTDetails = async () =>
      Promise.all(
        nftWithURI.map(async (nft) => {
          try {
            const baseURL = nft.token_uri;
            const options = {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            };
            const response = await axios.get(baseURL, options, {
              cancelToken: source.token,
            });
            const nftData = response?.data;
            nftData.status = response?.status;
            nftData.token_hash = nft.token_hash;
            if (
              isMounted &&
              typeof response === "object" &&
              Object.keys(nftData).length
            )
              return nftData;
          } catch (err) {
            if (isMounted) {
              const errRes = {
                token_hash: nft.token_hash,
                status: err?.response?.status,
              };
              setNFTLoading(false);
              return errRes;
            }
          }
        })
      );

    async function fetchAssets() {
      if (nftWithURI?.length) {
        const nftData = await getNFTDetails();
        const combinedData = nftWithURI.map((asset, i) => {
          const includeNFTData = nftData.filter(
            (nft) =>
              nft?.token_hash === asset?.token_hash && nft?.status === 200
          );
          let fetchedNFT = { ...asset, ...includeNFTData[0] };
          return fetchedNFT;
        });

        const nftFinalData = combinedData.filter((data) => data.status === 200);
        setNFTData(nftFinalData);
        isMounted && setNFTLoading(false);
      }
    }
    fetchAssets();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [assets, address, chain]);
};

export default ProcessNFTMoralis;
