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
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
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
            360: {
              slidesPerView: 2,
              spaceBetween: 140,
            },
            374: {
              slidesPerView: 2,
              spaceBetween: 120,
            },
            539: {
              slidesPerView: 2,
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
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 50,
            },
          }}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className="widgets__container mySwiper"
        >
          {coins.map((coin) => {
            return (
              <SwiperSlide>
                <Widget
                  key={coin.id}
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

export default Home;
