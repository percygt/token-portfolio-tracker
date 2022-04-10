import "./watchlist.scss";

const Watchlist = () => {
  return (
    <div className="watchlist">
      <div className="watchlist_label">Watchlist</div>
      <div className="watchlist_container">
        {data.map((watch) => {
          return (
            <div className="watchlist_content">
              <div className="left">
                <div className="token_symbol">{watch.token_symbol}</div>
                <div className="token_name">{watch.token_name}</div>
              </div>
              <div className="right">
                <div className="token_price">{watch.token_price}</div>
                <div className="token_24h_change">{watch.token_change}</div>
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
    token_change: "1.6%",
  },
  {
    token_name: "Cardano",
    token_symbol: "ADA",
    token_price: "$0.98",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
  {
    token_name: "Bitcoin",
    token_symbol: "BTC",
    token_price: "$87878",
    token_change: "6%",
  },
];
export default Watchlist;
