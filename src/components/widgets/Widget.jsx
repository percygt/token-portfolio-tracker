import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import "./widget.scss";

const Widget = () => {
  return (
    <div className="widget">
      <div className="left">
        <span className="token__symbol">BTC</span>
        <span className="token__name">BITCOIN</span>
      </div>
      <div className="right">
        <span className="token__price">$43,000</span>

        <span className="token__24hChange positive">
          <ArrowDropDownRoundedIcon className="arrow_icon" />
          <span className="percentage">+10%</span>
        </span>
      </div>
    </div>
  );
};

export default Widget;
