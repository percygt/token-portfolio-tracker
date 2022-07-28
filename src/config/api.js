// Morlis API
let moralisUrl = "https://deep-index.moralis.io/api/v2/";

export const NativeBalance = (address) => `${moralisUrl}${address}/balance`;

export const Erc20Balance = (address) => `${moralisUrl}${address}/erc20`;

export const NFTBalance = (address) => `${moralisUrl}${address}/nft`;

export const TokenTransfers = (address) =>
  `${moralisUrl}${address}/erc20/transfers`;

export const NFTTransfers = (address) =>
  `${moralisUrl}${address}/nft/transfers`;
export const Metadata = () => `${moralisUrl}erc20/metadata`;

export const NFTMetadata = (address, id) => `${moralisUrl}nft/${address}/${id}`;

// Coingecko API
let geckoUrl = "https://api.coingecko.com/api/v3/";
export const CoinList = (currency) =>
  `${geckoUrl}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => `${geckoUrl}coins/${id}`;

export const SearchCoin = (id) => `${geckoUrl}search?query=`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${geckoUrl}coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${geckoUrl}coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

//CovalentHQ API
let covalentURL = "https://api.covalenthq.com/v1/";
export const AddressBalance = (address, chainId) =>
  `${covalentURL}${chainId}/address/${address}/balances_v2/`;

//Pancakeswap
let pcsURL = "https://pancakeswap.finance/";
export const SwapToken = (address) => `${pcsURL}swap?outputCurrency=${address}`;
