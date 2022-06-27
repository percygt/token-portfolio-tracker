import React from "react";
import "./navbar.scss";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import SearchIcon from "@mui/icons-material/Search";
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
    account: walletAddress,
    logout,
  } = useMoralis();
  const [isActive, setIsActive] = useState(false);
  const { currency, setCurrency, address, setAddress } = TopState();
  const options = ["USD", "PHP"];
  useEffect(() => {
    setAddress(walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    if (location.pathname.split("/")[1] === "portfolio" && isAuthenticated) {
      navigate(`portfolio/${walletAddress}/chain/all`);
    } else if (
      location.pathname.split("/")[1] === "portfolio" &&
      !isAuthenticated
    ) {
      navigate("/portfolio/new");
    }
  }, [walletAddress, isAuthenticated]);

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
    if (location.pathname.split("/")[1] === "portfolio") {
      navigate("/portfolio/new");
    }

    await logout();
    console.log("logged out");
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setAddress(e.target.value);
    }
  };

  return (
    <div className="navbar">
      <div className="items">
        <div className="nav-left">
          <div className="address-search">
            <SearchIcon className="address-search-icon" />
            <input
              type="text"
              placeholder="Search Address"
              className="search"
              onKeyPress={handleInput}
            />
          </div>
        </div>
        <div className="nav-right">
          <div className="currency-dropdown">
            {typeof currency !== "string" ||
            typeof setCurrency !== "function" ? (
              []
            ) : (
              <>
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
              </>
            )}
          </div>

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
    </div>
  );
};

export default Navbar;
