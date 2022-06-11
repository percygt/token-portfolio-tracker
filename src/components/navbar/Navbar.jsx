import React from "react";
import "./navbar.scss";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useMoralis } from "react-moralis";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { TopState } from "../../context/TopContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account: walletAddress,
    logout,
  } = useMoralis();
  const [isActive, setIsActive] = useState(false);
  const { currency, setCurrency } = TopState();
  const options = ["USD", "PHP"];
  console.log(location.pathname.split("/")[1]);
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
  useEffect(() => {
    if (location.pathname.split("/")[1] === "portfolio" && isAuthenticated) {
      navigate(`portfolio/${walletAddress}`);
    } else if (
      location.pathname.split("/")[1] === "portfolio" &&
      !isAuthenticated
    ) {
      navigate("/portfolio/new");
    }
  }, [walletAddress, isAuthenticated]);

  const logOut = async () => {
    if (location.pathname.split("/")[1] === "portfolio") {
      navigate("/portfolio/new");
    }

    await logout();
    console.log("logged out");
  };
  return (
    <div className="navbar">
      <div className="items">
        {typeof currency !== "string" || typeof setCurrency !== "function" ? (
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

        {!isAuthenticated ? (
          <div className="btn-drk connect_btn" onClick={login}>
            Connect Wallet
          </div>
        ) : (
          <div
            className="btn connect_btn"
            onClick={logOut}
            disabled={isAuthenticating}
          >
            Connected
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
