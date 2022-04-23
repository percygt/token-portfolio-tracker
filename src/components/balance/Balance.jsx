import React from "react";
import "./balance.scss";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const Balance = () => {
  return (
    <div className="balance_detail">
      <div className="balance_label">Balance Detail</div>
      <div className="balance_content">
        <div className="top">
          <div className="left">
            <div className="balance_total_label">Total:</div>
            <div className="balance_total_usd">$1,068,689.88</div>
            <div className="balance_total_btc">
              25.09 <span>BTC</span>
            </div>
          </div>
          <div className="right">
            <a href="#pancakeswap" className="swap">
              <SwapHorizIcon style={{ fontSize: "4rem" }} />
            </a>
          </div>
        </div>
        <div className="bottom">
          <div className="transact">
            <div className="receive btn">Receive</div>
            <div className="send btn">Send</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
