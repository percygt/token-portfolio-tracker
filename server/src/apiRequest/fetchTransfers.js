const express = require("express");
const axios = require("axios");
const { transfersUrl } = require("../config/url");

const fetchTransfers = async (req, res) => {
  try {
    let response = await axios({
      url: transfersUrl(req.params.address),
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

module.exports = fetchTransfers;
