import "./watchlist.scss";
import CloseIcon from "@mui/icons-material/Close";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { useState, useEffect } from "react";
import { getRoundDown } from "../../helpers/formatters";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useCoingecko } from "../../hooks/useCoingecko";
import { CoinList } from "../../config/api";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";

const Watchlist = () => {
  const { currency, symbol, conversion, chain } = TopState();
  const { starredToken, setStarredToken } = MainState();
  const [search, setSearch] = useState("");
  const [dexWatchlist, setDexWatchlist] = useState([]);
  const [coinWatchlist, setCoinWatchlist] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const { priceData, setAddresses } = useDexPrice(chain);
  const [onHover, setOnHover] = useState(null);
  const [coins] = useCoingecko(CoinList(currency));
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchGecko = coins.filter(
    (data) =>
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const handleClose = (t, i) => {
    if (t) {
      setStarredToken([...starredToken.filter((val) => val !== t)]);
    } else {
      setStarredToken([...starredToken.filter((val) => val !== i)]);
    }
  };
  const handleAdd = (search) => {
    if (search) {
      setStarredToken([...starredToken, search.id]);
      notify(search.name);
      setSearch("");
    }
  };
  const notify = (name) =>
    toast(`${name} added to Watchlist`, {
      position: "top-center",
      autoClose: 250,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "toast-copy",
      bodyClassName: "toast-copy-body",
    });
  useEffect(() => {
    const starredAddress = starredToken.filter((addr) => {
      return addr.slice(0, 2) === "0x";
    });
    setAddresses(starredAddress);
  }, [starredToken]);

  useEffect(() => {
    const dexWatch = priceData.map((data) => {
      const newDataObject = {};
      newDataObject.token_address = data.token_address;
      newDataObject.id = null;
      newDataObject.name = data.name;
      newDataObject.price = data.price;
      newDataObject.symbol = data.symbol.toUpperCase();
      newDataObject.from = "PancakeSwap";
      return newDataObject;
    });

    setDexWatchlist(dexWatch);
  }, [priceData]);
  useEffect(() => {}, []);
  useEffect(() => {
    const coinAddress = starredToken.filter((addr) => {
      return addr.slice(0, 2) !== "0x";
    });
    const coinWatch = coins?.filter((data) => coinAddress?.includes(data.id));
    const coinEdit = coinWatch.map((data) => {
      const newDataObject = {};
      newDataObject.token_address = null;
      newDataObject.id = data.id;
      newDataObject.name = data.name;
      newDataObject.price = data.current_price;
      newDataObject.symbol = data.symbol.toUpperCase();
      newDataObject.from = "CoinGecko";
      return newDataObject;
    });
    const isNullOrUndefined = (value) => {
      if (Array.isArray(value)) return value.every(isNullOrUndefined);
      if (!value && typeof value === "object")
        return Object.values(value).every(isNullOrUndefined);
      return value === undefined;
    };
    setCoinWatchlist(coinEdit);
  }, [coins, starredToken]);
  useEffect(() => {
    const watch = starredToken?.map((token) => {
      return token.slice(0, 2) === "0x"
        ? dexWatchlist.find((list) => list?.token_address === token)
        : coinWatchlist.find((list) => list?.id === token);
    });
    if (!watch.includes(undefined)) {
      setWatchlist(watch);
    }
  }, [starredToken, coinWatchlist, dexWatchlist]);

  return (
    <div className="watchlist">
      <div className="watchlist_label">
        <span> WATCHLIST</span>
      </div>
      <div className="watchlist_add">
        <div className="watchlist_add_searchbar">
          <SearchIcon className="address-search-icon" />
          <input
            type="text"
            placeholder="Search for name/symbol"
            className="watch_search"
            onChange={handleChange}
            value={search}
          />
        </div>
        {search && (
          <div className="watchlist_add_content">
            {searchGecko.map((search) => (
              <div
                key={search.id}
                onClick={(e) => {
                  handleAdd(search);
                }}
              >
                {search.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="watchlist_container">
        {!watchlist?.length ? (
          <div className="no_data_to_show">Search to add watchlist</div>
        ) : (
          watchlist?.map((watch, index) => {
            return (
              <div
                className="watchlist_content watch_item"
                key={index}
                onMouseOver={(e) => {
                  setOnHover(watch.symbol);
                }}
                onMouseLeave={(e) => {
                  setOnHover(null);
                }}
              >
                <div className="left">
                  <div className="token_symbol watch_item">{watch.symbol}</div>
                  <div className="token_name watch_item">{watch.name}</div>
                </div>
                <div className="right">
                  <div className="token_price watch_item">
                    {symbol}
                    {getRoundDown(watch.price * conversion)}
                  </div>
                </div>
                <div
                  className="watch_remove_icon"
                  onClick={(e) => handleClose(watch.token_address, watch.id)}
                  style={
                    onHover === watch.symbol
                      ? {
                          display: "flex",
                          border: "var(--border2)",
                          borderRadius: "1rem",
                          backgroundColor: "var(--grey2)",
                          zIndex: "999",
                        }
                      : { display: "none" }
                  }
                >
                  <CloseIcon />
                </div>
                <div className="watchlist_from">{watch.from}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Watchlist;
