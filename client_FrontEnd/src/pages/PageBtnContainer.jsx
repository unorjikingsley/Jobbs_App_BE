import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const { data: {numOfPages, currentPage }} = useAllJobsContext()
  // console.log(numOfPages, currentPage);

  const Pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathName } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathName);

  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);

    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathName}?${searchParams.toString()}`)
  }

  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft />
        prev
      </button>

      <div
        className="btn-container"
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < 1) prevPage = numOfPages
          handlePageChange(prevPage)
        }}
      >
        {Pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === currentPage && 'active'
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer;
