/* eslint-disable react/prop-types */
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Job = ({
  // eslint-disable-next-line no-unused-vars
  _id, position, company, jobLocation, jobTypes, createdAt, jobStatus
}) => {
  const date = day(createdAt).format('MM DD, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobTypes} />

          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
      </div>

      <footer className="actions">
        <Link to={`../edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
        {/* you can use /dashboard/edit-job. its the same thing as '../edit-job' */}
        <Form method='post' action={`../delete-job/${_id}`}>
          <button type="submit" className='btn delete-btn'>
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  )
}

export default Job;
