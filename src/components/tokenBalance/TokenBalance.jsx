import "./tokenBalance.scss";
import { TopState } from "../../context/TopContext";
import { MainState } from "../../context/MainContent";
import { PortfolioState } from "../../context/PortfolioContext";
import {
  getRoundDown,
  getEllipsisTxtTwo,
  getEllipsisTxtRight,
} from "../../helpers/formatters";
import PaginationToken from "../pagination/PaginationToken";
import StarIcon from "@mui/icons-material/Star";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DefaultLogo from "../../assets/COGS-1.png";
import { getWrappedNative, getNativeByChain } from "../../helpers/networks";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IsNative = (address) =>
  address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const Balance = () => {
  const {
    asset,
    tokenCurrentItems,
    setSearch,
    assetHover,
    setAssetHover,
    assetClick,
    setAssetClick,
    setOpenModal,
  } = PortfolioState();
  const { symbol, conversion, chain, contWidth, address } = TopState();
  const { starredToken, setStarredToken } = MainState();
  const consNameSize = contWidth <= 1600 ? 10 : 20;

  const handleClickStar = (d) => {
    if (starredToken.includes(d)) {
      setStarredToken([...starredToken.filter((val) => val !== d)]);
    } else setStarredToken([...starredToken, d]);
  };
  const handleClickTrash = (d) => {
    setOpenModal(["removeToken", true, d]);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    setAssetHover(null);
    setAssetClick(null);
  }, [address]);
  return (
    <div className="token-wallet">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <span className="holdings-star"></span>
            <span></span>
            <span>SYMBOL</span>
            <span>TOKEN</span>
            <span>CONTRACT</span>
            <span>PRICE</span>
            <span>BALANCE</span>
            <span>VALUE</span>
            <span className="holdings-delete"></span>
          </div>
        </div>
        {!tokenCurrentItems.length ? (
          <div className="tbody">
            <Skeleton count={10} />
          </div>
        ) : (
          <div className="tbody">
            {tokenCurrentItems.map((data) => {
              return (
                <div
                  style={
                    asset?.contract_address === data.contract_address
                      ? {
                          backgroundColor: "var(--light)",
                          color: "var(--grey1)",
                          boxShadow: "var(--shadow)",
                        }
                      : {}
                  }
                  className="tr"
                  key={data.contract_address}
                  onMouseOver={(e) => {
                    setAssetHover(data);
                  }}
                  onMouseLeave={(e) => {
                    setAssetHover(null);
                  }}
                  onClick={(e) => {
                    assetClick
                      ? assetClick === data
                        ? setAssetClick(null)
                        : setAssetClick(data)
                      : setAssetClick(data);
                  }}
                >
                  <span className="holdings-star">
                    {assetHover === data || asset === data ? (
                      <StarIcon
                        onClick={(e) => handleClickStar(data.contract_address)}
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
                  </span>
                  <span>
                    <img
                      src={data.logo_url}
                      style={{ width: "1.2rem", borderRadius: "0.6rem" }}
                      onError={(event) => (event.target.src = DefaultLogo)}
                    />
                  </span>
                  <span>
                    {IsNative(data.contract_address)
                      ? getNativeByChain(chain)
                      : getEllipsisTxtRight(data.contract_ticker_symbol)}
                  </span>
                  <span>
                    {IsNative(data.contract_address)
                      ? getNativeByChain(chain)
                      : getEllipsisTxtRight(data.contract_name, consNameSize)}
                  </span>
                  <span>
                    {IsNative(data.contract_address)
                      ? getEllipsisTxtTwo(getWrappedNative(chain), 5)
                      : getEllipsisTxtTwo(data.contract_address, 5)}
                  </span>
                  <span>
                    {symbol}
                    {data.quote_rate
                      ? getRoundDown(data.quote_rate * conversion)
                      : 0}
                  </span>
                  <span>
                    {getRoundDown(
                      parseFloat(data.balance) /
                        10 ** parseFloat(data.contract_decimals)
                    )}
                  </span>
                  <span>
                    {symbol}
                    {getRoundDown(data.quote * conversion)}
                  </span>
                  <span className="holdings-delete">
                    <DangerousIcon
                      className="holdings-icon"
                      style={
                        assetHover === data || asset === data
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      onClick={(e) => handleClickTrash(data.contract_address)}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <PaginationToken contWidth={contWidth} />
    </div>
  );
};

export default Balance;
