import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import "./carousel.scss";
import { useCoingecko } from "../../hooks/useCoingecko";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  const [coins] = useCoingecko(TrendingCoins("usd"));
  const items = coins.map((coin) => (
    <div className="widget">
      <div className="left">
        <div className="token__symbol">
          <img src={coin.image} alt="crypto" className="c_icon" />
          {coin.symbol}
        </div>
        <div className="token__name">{coin.name}</div>
        {/* <div className="volume">24h Vol: ${coin.volume}</div> */}
      </div>
      <div className="right">
        <div className="token__price">
          ${parseFloat(coin.current_price).toLocaleString()}
        </div>
        {coin.price_change_percentage_24h < 0 ? (
          <div className="token__24hChange negative">
            <ArrowDropDownRoundedIcon className="arrow_icon" />
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        ) : (
          <div className="token__24hChange positive">
            <ArrowDropUpRoundedIcon className="arrow_icon" />
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        )}
        {/* <div className="market_cap">Mkt Cap: ${coin.marketcap}</div> */}
      </div>
    </div>
  ));
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1000: {
      items: 6,
    },
    1500: {
      items: 8,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
