const express = require("express");
const axios = require("axios");
// function to get the data from the API
let url =
  "https://deep-index.moralis.io/api/v2/erc20/0x08ba0619b1e7a582e0bce5bbe9843322c954c340/price";
let getFacts = async () => {
  let response = await axios({
    url: url,
    params: { chain: "bsc", chain_name: "mainnet" },
    headers: {
      accept: "application/json",
      "X-API-Key":
        "SJ6XpDg5TJFIEQwvwoK4iAIwwFRMHajDb8Gq3zBiChA4OY7PpDDk89087al82icN",
    },
  });
  return response;
};
//controller function
module.exports = async (req, res) => {
  let responseFact = await getFacts();
  res.send(responseFact.data);
};
