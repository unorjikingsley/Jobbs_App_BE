import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const { data: {numOfPages, currentPage }} = useAllJobsContext()
  // console.log(numOfPages, currentPage);

  const Pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  })

  return <Wrapper>
    <button className="btn prev-btn">
      <HiChevronDoubleLeft />
      prev
    </button>

    <div className="btn-container">
      {Pages.map((pageNumber) => {
        return <button className = {`btn page-btn ${
          pageNumber === currentPage && 'active'
        }`}
        key = {pageNumber}
      >
        {pageNumber}
      </button>
      })}
    </div>

    <button className="btn prev-btn">
      <HiChevronDoubleRight />
      next
    </button>
  </Wrapper>
}

export default PageBtnContainer;
