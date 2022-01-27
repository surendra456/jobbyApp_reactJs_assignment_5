import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {ImLocation2} from 'react-icons/im'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarItem from '../SimilarItem'

import './index.css'

const apiConstantsJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobItem: [], apiStatus: apiConstantsJobs.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiConstantsJobs.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          companyWebsiteUrl: data.job_details.company_website_url,
          rating: data.job_details.rating,
          jobDescription: data.job_details.job_description,
          title: data.job_details.title,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          employmentType: eachItem.employment_type,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      this.setState({jobItem: updatedData, apiStatus: apiConstantsJobs.success})
    } else {
      this.setState({apiStatus: apiConstantsJobs.failure})
    }
  }

  renderSkillsContainer = () => {
    const {jobItem} = this.state
    const {jobDetails} = jobItem
    const {skills} = jobDetails

    return skills.map(each => {
      const {imageUrl, name} = each

      return (
        <li className="skill" key={name}>
          <img src={imageUrl} alt={name} className="skill-logo" />
          <p className="skill-label">{name}</p>
        </li>
      )
    })
  }

  onClickRetry = () => {
    this.setState(
      {apiStatus: apiConstantsJobs.inProgress},
      this.getJobItemDetails,
    )
  }

  renderSuccessJobItemView = () => {
    const {jobItem} = this.state
    const {jobDetails, similarJobs} = jobItem

    const {
      title,
      companyLogoUrl,
      employmentType,
      rating,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      location,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-card">
          <div className="logo-title-rat">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-detail-logo"
            />
            <div className="title-rating">
              <h1 className="title-head-job">{title}</h1>
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
          <div className="dec-link">
            <h1 className="dec">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="dec-matter-job-l">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-head">Skills</h1>
            <ul className="skills-card">{this.renderSkillsContainer()}</ul>
          </div>
          <div className="experience">
            <h1 className="ex-head">Life at Company</h1>
            <div className="ex-details">
              <p className="ex-dec">{description}</p>
              <img src={imageUrl} alt="life at company" className="ex-image" />
            </div>
          </div>
        </div>
        <div className="similar-job-card">
          <h1 className="similar-head">Similar Jobs</h1>
          <ul className="similar-card">
            {similarJobs.map(each => (
              <SimilarItem key={each.id} item={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingViewJob = () => (
    <div className="loader-container lo" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureJobItemView = () => (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail"
      />
      <h1 className="not-head">Oops! Something Went Wrong</h1>
      <p className="not-pa">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-button-profile"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsJobs.success:
        return this.renderSuccessJobItemView()
      case apiConstantsJobs.failure:
        return this.renderFailureJobItemView()

      case apiConstantsJobs.inProgress:
        return this.renderLoadingViewJob()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="jobItem-card_details">
        <Header />
        <div className="job-item-card">{this.renderJobItemView()}</div>
      </div>
    )
  }
}

export default JobItemDetails
