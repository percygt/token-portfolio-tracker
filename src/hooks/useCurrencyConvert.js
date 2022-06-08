import axios from "axios";
import { useEffect, useState } from "react";

const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_CONVERSION;

export const useCurrencyConvert = (currency) => {
  const [conversion, setConversion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    console.log(conversion);
    const fetchCurrencyConvert = async () => {
      setIsLoading(true);
      try {
        if (currency !== "USD") {
          const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/pair/USD/${currency}`,
            { cancelToken: source.token }
          );
          console.log(response.data.conversion_rate);

          if (isMounted) {
            if (Object.keys(response).length)
              setConversion(response.data.conversion_rate);
          }
        } else if (isMounted) {
          setConversion(1);
        } else setConversion([]);
      } catch (err) {
        if (isMounted) setConversion([]);
        console.log(err.stack);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchCurrencyConvert();
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [currency]);

  return { conversion, isLoading };
};
