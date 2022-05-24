import Holdings from "../holdings/Holdings";
import Balance from "../balance/Balance";
import Watchlist from "../watchlist/Watchlist";
import Transaction from "../transaction/Transaction";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useEffect, useState } from "react";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useMoralis } from "react-moralis";
import Chart from "../walletChart/Chart";

const TokenDasboard = () => {
  const [assets] = useTokenBalance([]);
  const [priceData, setAddresses] = useDexPrice();
  const [masterData, setMasterData] = useState([]);
  const { Moralis } = useMoralis();

  useEffect(() => {
    const dataAcc = priceData.map((price) => {
      let val = [];
      if (price !== undefined) {
        assets.map((asset) => {
          if (
            asset !== undefined &&
            price.token_address === asset.token_address
          ) {
            val = { ...price, ...asset };
          }
          return null;
        });
      }
      return val;
    });
    // console.log("dataAcc", dataAcc);
    const assetsData = Object.fromEntries(
      dataAcc.map((data) => [data.token_address, data])
    );
    const assetsObj = Object.keys(assetsData)?.map((key, index) => {
      if (
        assetsData[key].balance !== undefined &&
        assetsData[key].decimals !== undefined
      ) {
        const balanceFrWei = Moralis?.Units?.FromWei(
          assetsData[key].balance,
          assetsData[key].decimals
        );
        const value = assetsData[key].price * balanceFrWei;
        assetsData[key]["value"] = value;
        // console.log(assetsData[key]);
        return assetsData[key];
      }
    });
    // console.log(assetsObj);
    setMasterData(assetsData);
  }, [assets, priceData, Moralis?.Units]);

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
      <Chart />
      <Holdings masterData={masterData} />
      {/* <Balance masterData={masterData} /> */}
      {/* <Watchlist /> */}
      <Transaction />
    </>
  );
};

export default TokenDasboard;
