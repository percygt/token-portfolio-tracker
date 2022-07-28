import "./nftBalance.scss";
import { TopState } from "../../context/TopContext";
import { PortfolioState } from "../../context/PortfolioContext";
import { getEllipsisTxt, getEllipsisTxtTwo } from "../../helpers/formatters";
import PaginationNFT from "../pagination/PaginationNFT";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NFTBalance = () => {
  const {
    setNFTHover,
    nftClick,
    setNFTClick,
    nft,
    nftCurrentItems,
    nftLoading,
  } = PortfolioState();
  const { contWidth, address } = TopState();
  useEffect(() => {
    setNFTClick(null);
    setNFTHover(null);
  }, [address]);

  return (
    <div className="nft-wallet">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <span>NFT</span>
            <span>SYMBOL</span>
            <span>HASH</span>
            <span>CONTRACT</span>
          </div>
        </div>
        {!nftCurrentItems || !nftCurrentItems.length ? (
          nftLoading ? (
            <div className="tbody">
              <Skeleton count={10} />
            </div>
          ) : (
            <div className="tbody">No Displayable NFT's found</div>
          )
        ) : (
          <div className="tbody">
            {nftCurrentItems.map((data) => {
              return (
                <div
                  style={
                    nft?.token_hash === data?.token_hash
                      ? {
                          backgroundColor: "var(--light)",
                          color: "var(--grey1)",
                          boxShadow: "var(--shadow)",
                        }
                      : {}
                  }
                  className="tr"
                  key={data.token_hash}
                  onMouseOver={(e) => {
                    setNFTHover(data);
                  }}
                  onMouseLeave={(e) => {
                    setNFTHover(null);
                  }}
                  onClick={(e) => {
                    nftClick
                      ? nftClick === data
                        ? setNFTClick(null)
                        : setNFTClick(data)
                      : setNFTClick(data);
                  }}
                >
                  <span>{`${data?.name} #${data?.token_id}`}</span>
                  <span>{data.symbol}</span>
                  <span>{getEllipsisTxt(data.token_hash, 6)}</span>
                  <span>{getEllipsisTxtTwo(data.token_address, 5)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <PaginationNFT contWidth={contWidth} />
    </div>
  );
};

export default NFTBalance;
