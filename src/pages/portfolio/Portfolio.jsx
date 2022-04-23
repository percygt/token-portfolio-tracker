import React from "react";
import "./portfolio.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widget";
import Watchlist from "../../components/watchlist/Watchlist";
import Balance from "../../components/balance/Balance";
import Holdings from "../../components/holdings/Holdings";
import Transaction from "../../components/transaction/Transaction";
import axios from "axios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./styles.css";

const Portfolio = () => {
  const [coins, setCoins] = useState([]);
  // console.log(coins);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="portfolio">
      <Sidebar />
      <div className="portfolio__container">
        <div className="navbar__container">
          <Navbar />
        </div>
        <div className="widgets__container">
          <div className="widgets_label">Top 10 Crypto</div>
          <Swiper
            // slidesPerView={7}
            // spaceBetween={100}
            // slidesPerGroup={6}
            // loop={true}
            // loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              279: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              410: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              550: {
                slidesPerView: 3,
                spaceBetween: 150,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 180,
              },
              820: {
                slidesPerView: 4,
                spaceBetween: 100,
              },
              910: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              980: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              1500: {
                slidesPerView: 6,
                spaceBetween: 5,
              },
              1600: {
                slidesPerView: 7,
                spaceBetween: 50,
              },
              1800: {
                slidesPerView: 7,
                spaceBetween: 5,
              },
              1900: {
                slidesPerView: 8,
                spaceBetween: 5,
              },
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {coins.map((coin) => {
              return (
                <SwiperSlide key={coin.id}>
                  <Widget
                    name={coin.name}
                    price={coin.current_price}
                    symbol={coin.symbol}
                    marketcap={coin.total_volume}
                    volume={coin.market_cap}
                    image={coin.image}
                    priceChange={coin.price_change_percentage_24h}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="main__container">
          <Holdings />
          <Balance />
          <Watchlist />
          <Transaction />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
