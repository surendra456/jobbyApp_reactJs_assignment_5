import {Link} from 'react-router-dom'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {ImLocation2} from 'react-icons/im'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  return (
    <Link className="link-card" to={`jobs/${id}`}>
      <li className="job-item">
        <div className="logo-title-rat">
          <img src={companyLogoUrl} alt="company logo" className="logo-img" />
          <div className="title-rating">
            <h1 className="title-head">{title}</h1>
            <p className="rating-job">
              <FaRegStar className="rat-img" /> {rating}
            </p>
          </div>
        </div>
        <div className="loco-em-type-sal">
          <div className="loco-emt">
            <p className="loco">
              <ImLocation2 className="loco-i" />
              {location}
            </p>
            <p className="emt">
              <FaSuitcase className="emt-i" />
              {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line-job" />
        <h1 className="dec">Description</h1>
        <p className="dec-matter">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
