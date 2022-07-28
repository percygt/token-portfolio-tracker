import "./tools.scss";
import UnderConstruction from "../../assets/warning.png";
const Tools = () => {
  return (
    <div className="tools">
      <div className="tools-container">
        <img src={UnderConstruction} alt="" />
        <div className="tools-content">
          <span className="under">Under</span>
          <span className="construction">Construction</span>
        </div>
      </div>
    </div>
  );
};

export default Tools;
