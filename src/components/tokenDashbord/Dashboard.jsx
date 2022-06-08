import Chart from "../walletChart/Chart";
import Holdings from "../holdings/Holdings";
import MakeTransaction from "../makeTransaction/MakeTransaction";
import Transaction from "../transaction/Transaction";

export const Dashboard = ({ contWidth, contHeight, contRef, height }) => {
  return (
    <div className="dashboard" ref={contRef}>
      <div className="dashboard_top" style={{ height: `${height}rem ` }}>
        <div className="dashboard_left">
          <Chart contWidth={contWidth} contHeight={contHeight} />
        </div>
        <div className="dashboard_right">
          <Holdings contWidth={contWidth} contHeight={contHeight} />
          <MakeTransaction contWidth={contWidth} contHeight={contHeight} />
        </div>
      </div>
      {/* <div
      className="dashboard_bottom"
      style={{
        height: `calc(100% - ${height + 1}rem)`,
        top: `${height + 1}rem`,
      }}
    >
      <Transaction />
    </div> */}
    </div>
  );
};
