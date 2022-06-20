let url = "https://deep-index.moralis.io/api/v2/";
let nativeBalanceUrl = (address) => `${url}${address}/balance`;
let er20BalanceUrl = (address) => `${url}${address}/erc20`;
let transfersUrl = (address) => `${url}${address}/erc20/transfers`;
module.exports = { nativeBalanceUrl, er20BalanceUrl, transfersUrl };
