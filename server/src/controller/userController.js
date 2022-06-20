const express = require("express");
const User = require("../model/User");
const fetchAll = require("../apiRequest/fetchAll");
const fetchTransfers = require("../apiRequest/fetchTransfers");
const fetchNativeBalance = require("../apiRequest/fetchNativeBalance");
const fetchErc20Balance = require("../apiRequest/fetchErc20Balance");

const createUser = async (req, res) => {
  const responseData = await fetchAll(req, res);
  const allData = {
    wallet_address: req.params.address,
    chain_id: req.query.chain,
    native_balance: responseData.native_balance,
    erc20_balance: responseData.erc20_balance,
    erc20_transfers: responseData.erc20_transfers,
  };
  const result = await User.create(allData);
  return result;
};

const getUserData = async (req, res, prop) => {
  if (!req?.params?.address && !req?.query?.chain)
    return res.status(400).json({ message: "Address and ChainID required" });
  const user = await User.findOne({
    wallet_address: req.params.address,
    chain_id: req.query.chain,
  }).exec();
  let jsonRes = {
    status: "success",
    code: 200,
    updated_at: new Date(),
  };
  if (!user) {
    try {
      createUser(req, res);
      if (prop === "native_balance") {
        const responseNativeBalance = await fetchNativeBalance(req, res);
        jsonRes.data = responseNativeBalance.data;
        res.json(jsonRes);
      } else if (prop === "erc20_balance") {
        const responseErc20Balance = await fetchErc20Balance(req, res);
        jsonRes.data = responseErc20Balance.data;
        res.json(jsonRes);
      } else if (prop === "erc20_transfers") {
        const responseTransfer = await fetchTransfers(req, res);
        jsonRes.data = responseTransfer.data;
        res.json(jsonRes);
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        code: 500,
        message: err.message,
      });
    }
  } else {
    if (prop === "native_balance") {
      jsonRes.data = user.native_balance;
      res.json(jsonRes);
    } else if (prop === "erc20_balance") {
      jsonRes.data = user.erc20_balance;
      res.json(jsonRes);
    } else if (prop === "erc20_transfers") {
      jsonRes.data = user.erc20_transfers;
      res.json(jsonRes);
    }
  }
};

const nativeBalanceController = async (req, res) => {
  getUserData(req, res, (prop = "native_balance"));
};
const erc20BalanceController = async (req, res) => {
  getUserData(req, res, (prop = "erc20_balance"));
};
const transfersController = async (req, res) => {
  getUserData(req, res, (prop = "erc20_transfers"));
};

module.exports = {
  nativeBalanceController,
  erc20BalanceController,
  transfersController,
};
