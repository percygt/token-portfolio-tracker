import "./new.scss";
import NewUser from "../../assets/no_data_search.png";

const New = () => {
  return (
    <div className="new">
      <img src={NewUser} alt="" />
      <span>Input your address to get data!</span>
    </div>
  );
};

export default New;
