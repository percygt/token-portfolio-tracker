import React from "react";
import "./balance.scss";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useState, useEffect } from "react";
import { valueToPercent } from "@mui/base";
import { useCoingecko } from "../../hooks/useCoingecko";
import { useMoralis } from "react-moralis";

const Balance = ({ masterData }) => {
  const { Moralis, account: walletAddress, isAuthenticated } = useMoralis();
  const [totalToken, setTotaltoken] = useState();
  const [coins, isLoading] = useCoingecko();
  const [btcBal, setBtcBal] = useState("");
  useEffect(() => {
    coins.map((coin) => {
      if (totalToken !== undefined) {
        if (coin.id === "bitcoin") {
          const tokalBtc =
            parseFloat(totalToken) / parseFloat(coin.current_price);
          setBtcBal(tokalBtc);
        }
      }
    });
  }, [coins, totalToken]);

  useEffect(() => {
    const values = Object.keys(masterData)?.map((key, index) => {
      return masterData[key].value;
    });
    const totalValues = values.reduce((acc, value) => acc + value, 0);
    setTotaltoken(totalValues);
  }, [masterData]);

  return (
    <div className="balance_detail">
      <div className="balance_label">Balance</div>
      <div className="balance_content">
        <div className="top">
          <div className="balance_total_label">Total Wallet Balance:</div>
          {!masterData || !walletAddress || !isAuthenticated ? (
            "Loading..."
          ) : (
            <>
              <div className="balance_total_usd">
                ${parseFloat(totalToken).toLocaleString()}
              </div>
              <div className="balance_total_btc">
                {parseFloat(btcBal).toLocaleString()} <span>BTC</span>
              </div>
            </>
          )}
        </div>
        <div className="bottom">
          <div className="receiveBtn">Receive</div>
          <div className="sendBtn">Send</div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
