import "./transaction.scss";

const Transaction = () => {
  const columns = [
    {
      title: "From",
      dataIndex: "from_address",
      key: "from_address",
      render: (from) => from,
    },
    {
      title: "To",
      dataIndex: "to_address",
      key: "to_address",
      render: (to) => to,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) =>
        // missing second argument in FromWei, decimals
        parseFloat(Moralis.Units.FromWei(value)).toFixed(6),
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash) => (
        <a
          href={
            chainId === "0x1"
              ? `https://etherscan.io/tx/${hash}`
              : chainId === "0x38"
              ? `https://bscscan.com/tx/${hash}`
              : chainId === "0x89"
              ? `https://polygonscan.com/tx/${hash}`
              : `https://explorer.avax.network/search?query=${hash}`
          }
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      ),
    },
  ];
  let key = 0;
  return <div className="transaction grid-col-span-2">Transaction</div>;
};

export default Transaction;
