import "./wallet.scss";
import { NavLink, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { TopState } from "../../context/TopContext";
import { PortfolioState } from "../../context/PortfolioContext";
const Wallet = () => {
  const { address } = TopState();
  const { chain } = useParams();
  const { setSearch, search } = PortfolioState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="wallet-bar-top">
      <div className="wallet-link">
        <NavLink
          to={`/portfolio/${address}/${chain}/token`}
          className="link"
          activeclassname="active"
        >
          <span>TOKEN</span>
        </NavLink>
        <NavLink
          to={`/portfolio/${address}/${chain}/nft`}
          className="link"
          activeclassname="active"
        >
          <span>NFT</span>
        </NavLink>
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
  );
};

export default Wallet;
