import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import { ReactComponent as MoonIcon } from "../../assets/svg/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/svg/sun.svg";

const updateTheme = (isLightEnabled) => {
  // Get CSS variables for background/foreground
  const styles = getComputedStyle(document.body);
  const black = styles.getPropertyValue("--black");
  const white = styles.getPropertyValue("--white");
  const transw = styles.getPropertyValue("--transw");
  const transb = styles.getPropertyValue("--transb");
  const docEl = document.documentElement;

  if (isLightEnabled) {
    docEl.style.setProperty("--background", white);
    docEl.style.setProperty("--foreground", black);
    docEl.style.setProperty("--line", transb);
    document.querySelector("html").classList.add("lightmode");
  } else {
    docEl.style.setProperty("--background", black);
    docEl.style.setProperty("--foreground", white);
    docEl.style.setProperty("--line", transw);
    document.querySelector("html").classList.remove("lightmode");
  }
};

export default function LNDToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
        <span className="hidden">
          {isEnabled ? "Enable Dark Mode" : "Enable Light Mode"}
        </span>
        <div className="icons">
          <MoonIcon />
          <SunIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isEnabled}
          onClick={toggleState}
        />
      </div>
    </label>
  );
}
