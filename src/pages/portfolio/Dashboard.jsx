import Chart from "../../components/walletChart/Chart";
import Holdings from "../../components/holdings/Holdings";
import MakeTransaction from "../../components/makeTransaction/MakeTransaction";
import Transaction from "../../components/transaction/Transaction";

export const Dashboard = ({ contWidth, contHeight, contRef, height }) => {
  return (
    <div className="dashboard" ref={contRef}>
      <div className="dashboard_top">
        <div className="dashboard_left">
          <Chart contWidth={contWidth} contHeight={contHeight} />
        </div>
        <div className="dashboard_right">
          <Holdings contWidth={contWidth} contHeight={contHeight} />
          <MakeTransaction contWidth={contWidth} contHeight={contHeight} />
        </div>
      </div>
      <div className="dashboard_bottom">
        <Transaction />
      </div>
    </div>
  );
};
