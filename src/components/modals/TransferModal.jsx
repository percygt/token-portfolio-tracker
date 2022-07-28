import "./transferModal.scss";
import { useState, useEffect } from "react";
import { PortfolioState } from "../../context/PortfolioContext";
import { TopState } from "../../context/TopContext";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import { getEllipsisTxt } from "../../helpers/formatters";
import "react-toastify/dist/ReactToastify.css";
import { FaDonate } from "react-icons/fa";
const TransferModal = ({ close }) => {
  const { asset } = PortfolioState();
  const { conversion, symbol, setSearchAddress } = TopState();
  const {
    Moralis,
    account: walletAddress,
    isAuthenticated,
    authenticate,
  } = useMoralis();
  const [tx, setTx] = useState({});
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [receiver, setReceiver] = useState("");

  const login = async () => {
    close();
    setSearchAddress(null);
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "I am signing in" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const notify = (hash) =>
    toast(`🔊 New Receipt: ${hash}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className: "toast-transfer",
      bodyClassName: "toast-transfer-body",
    });
  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);
  const transfer = async (e) => {
    e.preventDefault();
    const { amount, receiver, asset } = tx;
    let options = {};

    switch (asset.contract_address) {
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
          amount: Moralis.Units.Token(amount, asset.contract_decimals),
          receiver,
          contractAddress: asset.contract_address,
          awaitReceipt: false,
        };
    }

    setIsPending(true);

    const txStatus = await Moralis.transfer(options);
    const result = await txStatus.wait();
    if (result) {
      console.log(`🔊 New Receipt: ${result.blockHash}`);
      notify(getEllipsisTxt(result.blockHash, 10));
      setIsPending(false);
    }
    console.log(txStatus);
    console.log(result);
  };

  return (
    <div className="transfer-container">
      <div className="transfer-label">TRANSFER TOKEN</div>
      <div className="token-data">
        <div className="asset-name">{asset && asset.contract_name}</div>
        <div className="balance-container">
          {`Balance: ${
            asset &&
            (
              parseFloat(asset.balance) /
              10 ** parseFloat(asset.contract_decimals)
            ).toLocaleString()
          } ${asset && asset.contract_ticker_symbol}`}
        </div>
        <div className="price_in_USD">
          {`Quote Rate: ${symbol}${
            asset && parseFloat(asset.quote_rate * conversion).toLocaleString()
          }`}
        </div>
      </div>
      {walletAddress && isAuthenticated ? (
        <form className="transfer-form">
          <input
            id="token_address"
            type="text"
            placeholder="Public Address(0x)"
            required
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          {/* <label>Amount:</label> */}
          <input
            id="amount"
            type="text"
            placeholder={`Amount in ${asset && asset.contract_ticker_symbol}`}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="primary"
            className="send-btn"
            disabled={!tx}
            onClick={transfer}
            loading={isPending.toString()}
          >
            Send
          </button>
        </form>
      ) : (
        <div className="transfer-form">
          <button className="btn-drk connect_btn" onClick={login}>
            <span>Connect your wallet to send</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferModal;
