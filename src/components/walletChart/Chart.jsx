import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import "./chart.scss";
import { PortfolioState } from "../../context/PortfolioContext";
import { TopState } from "../../context/TopContext";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Chart({ contWidth }) {
  const { masterData, asset, setAsset } = PortfolioState();
  const { symbol, conversion } = TopState();
  const { account: walletAddress, isAuthenticated } = useMoralis();
  // const [asset, setAsset] = useState(null);
  const [width, setWidth] = useState(350);
  const half = width / 2;
  useEffect(() => {
    contWidth >= 1300 ? setWidth(350) : setWidth(300);
  }, [contWidth]);

  return (
    <div className="balance" style={{ height: `${width}px` }}>
      {isNaN(conversion) ||
      typeof symbol !== "string" ||
      !masterData.length ||
      !walletAddress ||
      !isAuthenticated ? (
        "No data to show"
      ) : (
        <main>
          <svg width={width} height={width}>
            <Group top={half} left={half}>
              <Pie
                data={masterData}
                pieValue={(data) => data.value}
                outerRadius={half}
                innerRadius={({ data }) => {
                  const size = asset && asset.symbol == data.symbol ? 10 : 6;
                  return half - size;
                }}
                padAngle={0.005}
              >
                {(pie) => {
                  return pie.arcs.map((arc) => {
                    return (
                      <g
                        key={arc.data.token_address}
                        onMouseEnter={() => setAsset(arc.data)}
                        onMouseLeave={() => setAsset(null)}
                      >
                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                      </g>
                    );
                  });
                }}
              </Pie>

              {asset ? (
                <>
                  <Text
                    textAnchor="middle"
                    fill="var(--grey1)"
                    fontSize={17}
                    dy={-50}
                  >
                    {asset.name}
                  </Text>
                  <Text textAnchor="middle" fill="#fff" fontSize={25} dy={0}>
                    {`${symbol}${parseFloat(
                      asset.value * conversion
                    ).toLocaleString()}`}
                  </Text>

                  <Text
                    textAnchor="middle"
                    fill={asset.color}
                    fontSize={15}
                    dy={40}
                  >
                    {`${parseFloat(asset.balance).toLocaleString()} ${
                      asset.symbol
                    }`}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    textAnchor="middle"
                    fill="var(--grey1)"
                    fontSize={17}
                    dy={-50}
                  >
                    BSC
                  </Text>
                  <Text textAnchor="middle" fill="#fff" fontSize={25} dy={0}>
                    {`${symbol}${masterData
                      .reduce((acc, coin) => acc + coin.value * conversion, 0)
                      .toLocaleString()}`}
                  </Text>

                  <Text
                    textAnchor="middle"
                    fill="var(--grey2)"
                    fontSize={15}
                    dy={40}
                  >
                    {`${masterData.length} Assets`}
                  </Text>
                </>
              )}
            </Group>
          </svg>
        </main>
      )}
    </div>
  );
}
