import axios from "axios";
import { useEffect, useState, useRef } from "react";

const FetchDexTokenPrice = ({ token_address, token_balance }) => {
  const [dexData, setDexData] = useState([]);
  const [tokenValue, setTokenValue] = useState([]);
  const isCurrent = useRef(true);
  const tokenValRef = useRef();
  console.log(tokenValRef.current);
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);
  useEffect(() => {
    const getPancakeData = async (i) => {
      const address = i;
      try {
        const getAPI = await axios.get(
          `https://api.pancakeswap.info/api/v2/tokens/${address}`
        );
        const pancakeData = await getAPI.data.data;
        if (isCurrent.current) {
          setDexData(parseFloat(pancakeData.price));
        }

        if (token_balance !== "false" && isCurrent.current) {
          calcValue(pancakeData.price);
        }
      } catch (err) {
        const errData = { price: "0", price_BNB: "0" };
        if (isCurrent.current) {
          setDexData(errData.price);
        }

        if (token_balance !== "false" && isCurrent.current) {
          calcValue(errData.price);
        }
      }
    };
    getPancakeData(token_address);
    const calcValue = (pr) => {
      const price = parseFloat(pr);
      const value = price * token_balance;

      setTokenValue(value);
    };
  }, [token_address, token_balance]);

  return (
    <>
      {token_balance === "false" ? (
        <div>${dexData.toLocaleString()}</div>
      ) : (
        <div ref={tokenValRef}>${tokenValue.toLocaleString()}</div>
      )}
    </>
  );
};

export default FetchDexTokenPrice;
