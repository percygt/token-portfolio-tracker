import TokenPrice from "./TokenPrice";

import { useMoralis } from "react-moralis";
const Balance = ({ address, name, balance, decimals, symbol }) => {
  const { Moralis } = useMoralis();
  return (
    <div>
      <div className="left">
        <div className="token_symbol_price">
          <span className="token_symbol">{symbol}</span>
          <span className="token_price"></span>
        </div>
        <div className="token_name">{name}</div>
      </div>
      <div className="right">
        <div className="token_amount">
          {parseFloat(Moralis?.Units?.FromWei(balance, decimals)).toFixed(6)}
        </div>
      </div>
    </div>
  );
};
export default Balance;
