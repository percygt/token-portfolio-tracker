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

import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import DefaultLogo from "../../assets/default-token.png";
import { getWrappedNative, getNativeByChain } from "../../helpers/networks";

const IsNative = (address) =>
  address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

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
  console.log(currentItems);
  const { symbol, conversion, chain } = TopState();
  const { starredToken, setStarredToken } = MainState();
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
      <div className="wallet-top">
        <div className="wallet_label">
          <DataThresholdingIcon className="holdings-icon" />
          Holdings
        </div>
        <div className="search">
          <SearchIcon className="search_icon" />
          <input
            type="text"
            placeholder="Search Token"
            className="holdings_search"
            onChange={handleChange}
          />
        </div>
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
        !currentItems.length ? (
          <tbody className="wallet_content no_data_to_show">
            <tr>
              <td> No Data to show</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems.map((data) => {
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
                        onClick={(e) => handleClickStar(data.token_address)}
                        className="holdings-icon"
                        style={
                          data.starred
                            ? {
                                display: "flex",
                                color: "yellow",
                              }
                            : {
                                display: "flex",
                              }
                        }
                      />
                    ) : (
                      data.id
                    )}
                  </td>
                  <td>
                    {!data.logo ? (
                      <img
                        src={DefaultLogo}
                        alt="coin-logo"
                        style={{ width: "1rem" }}
                      />
                    ) : (
                      <img src={data.logo} alt="" style={{ width: "1.2rem" }} />
                    )}
                  </td>
                  <td>
                    {IsNative(data.token_address)
                      ? getNativeByChain(chain)
                      : getEllipsisTxtRight(data.symbol, 10)}
                  </td>
                  <td>
                    {IsNative(data.token_address)
                      ? getNativeByChain(chain)
                      : getEllipsisTxtRight(data.name, 17)}
                  </td>
                  <td>
                    {IsNative(data.token_address)
                      ? getEllipsisTxt(getWrappedNative(chain), 5)
                      : getEllipsisTxt(data.token_address, 5)}
                  </td>
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
