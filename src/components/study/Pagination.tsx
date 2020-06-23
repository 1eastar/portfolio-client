import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

const Pagination: React.FC<{
  wholeCount: number, count: number, callback: (page: number) => void, nowpage: number
}> = ({
  wholeCount, count, callback, nowpage
}) => (
  <ReactPaginate
    previousLabel="<"
    nextLabel=">"
    breakLabel="..."
    breakClassName="break-me"
    pageCount={wholeCount / count}
    marginPagesDisplayed={2}
    pageRangeDisplayed={2}
    forcePage={nowpage - 1}
    onPageChange={(page) => { callback(page.selected + 1); }}
    containerClassName="pagination"
  />
);

export default Pagination;
