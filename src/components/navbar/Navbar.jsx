import React from "react";
import "./navbar.scss";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useMoralis } from "react-moralis";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";

const Navbar = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();
  const [isActive, setIsActive] = useState(false);
  const { currency, setCurrency } = CryptoState();
  const options = ["USD", "PHP"];

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "hey percy" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  return (
    <div>
      <div className="navbar">
        <div className="items">
          <div className="item">
            {typeof currency !== "string" ||
            typeof setCurrency !== "function" ? (
              []
            ) : (
              <div className="currency-dropdown">
                <div
                  className="currency-dropdown-button"
                  onClick={(e) => setIsActive(!isActive)}
                >
                  {currency}
                  <MdOutlineArrowDropDown />
                </div>
                {isActive && (
                  <div className="currency-dropdown-content">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="currency-dropdown-item"
                        onClick={(e) => {
                          setCurrency(option);
                          setIsActive(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {!isAuthenticated ? (
            <div className="item">
              <div className="btn connect_btn" onClick={login}>
                Connect Wallet
              </div>
            </div>
          ) : (
            <div className="item">
              <div
                className="btn-drk connect_btn"
                onClick={logOut}
                disabled={isAuthenticating}
              >
                Connected
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
