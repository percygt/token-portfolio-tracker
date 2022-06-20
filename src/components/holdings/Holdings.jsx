import "./holdings.scss";
import { useMoralis } from "react-moralis";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { getRoundDown } from "../../helpers/formatters";
import { getWrappedNative } from "../../helpers/networks";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { PortfolioState } from "../../context/PortfolioContext";

const Holdings = ({ contWidth, contHeight }) => {
  const {
    masterData,
    removedToken,
    setRemovedToken,
    asset,
    setAsset,
    nativeAddress,
  } = PortfolioState();
  const { symbol, conversion } = TopState();
  const { starredToken, setStarredToken } = MainState();
  const { account: walletAddress, isAuthenticated } = useMoralis();
  const [onHover, setOnHover] = useState(null);
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState(20);
  const [width, setWidth] = useState(29);

  useEffect(() => {
    setAsset(masterData[0]);
  }, [masterData]);

  useEffect(() => {
    contWidth < 1090 ? setWidth(18) : setWidth(20);
    contHeight < 630 ? setHeight(23) : setHeight(26.5);
    // contHeight >= 400 ? setHeight(20) : setHeight(17);
  }, [contHeight, contWidth]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickStar = (d) => {
    if (starredToken.includes(d)) {
      setStarredToken([...starredToken.filter((val) => val !== d)]);
    } else setStarredToken([...starredToken, d]);
  };

  const handleClickTrash = (d) => {
    setRemovedToken([...removedToken, d]);
  };

  const filteredToken = masterData.filter(
    (data) =>
      data.name.toLowerCase().includes(search.toLowerCase()) ||
      data.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="holdings"
      // style={{ height: `${height}rem `, width: `${width}rem ` }}
    >
      <div className="holdings_label">Holdings</div>
      {/* <form>
        <SearchIcon className="holdings_search_icon" />
        <input
          type="text"
          placeholder="Search"
          className="holdings_search"
          onChange={handleChange}
        />
      </form> */}

      <div className="wallet">
        {isNaN(conversion) ||
        typeof symbol !== "string" ||
        !masterData.length ||
        !walletAddress ||
        !isAuthenticated ? (
          <div className="wallet_content no_data_to_show">No Data to show</div>
        ) : (
          filteredToken.map((data) => {
            return (
              <div
                className="wallet_content"
                key={data.token_address}
                onMouseOver={(e) => {
                  data.token_address === nativeAddress
                    ? setOnHover(null)
                    : setOnHover(data.token_address);
                }}
                onMouseLeave={(e) => {
                  setOnHover(null);
                }}
                onClick={(e) => {
                  setAsset(data);
                }}
                style={
                  asset &&
                  asset.token_address === data.token_address.toLowerCase()
                    ? { backgroundColor: "var(--light)" }
                    : { backgroundColor: "var(--bg2)" }
                }
              >
                <div className="left wallet_content_item">
                  <StarIcon
                    className="wallet_icon"
                    onClick={(e) => handleClickStar(data.token_address)}
                    style={
                      onHover === data.token_address
                        ? data.starred
                          ? {
                              display: "flex",
                              marginRight: "1rem",
                              color: "yellow",
                            }
                          : {
                              display: "flex",
                              marginRight: "1rem",
                            }
                        : { display: "none" }
                    }
                  />
                  <div className="token_symbol_price_name">
                    <div className="token_symbol_price">
                      <div className="token_symbol wallet_item">
                        {data.symbol}
                      </div>
                      <div className="token_price wallet_item">
                        {symbol}
                        {getRoundDown(data.price * conversion)}
                      </div>
                    </div>

                    <div className="token_name wallet_item">{data.name}</div>
                  </div>
                </div>

                <div className="right wallet_content_item">
                  <div className="token_amount_wallet">
                    <div className="token_amount wallet_item">
                      {getRoundDown(data.balance)}
                    </div>
                    <div className="token_value wallet_item">
                      {symbol}
                      {parseFloat(data.value * conversion).toLocaleString()}
                    </div>
                  </div>

                  <DeleteIcon
                    className="wallet_icon"
                    style={
                      onHover === data.token_address
                        ? { display: "flex", marginLeft: "1rem" }
                        : { display: "none" }
                    }
                    onClick={(e) => handleClickTrash(data.token_address)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Holdings;
