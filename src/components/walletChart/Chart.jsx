import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import "./chart.scss";
import { CryptoState } from "../../CryptoContext";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
const coins = [
  { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
  { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
  { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
];

export default function Chart({ contWidth }) {
  const { masterData, symbol, conversion, data: nativeData } = CryptoState();
  const { account: walletAddress, isAuthenticated } = useMoralis();

  const [active, setActive] = useState(null);
  const [width, setWidth] = useState(350);
  const half = width / 2;
  useEffect(() => {
    contWidth >= 1300 ? setWidth(400) : setWidth(350);
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
                  const size = active && active.symbol == data.symbol ? 95 : 93;
                  return half - size;
                }}
                padAngle={0.005}
              >
                {(pie) => {
                  return pie.arcs.map((arc) => {
                    return (
                      <g
                        key={arc.data.token_address}
                        onMouseEnter={() => setActive(arc.data)}
                        onMouseLeave={() => setActive(null)}
                      >
                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                      </g>
                    );
                  });
                }}
              </Pie>
              <Text
                textAnchor="middle"
                fill="var(--grey1)"
                fontSize={17}
                dy={-50}
              >
                Balance
              </Text>
              {active ? (
                <>
                  <Text textAnchor="middle" fill="#fff" fontSize={25} dy={0}>
                    {`${symbol}${parseFloat(
                      active.value * conversion
                    ).toLocaleString()}`}
                  </Text>

                  <Text
                    textAnchor="middle"
                    fill={active.color}
                    fontSize={15}
                    dy={40}
                  >
                    {`${parseFloat(active.balance).toLocaleString()} ${
                      active.symbol
                    }`}
                  </Text>
                </>
              ) : (
                <>
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
