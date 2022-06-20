const express = require("express");
const axios = require("axios");
const { er20BalanceUrl } = require("../config/url");

const fetchErc20Balance = async (req, res) => {
  try {
    let response = await axios({
      url: er20BalanceUrl(req.params.address),
      params: { chain: "bsc", chain_name: "mainnet" },
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.MORALIS_API_KEY,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = fetchErc20Balance;
