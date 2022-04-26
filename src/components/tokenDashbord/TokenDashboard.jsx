import Holdings from "../holdings/Holdings";
import Balance from "../balance/Balance";
import Watchlist from "../watchlist/Watchlist";
import Transaction from "../transaction/Transaction";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useEffect, useState } from "react";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useMoralis } from "react-moralis";

const TokenDasboard = () => {
  const [assets] = useTokenBalance([]);
  const [priceData, setAddresses] = useDexPrice();
  const [masterData, setMasterData] = useState([]);
  const { Moralis } = useMoralis();
  useEffect(() => {
    const dataAcc = priceData.map((price) => {
      let value = [];
      if (price !== undefined) {
        assets.map((asset) => {
          if (
            asset !== undefined &&
            price.token_address === asset.token_address
          ) {
            value = { ...price, ...asset };
          }
          return null;
        });
      }
      return value;
    });
    const assetsData = Object.fromEntries(
      dataAcc.map((data) => [data.token_address, data])
    );
    Object.keys(assetsData)?.map((key, index) => {
      const value =
        parseFloat(assetsData[key].price) *
        parseFloat(
          Moralis?.Units?.FromWei(
            assetsData[key].balance,
            assetsData[key].decimals
          )
        );
      assetsData[key]["value"] = value;
    });
    console.log(assetsData);
    setMasterData(assetsData);
  }, [assets, priceData]);
  useEffect(() => {
    async function getAddress() {
      const tokenAddresses = await assets?.map((asset) => {
        return asset.token_address;
      });
      tokenAddresses && setAddresses(tokenAddresses);
    }
    getAddress();
  }, [assets, setAddresses]);
  return (
    <>
      <Holdings masterData={masterData} />
      <Balance masterData={masterData} />
      <Watchlist />
      <Transaction />
    </>
  );
};

export default TokenDasboard;
