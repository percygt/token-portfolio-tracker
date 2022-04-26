import "./holdings.scss";
import { useMoralis } from "react-moralis";

const Holdings = ({ masterData }) => {
  const { Moralis, account: walletAddress, isAuthenticated } = useMoralis();

  return (
    <div className="holdings">
      <div className="holdings_label">Holdings</div>
      <div className="wallet">
        {!masterData || !walletAddress || !isAuthenticated
          ? "Loading..."
          : Object.keys(masterData)?.map((key, index) => {
              return (
                <div className="wallet_content" key={key}>
                  <div className="left">
                    <div className="token_symbol_price">
                      <div className="token_symbol">
                        {masterData[key].symbol}
                      </div>
                      <div className="token_price" style={{ color: "green" }}>
                        ${parseFloat(masterData[key].price).toLocaleString()}
                      </div>
                    </div>
                    <div className="token_name">{masterData[key].name}</div>
                  </div>
                  <div className="right">
                    <div className="token_amount">
                      {parseFloat(
                        Moralis?.Units?.FromWei(
                          masterData[key].balance,
                          masterData[key].decimals
                        )
                      ).toLocaleString()}
                    </div>
                    <div className="token_value" style={{ color: "green" }}>
                      ${masterData[key].value.toLocaleString()}
                      {/* {(
                        parseFloat(
                          Moralis?.Units?.FromWei(
                            masterData[key].balance,
                            masterData[key].decimals
                          )
                        ) * parseFloat(masterData[key].price)
                      ).toLocaleString()} */}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Holdings;
