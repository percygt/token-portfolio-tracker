import "./pagination.scss";
import { PortfolioState } from "../../context/PortfolioContext";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const PaginationToken = ({ contWidth }) => {
  const { filteredToken, setTokenCurrentItems, itemOffset, setItemOffset } =
    PortfolioState();
  const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);
  const itemsPerPage = contWidth <= 1600 ? 7 : 8;

  useEffect(() => {
    const getItems = filteredToken.map((token, index) => {
      return Object.assign(token, { id: index + 1 });
    });
    // setItemOffset(0);
    setItems(getItems);
  }, [filteredToken]);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setTokenCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-prev"
        nextLinkClassName="page-next"
        activeLinkClassName="active"
        pageClassName="page-cont"
        disabledLinkClassName="disabled"
      />
    </>
  );
};

export default PaginationToken;
