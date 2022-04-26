import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Mousewheel, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/modules/navigation/navigation.scss";
import { useCoingecko } from "../../hooks/useCoingecko";
import Widget from "../../components/widgets/Widget";

const WidgetDashboard = () => {
  const [coins] = useCoingecko([]);
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        grabCursor={true}
        mousewheel={true}
        modules={[Mousewheel, Pagination]}
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
        // pagination={true}
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
    </>
  );
};

export default WidgetDashboard;
