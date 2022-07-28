import React from "react";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
// import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import "./help.scss";
const Help = () => {
  return (
    <div className="help">
      <div className="support">
        <a
          href="https://t.me/prcy_COGS"
          target="_blank"
          rel="noreferrer"
          className="support-link"
        >
          <LiveHelpOutlinedIcon />
          <span>Support</span>
        </a>
      </div>
      <div className="social-links">
        <a
          href="https://t.me/cogsplatform"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TelegramIcon className="social-icon" />
        </a>
        <a
          href="https://twitter.com/CogsPlatform"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon className="social-icon" />
        </a>
        <a
          href="https://www.facebook.com/cogsplatform/"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon className="social-icon" />
        </a>
        <a
          href="mailto:cogsplatform@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <EmailIcon className="social-icon" />
        </a>
      </div>
      <div className="donate-help">
        <div className="donate-help-title">Donate</div>
        <div className="donate-help-caption">
          Support the project to get great features in the future.
        </div>

        <Link to="/donate">
          <span className="donate-help-btn">Donate</span>
        </Link>
      </div>
    </div>
  );
};

export default Help;
