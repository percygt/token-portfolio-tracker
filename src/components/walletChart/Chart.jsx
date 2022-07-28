import { useState } from "react";
import { Pie, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import "./chart.scss";
import { PortfolioState } from "../../context/PortfolioContext";
import { TopState } from "../../context/TopContext";
import BSC from "../../assets/token-logo/svg/bnb.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DefaultLogo from "../../assets/COGS-1.png";

export default function Chart() {
  const { asset, setAssetHover, assetClick, setAssetClick, tokenData } =
    PortfolioState();
  const { symbol, conversion, contWidth } = TopState();
  const width = contWidth <= 1600 ? 300 : 325;
  const half = width / 2;

  return (
    <div className="balance-chart" style={{ height: `${width}px` }}>
      {isNaN(conversion) || typeof symbol !== "string" || !tokenData.length ? (
        <Skeleton circle width={width} height={width} />
      ) : (
        <main>
          <svg width={width} height={width}>
            <Group top={half} left={half}>
              <Pie
                data={tokenData}
                pieValue={(data) => data.quote}
                outerRadius={half}
                innerRadius={({ data }) => {
                  const size =
                    asset && asset.contract_address == data.contract_address
                      ? 12
                      : 6;
                  return half - size;
                }}
                padAngle={0.005}
              >
                {(pie) => {
                  return pie.arcs.map((arc) => {
                    return (
                      <g
                        style={{ cursor: "pointer" }}
                        key={arc.data.contract_address}
                        onMouseEnter={() => setAssetHover(arc.data)}
                        onMouseLeave={() => setAssetHover(null)}
                        onClick={(e) => {
                          assetClick
                            ? assetClick === arc.data
                              ? setAssetClick(null)
                              : setAssetClick(arc.data)
                            : setAssetClick(arc.data);
                        }}
                      >
                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                      </g>
                    );
                  });
                }}
              </Pie>

              {asset ? (
                <>
                  {/* <Text
                    textAnchor="middle"
                    fill="var(--grey1)"
                    fontSize={17}
                    dy={-40}
                  >
                    {asset.contract_name}
                  </Text> */}
                  <Text textAnchor="middle" fill="#fff" fontSize={25} dy={10}>
                    {`${symbol}${parseFloat(
                      asset.quote * conversion
                    ).toLocaleString()}`}
                  </Text>

                  <Text
                    textAnchor="middle"
                    fill={asset.color}
                    fontSize={15}
                    dy={60}
                  >
                    {`${(
                      parseFloat(asset.balance) /
                      10 ** parseFloat(asset.contract_decimals)
                    ).toLocaleString()} ${asset.contract_ticker_symbol}`}
                  </Text>
                </>
              ) : (
                <>
                  <Text textAnchor="middle" fill="#fff" fontSize={25} dy={10}>
                    {`${symbol}${tokenData
                      .reduce((acc, coin) => acc + coin.quote * conversion, 0)
                      .toLocaleString()}`}
                  </Text>

                  <Text
                    textAnchor="middle"
                    fill="var(--grey2)"
                    fontSize={15}
                    dy={60}
                  >
                    {`${tokenData.length} Assets`}
                  </Text>
                </>
              )}
            </Group>
          </svg>
        </main>
      )}
      {asset ? (
        <div className="chart-token-name">
          <img
            src={asset.logo_url}
            // style={{ width: "1.2rem", height: "1.2rem" }}
            onError={(event) => (event.target.src = DefaultLogo)}
          />
          <div className="contract-name">{asset.contract_name}</div>
        </div>
      ) : (
        <div className="chain-name">
          <img src={BSC} alt="binance-smart-chain-logo" />
        </div>
      )}
    </div>
  );
}
