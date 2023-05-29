import '../styles/Pagination.scss'; 

function Pagination({ pageCount, currentPage, onPageChange }: any) {
  function handlePageClick(pageNumber: number) {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  }

  const pageRange: number[] = [];
  let startPage = 0;
  let endPage = pageCount - 1;

  // Calculate range of pages to show around current page
  if (pageCount > 10) {
    startPage = currentPage - Math.floor(10 / 2);
    endPage = currentPage + Math.floor(10 / 2);

    if (startPage < 0) {
      endPage += Math.abs(startPage);
      startPage = 0;
    }

    if (endPage > pageCount - 1) {
      startPage -= endPage - (pageCount - 1);
      endPage = pageCount - 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  return (
    <div className='pagination-container'>

      <button
        className={`pagination-buttons ${currentPage === 0 ? 'disabled' : ''}`}
        disabled={currentPage === 0}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Previous
      </button>

      {pageRange.map((pageIndex) => (
        <button
          className={`pagination-buttons ${currentPage === pageIndex ? 'active' : ''}`}
          key={pageIndex}
          disabled={currentPage === pageIndex}
          onClick={() => handlePageClick(pageIndex)}
        >
          {pageIndex + 1}
        </button>
      ))}

      <button
        className={`pagination-buttons ${currentPage === pageCount - 1 ? 'disabled' : ''}`}
        disabled={currentPage === pageCount - 1}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;
