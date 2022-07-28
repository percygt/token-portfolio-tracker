import "./nftDisplay.scss";
import { TopState } from "../../context/TopContext";
import { PortfolioState } from "../../context/PortfolioContext";
import NFT from "../../assets/nft2.png";
import { getEllipsisTxtRight } from "../../helpers/formatters";
const NFTDisplay = () => {
  const { nft } = PortfolioState();
  const { contWidth } = TopState();
  const imageHt = contWidth <= 1600 ? 13 : 15;
  return (
    <div className="nft-display">
      <div className="nft-header">
        {nft ? (
          <span className="nft-name-id">
            {nft?.name} #{nft?.token_id}
          </span>
        ) : (
          ``
        )}
      </div>
      <div className="nft-image" style={{ height: `${imageHt}rem` }}>
        {nft ? (
          <img src={nft?.image} alt="" style={{ height: `${imageHt}rem` }} />
        ) : (
          <img src={NFT} alt="" style={{ height: `${imageHt}rem` }} />
        )}
      </div>
      <div className="nft-body">
        {nft ? (
          <span className="nft-description">
            {getEllipsisTxtRight(nft?.description, 110)}
          </span>
        ) : (
          ``
        )}
      </div>
    </div>
  );
};

export default NFTDisplay;
