import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";

const GetPrice = ({ prices, address }) => {
  const isCurrent = useRef(true);
  const [price, setPrice] = useState([]);
  // const [isLoading, setIsLoading] = useState();

  const priceMemo = useMemo(() => prices, [prices]);
  const addressMemo = useMemo(() => address, [address]);
  useEffect(() => {
    let isMounted = true;
    const getPrice = async (tokenAddress) => {
      const tokenPrice = await priceMemo.filter(async (price) => {
        return (await price.tokenAddress) === tokenAddress;
      });
      // if (!tokenPrice) setprice([]);
      if (tokenPrice.length !== 0) {
        setPrice(tokenPrice);
      }
    };
    getPrice(addressMemo);

    console.log(price);
  }, [prices, address]);

  return [];
};

export default GetPrice;
