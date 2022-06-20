// Morlis API
let moralisUrl = "https://deep-index.moralis.io/api/v2/";

export const NativeBalance = (address) => `${moralisUrl}${address}/balance`;

export const Erc20Balance = (address) => `${moralisUrl}${address}/erc20`;

export const Transfers = (address) => `${moralisUrl}${address}/erc20/transfers`;

export const Metadata = () => `${moralisUrl}/erc20/metadata`;

// Coingecko API
let geckoUrl = "https://api.coingecko.com/api/v3/coins/";
export const CoinList = (currency) =>
  `${geckoUrl}markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => `${geckoUrl}${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${geckoUrl}${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${geckoUrl}markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
