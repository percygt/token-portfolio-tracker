import "./makeTransaction.scss";
import { useState, useEffect } from "react";
import { CryptoState } from "../../CryptoContext";
import { useMoralis } from "react-moralis";

const MakeTransaction = ({ contWidth, contHeight }) => {
  const { asset, nativeAddress, conversion, symbol } = CryptoState();
  const [height, setHeight] = useState(20);
  const { Moralis } = useMoralis();
  const [width, setWidth] = useState(29);
  const [tx, setTx] = useState({});
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);

  useEffect(() => {
    contWidth < 1090 ? setWidth(18) : setWidth(20);
    contHeight < 630 ? setHeight(23) : setHeight(26.5);
  }, [contHeight, contWidth]);
  const handleSubmit = (event) => {
    event.preventDefault();
    async function transfer() {
      const { amount, receiver, asset } = tx;
      let options = {};

      switch (asset.token_address) {
        case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
          options = {
            native: "native",
            amount: Moralis.Units.ETH(amount),
            receiver,
            awaitReceipt: false,
          };
          break;
        default:
          options = {
            type: "erc20",
            amount: Moralis.Units.Token(amount, asset.decimals),
            receiver,
            contractAddress: asset.token_address,
            awaitReceipt: false,
          };
      }

      setIsPending(true);
      const txStatus = await Moralis.transfer(options);
      console.log(txStatus);
      txStatus
        .on("transactionHash", (hash) => {
          console.log("🔊 New Transaction", hash);
        })
        .on("receipt", (receipt) => {
          console.log("🔊 New Receipt: ", receipt);
          setIsPending(false);
        })
        .on("error", (error) => {
          console.error(error);
          setIsPending(false);
        });
    }
    transfer();
  };

  return (
    <div
      className="transfer"
      style={{ height: `${height}rem `, width: `${width}rem ` }}
    >
      <div className="transfer_label">Transfer</div>
      <div className="token_data">
        <div className="asset">{asset && asset.symbol}</div>
        <div className="balance">
          {`Balance: ${asset && parseFloat(asset.balance).toLocaleString()}`}
        </div>
        <div className="price_in_USD">
          {`Current Price: ${symbol} ${
            asset && parseFloat(asset.price * conversion).toLocaleString()
          }`}
        </div>
      </div>

      <form className="tranfer_form" onSubmit={handleSubmit}>
        <label>Address:</label>
        <input
          id="token_address"
          type="text"
          placeholder="Public Address(0x)"
          required
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <label>Amount:</label>
        <input
          id="amount"
          type="text"
          placeholder={`0 ${asset && asset.symbol}`}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" className="btn-drk trans-btn">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default MakeTransaction;
