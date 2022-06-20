const express = require("express");
const axios = require("axios");
const { nativeBalanceUrl } = require("../config/url");

const fetchNativeBalance = async (req, res) => {
  try {
    let response = await axios({
      url: nativeBalanceUrl(req.params.address),
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

module.exports = fetchNativeBalance;
