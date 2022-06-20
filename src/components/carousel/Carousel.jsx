import AliceCarousel from "react-alice-carousel";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import "./carousel.scss";
import { useCoingecko } from "../../hooks/useCoingecko";
import { CoinList } from "../../config/api";
import { TopState } from "../../context/TopContext";
import { useMemo } from "react";

const Carousel = () => {
  const { currency, symbol } = TopState();
  const [coins, isLoading] = useCoingecko(CoinList(currency));
  console.log(currency);
  console.log(symbol);
  console.log(coins);

  // const curr = useMemo(currency, currency);
  // const sym = useMemo(symbol, currency);

  const items =
    typeof currency !== "string" || typeof symbol !== "string" || !coins.length
      ? []
      : coins.map((coin) => (
          <div className="widget" key={coin.id}>
            <div className="left">
              <div className="token__symbol">
                <img src={coin.image} alt="crypto" className="c_icon" />
                {coin.symbol}
              </div>
              <div className="token__name">
                {coin.name.length <= 10
                  ? coin.name
                  : `${coin.name.slice(0, 10)}...`}
              </div>
              {/* <div className="volume">24h Vol: ${coin.volume}</div> */}
            </div>
            <div className="right">
              <div className="token__price">
                {symbol}
                {parseFloat(coin.current_price).toLocaleString()}
              </div>
              {coin.price_change_percentage_24h < 0 ? (
                <div className="token__24hChange negative">
                  <ArrowDropDownRoundedIcon className="arrow_icon" />
                  {Number(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              ) : (
                <div className="token__24hChange positive">
                  <ArrowDropUpRoundedIcon className="arrow_icon" />
                  {Number(coin.price_change_percentage_24h).toFixed(2)}%
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
      items: 3,
    },
    1000: {
      items: 4,
    },
    1500: {
      items: 6,
    },
    1700: {
      items: 8,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2000}
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
