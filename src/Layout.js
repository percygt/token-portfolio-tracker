import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SidebarRight from "./components/sidebar/SidebarRight";
import SidebarLeft from "./components/sidebar/SidebarLeft";
import Carousel from "./components/carousel/Carousel";
import PortfolioContext from "./context/PortfolioContext";
import MainContext from "./context/MainContent";

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
