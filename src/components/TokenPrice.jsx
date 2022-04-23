import { useTokenPrice } from "react-moralis";

const TokenPrice = (props) => {
  const {
    fetchTokenPrice,
    data: formattedData,
    error,
    isLoading,
    isFetching,
  } = useTokenPrice(props);

  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <pre>
        {formattedData === null
          ? "Loading..." && fetchTokenPrice
          : JSON.stringify(formattedData.formattedUsd, null, 2).replace(
              /\"/g,
              ""
            )}
      </pre>
    </div>
  );
};

export default TokenPrice;
