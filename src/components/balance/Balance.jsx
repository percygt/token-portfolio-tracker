import React, { useState, useEffect } from "react";
import "./balance.scss";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { PortfolioState } from "../../context/PortfolioContext";
import {
  getRoundDown,
  getEllipsisTxt,
  getEllipsisTxtRight,
} from "../../helpers/formatters";
import { useMoralis } from "react-moralis";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DefaultLogo from "../../assets/default-token.png";

const Balance = () => {
  const {
    removedToken,
    setRemovedToken,
    asset,
    setAsset,
    nativeAddress,
    currentItems,
    setSearch,
  } = PortfolioState();
  const { symbol, conversion } = TopState();
  const { starredToken, setStarredToken } = MainState();
  const { account: walletAddress, isAuthenticated } = useMoralis();
  const [onHover, setOnHover] = useState(null);

  const handleClickStar = (d) => {
    if (starredToken.includes(d)) {
      setStarredToken([...starredToken.filter((val) => val !== d)]);
    } else setStarredToken([...starredToken, d]);
  };

  const handleClickTrash = (d) => {
    setRemovedToken([...removedToken, d]);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleHover = () => {
    return <StarIcon />;
  };
  return (
    <div className="wallet">
      <div className="search">
        <SearchIcon className="search_icon" />
        <input
          type="text"
          placeholder="Search Token"
          className="holdings_search"
          onChange={handleChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="holdings-star"></th>
            <th></th>
            <th>Symbol</th>
            <th>Token</th>
            <th>Contract</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Value</th>
            <th className="holdings-delete"></th>
          </tr>
        </thead>
        {isNaN(conversion) ||
        typeof symbol !== "string" ||
        !currentItems ||
        !currentItems.length ||
        !isAuthenticated ? (
          <tbody className="wallet_content no_data_to_show">
            <tr>
              <td> No Data to show</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems.map((data, index) => {
              return (
                <tr
                  className={
                    asset?.token_address === data.token_address
                      ? "token-active"
                      : "token-inactive"
                  }
                  key={data.token_address}
                  onMouseEnter={(e) => {
                    data.token_address === nativeAddress
                      ? setOnHover(null)
                      : setOnHover(data.token_address);
                  }}
                  onMouseLeave={(e) => {
                    setOnHover(null);
                  }}
                  onClick={(e) => {
                    asset && asset?.token_address === data.token_address
                      ? setAsset(null)
                      : setAsset(data);
                  }}
                >
                  <td className="holdings-star">
                    {onHover === data.token_address ? (
                      <StarIcon
                        style={
                          data.starred
                            ? {
                                display: "block",
                                color: "yellow",
                              }
                            : {
                                display: "block",
                              }
                        }
                      />
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td>
                    {data.logo === null ? (
                      <img
                        src={DefaultLogo}
                        alt="coin-logo"
                        style={{ width: "1rem" }}
                      />
                    ) : (
                      <img src={data.logo} alt="" style={{ width: "1.2rem" }} />
                    )}
                  </td>
                  <td>{getEllipsisTxtRight(data.symbol, 10)}</td>
                  <td>{getEllipsisTxtRight(data.name, 17)}</td>
                  <td>{getEllipsisTxt(data.token_address, 5)}</td>
                  <td>
                    {symbol}
                    {getRoundDown(data.price)}
                  </td>
                  <td>{getRoundDown(data.balance)}</td>
                  <td>
                    {symbol}
                    {getRoundDown(data.value)}
                  </td>
                  <td className="holdings-delete">
                    <DeleteIcon
                      className="holdings-icon"
                      style={
                        onHover === data.token_address
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      onClick={(e) => handleClickTrash(data.token_address)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Balance;
