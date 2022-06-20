const express = require("express");
const axios = require("axios");
const fetchTransfers = require("./fetchTransfers");
const fetchNativeBalance = require("./fetchNativeBalance");
const fetchErc20Balance = require("./fetchErc20Balance");

const fetchAll = async (req, res) => {
  const responseTransfer = await fetchTransfers(req, res);
  const responseNativeBalance = await fetchNativeBalance(req, res);
  const responseErc20Balance = await fetchErc20Balance(req, res);

  return {
    native_balance: responseNativeBalance.data,
    erc20_balance: responseErc20Balance.data,
    erc20_transfers: responseTransfer.data,
  };
};

module.exports = fetchAll;
