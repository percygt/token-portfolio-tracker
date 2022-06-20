const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    wallet_address: String,
    chain_id: String,
    native_balance: {
      type: Array,
      default: [],
    },
    erc20_balance: {
      type: Array,
      default: [],
    },
    erc20_transfers: {
      type: Array,
      default: [],
    },
  },
  { collection: "userdata" }
);

module.exports = mongoose.model("User", userSchema);
