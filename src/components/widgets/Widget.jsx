import React from "react";

import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import { Swiper, SwiperSlide } from "swiper/react";

import "./widget.scss";

const Widget = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  return (
    <div className="widget">
      <div className="left">
        <div className="token__symbol">
          <img src={image} alt="crypto" className="c_icon" />
          {symbol}
        </div>

        <div className="token__name">{name}</div>
        <div className="volume">24h Vol: ${volume.toLocaleString()}</div>
      </div>
      <div className="right">
        <div className="token__price">${price.toLocaleString()}</div>
        {priceChange < 0 ? (
          <div className="token__24hChange negative">
            <span>{priceChange.toFixed(2)}%</span>
            <ArrowDropDownRoundedIcon className="arrow_icon" />
          </div>
        ) : (
          <div className="token__24hChange positive">
            <span>{priceChange.toFixed(2)}%</span>
            <ArrowDropUpRoundedIcon className="arrow_icon" />
          </div>
        )}
        <div className="market_cap">Mkt Cap: ${marketcap.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Widget;
