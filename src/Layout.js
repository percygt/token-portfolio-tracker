import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SidebarRight from "./components/sidebar/SidebarRight";
import SidebarLeft from "./components/sidebar/SidebarLeft";
import Carousel from "./components/carousel/Carousel";
import PortfolioContext from "./context/PortfolioContext";
import MainContext from "./context/MainContent";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { TopState } from "./context/TopContext";

const Layout = () => {
  return (
    <MainContext>
      <div className="App">
        <SidebarLeft />
        <div className="main">
          <Navbar />
          <Carousel />
          <div className="content">
            <PortfolioContext>
              <Outlet />
            </PortfolioContext>
          </div>
        </div>
        <SidebarRight />
      </div>
    </MainContext>
  );
};

export default Layout;
