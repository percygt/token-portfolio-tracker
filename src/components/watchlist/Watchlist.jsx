import "./watchlist.scss";
import { useMoralis } from "react-moralis";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { TopState } from "../../context/TopContext";
import { useState, useEffect } from "react";
import { getRoundDown } from "../../helpers/formatters";
import { useDexPrice } from "../../hooks/useDexPrice";
import { useCoingecko } from "../../hooks/useCoingecko";
import { CoinList } from "../../config/api";
import { getWrappedNative, getNativeByChain } from "../../helpers/networks";
const Watchlist = () => {
  const {
    currency,
    symbol,
    conversion,
    starredToken,
    setStarredToken,
    watchCG,
    setWatchCG,
  } = TopState();
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [priceData, setAddresses] = useDexPrice();
  const [onHover, setOnHover] = useState(null);
  const { account: walletAddress, isAuthenticated } = useMoralis();
  const [coins, isLoading] = useCoingecko(CoinList(currency));
  const { chainId } = useMoralis();
  const nativeAddress = getWrappedNative(chainId)?.toLowerCase();
  const nativeSymbol = getNativeByChain(chainId)?.toLowerCase();
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
      setWatchCG([...watchCG.filter((val) => val !== i)]);
    }
  };
  const handleSelect = (c) => {
    setWatchCG([...watchCG, c]);
    setSearch("");
    setIsActive(false);
  };
  useEffect(() => {}, [nativeAddress, starredToken]);
  useEffect(() => {
    const getWatchToken = async () => {
      let tempArray = [];
      if (nativeAddress && !starredToken.includes(nativeAddress)) {
        setStarredToken([...starredToken, nativeAddress]);
      }
      setAddresses(starredToken);
      await priceData?.forEach((data) => {
        let newDataObject = {
          token_address: data.token_address,
          id: null,
          name: data.name,
          price: data.price,
          symbol: data.symbol,
          from: "PancakeSwap",
        };
        tempArray = [...tempArray, newDataObject];
      });
      await coins.forEach((data) => {
        if (watchCG.includes(data.id)) {
          let newDataObject = {
            token_address: null,
            id: data.id,
            name: data.name,
            price: data.current_price,
            symbol: data.symbol.toUpperCase(),
            from: "CoinGecko",
          };
          tempArray = [...tempArray, newDataObject];
        }
      });
      if (tempArray.length && tempArray[0]?.symbol ? true : false)
        setWatchlist(tempArray);
    };
    getWatchToken();
  }, [starredToken, watchCG, coins, nativeAddress, priceData]);

  return (
    <div className="watchlist">
      <div className="watchlist_label">Watchlist</div>
      <div className="watchlist_add">
        <div
          className="watchlist_add_icon"
          onClick={(e) => setIsActive(true)}
          style={isActive ? { display: "none" } : { display: "flex" }}
        >
          <AddIcon />
        </div>
        {isActive && (
          <div className="watchlist_add_searchbar">
            <input
              type="text"
              placeholder="Type the name/symbol"
              className="watch_search"
              onChange={handleChange}
            />
            {search && (
              <div className="watchlist_add_content">
                {searchGecko.map((search) => (
                  <div
                    key={search.id}
                    onClick={(e) => {
                      handleSelect(search.id);
                    }}
                  >
                    {search.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="watchlist_container">
        {!priceData.length || !isAuthenticated ? (
          <div className="watchlist_content no_data_to_show">
            No Data to show
          </div>
        ) : (
          watchlist.map((watch) => {
            return (
              <div
                className="watchlist_content watch_item"
                key={watch.symbol}
                onMouseOver={(e) => {
                  watch.token_address === nativeAddress
                    ? setOnHover(null)
                    : setOnHover(watch.symbol);
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
                    {/* {parseFloat(watch.price).toLocaleString()} */}
                  </div>
                  {/* <div className="token_24h_change">{watch.token_change}</div> */}
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
