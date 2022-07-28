import { PortfolioState } from "../../context/PortfolioContext";
import Chain from "../../components/chain/Chain";
import Modal from "../../components/modals/Modal";
import ProcessTokenMoralis from "./ProcessTokenMoralis";
import ProcessNFTMoralis from "./ProcessNFTMoralis";
import "./portfolio.scss";
import Carousel from "../../components/carousel/Carousel";
import { Outlet } from "react-router-dom";

const Portfolio = () => {
  const { openModal, setOpenModal } = PortfolioState();
  ProcessTokenMoralis();
  ProcessNFTMoralis();

  return (
    <>
      <Carousel />
      <div className="dashboard">
        <Chain />
        <Outlet />
      </div>
      <Modal open={openModal} onClose={() => setOpenModal([null, false])} />
    </>
  );
};

export default Portfolio;
