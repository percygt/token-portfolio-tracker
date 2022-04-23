import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./swap.scss";

const Swap = () => {
  return (
    <div className="swap">
      <Sidebar />
      <div className="swap_container">
        <div className="navbar__container">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Swap;
