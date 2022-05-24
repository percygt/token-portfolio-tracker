import React from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { useMoralis } from "react-moralis";

const Navbar = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

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
          {!isAuthenticated ? (
            <div className="item">
              <div className="btn connect_btn" onClick={login}>
                Connect Wallet
              </div>
            </div>
          ) : (
            <div className="item">
              <div
                className="btn btn-variant connect_btn"
                onClick={logOut}
                disabled={isAuthenticating}
              >
                Connected
                <CircleRoundedIcon
                  style={{
                    color: "lightGreen",
                    border: "2px solid var(--transb)",
                    borderRadius: "1rem",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
