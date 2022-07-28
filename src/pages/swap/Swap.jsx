import "./swap.scss";
import UnderConstruction from "../../assets/warning.png";
const Swap = () => {
  return (
    <div className="swap">
      <div className="swap-container">
        <img src={UnderConstruction} alt="" />
        <div className="swap-content">
          <span className="under">Under</span>
          <span className="construction">Construction</span>
        </div>
      </div>
    </div>
  );
};

export default Swap;
