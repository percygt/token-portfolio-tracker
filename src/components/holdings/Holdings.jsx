import "./holdings.scss";
import NativeBalance from "../NativeBalance";
import FetchBalance from "./FetchBalace";

const Holdings = () => {
  return (
    <div className="holdings">
      <div className="holdings_label">Holdings</div>
      <div className="wallet">{/* <FetchBalance /> */}</div>
    </div>
  );
};

export default Holdings;
