import React, { useState, useEffect } from "react";
import "./balance.scss";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { PortfolioState } from "../../context/PortfolioContext";
import { getRoundDown, getEllipsisTxt } from "../../helpers/formatters";
import { useMoralis } from "react-moralis";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import DefaultLogo from "../../assets/default-token.png";

const Balance = () => {
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
  console.log(asset);
  const handleClickStar = (d) => {
    if (starredToken.includes(d)) {
      setStarredToken([...starredToken.filter((val) => val !== d)]);
    } else setStarredToken([...starredToken, d]);
  };

  const handleClickTrash = (d) => {
    setRemovedToken([...removedToken, d]);
  };

  return (
    <div className="wallet">
      <table>
        <thead>
          <tr>
            <th className="holdings-star"></th>
            <th></th>
            <th>Token</th>
            <th>Symbol</th>
            <th>Contract</th>
            <th>Price</th>
            <th>Balance</th>
            <th>Value</th>
            <th className="holdings-delete"></th>
          </tr>
        </thead>
        {isNaN(conversion) ||
        typeof symbol !== "string" ||
        !masterData.length ||
        !walletAddress ||
        !isAuthenticated ? (
          <tbody className="wallet_content no_data_to_show">
            No Data to show
          </tbody>
        ) : (
          <tbody>
            {masterData.map((data) => {
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
                    <StarIcon
                      className="holdings-icon"
                      onClick={(e) => handleClickStar(data.token_address)}
                      style={
                        onHover === data.token_address
                          ? data.starred
                            ? {
                                display: "block",
                                color: "yellow",
                              }
                            : {
                                display: "block",
                              }
                          : { display: "none" }
                      }
                    />
                  </td>
                  <td>
                    {data.logo === null ? (
                      <img
                        src={DefaultLogo}
                        alt=""
                        style={{ width: "1.2rem" }}
                      />
                    ) : (
                      <img src={data.logo} alt="" style={{ width: "1.2rem" }} />
                    )}
                  </td>
                  <td>{data.name}</td>
                  <td>{data.symbol}</td>
                  <td>{getEllipsisTxt(data.token_address, 4)}</td>
                  <td>
                    {symbol}
                    {getRoundDown(data.price)}
                  </td>
                  <td>{getRoundDown(data.balance)}</td>
                  <td>
                    {" "}
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
