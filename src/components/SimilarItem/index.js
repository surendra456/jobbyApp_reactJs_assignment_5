import './index.css'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {ImLocation2} from 'react-icons/im'

const SimilarItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    rating,
    jobDescription,
    location,
    title,
  } = item

  return (
    <li className="similar-item-card">
      <div className="img-rat">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-detail-logo"
        />
        <div className="title-rating">
          <h1 className="title-head-job">{title}</h1>
          <p className="rating-job">
            <FaRegStar className="rat-img" /> {rating}
          </p>
        </div>
      </div>
      <h1 className="dec">Description</h1>
      <p className="dec-similar">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarItem
