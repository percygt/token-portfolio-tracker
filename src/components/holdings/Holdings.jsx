import "./holdings.scss";

const Holdings = () => {
  return (
    <div className="holdings">
      <div className="holdings_label">Holdings</div>
      <div className="wallet">
        {data.map((coin) => {
          return (
            <div className="wallet_content">
              <div className="left">
                <div className="token_symbol_price">
                  <span className="token_symbol">{coin.token_symbol}</span>
                  <span className="token_price">{coin.token_price}</span>
                </div>
                <div className="token_name">{coin.token_name}</div>
              </div>
              <div className="right">
                <div className="token_amount">{coin.token_amount}</div>
                <div className="token_value">{coin.token_value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const data = [
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_amount: "1.545342",
    token_value: "95453",
  },
  {
    token_name: "Cardano",
    token_symbol: "ADA",
    token_price: "$0.98",
    token_amount: "1",
    token_value: "87878",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_amount: "1",
    token_value: "87878",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_amount: "1",
    token_value: "87878",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_amount: "1",
    token_value: "87878",
  },
];

export default Holdings;
