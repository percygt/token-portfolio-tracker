import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SidebarRight from "./components/sidebar/SidebarRight";
import SidebarLeft from "./components/sidebar/SidebarLeft";
import Carousel from "./components/carousel/Carousel";
import PortfolioContext from "./context/PortfolioContext";
import MainContext from "./context/MainContent";
import { ToastContainer, Flip } from "react-toastify";
import Footer from "./components/footer/Footer";
import { useEffect, useState, useRef } from "react";
import { TopState } from "./context/TopContext";
import { SkeletonTheme } from "react-loading-skeleton";

const Layout = () => {
  const { setContHeight, setContWidth } = TopState();
  const contRef = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setContWidth(event[0].contentBoxSize[0].inlineSize);
      setContHeight(event[0].contentBoxSize[0].blockSize);
    });

    if (contRef) {
      resizeObserver.observe(contRef.current);
    }
  }, [contRef]);

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <MainContext>
        <div className="App" ref={contRef}>
          <SidebarLeft />
          <div className="main">
            <Navbar />
            <div className="content">
              <Carousel />
              <PortfolioContext>
                <Outlet />
              </PortfolioContext>
            </div>
            <Footer />
          </div>
          <SidebarRight />
        </div>
        <ToastContainer transition={Flip} className="toast-container" />
      </MainContext>
    </SkeletonTheme>
  );
};

export default Layout;
