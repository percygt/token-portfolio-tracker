import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import "./widgets.scss";

const Widgets = () => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">BITCOIN</span>
        <span className="counter">$45,000</span>
        <span className="details">View more</span>
      </div>
      <div className="right">
        <ArrowDropDownRoundedIcon />
        <span className="percentage">-10%</span>
        <span className="explorer">
          <ExploreRoundedIcon />
        </span>
      </div>
    </div>
  );
};

export default Widgets;
