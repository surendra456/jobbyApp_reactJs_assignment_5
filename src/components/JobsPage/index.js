import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'

import ProfileCard from '../ProfileCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstantsJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class JobsPage extends Component {
  state = {
    jobsList: [],
    jobsApiStatus: apiConstantsJobs.initial,
    searchInput: '',
    priceRange: '',
    intership: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  noValue = () => this.setState({jobsApiStatus: apiConstantsJobs.noJobs})

  getJobsList = async () => {
    const {intership, priceRange, searchInput} = this.state
    const type = intership.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${priceRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      if (data.total === 0) {
        return this.noValue()
      }
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        title: each.title,
        rating: each.rating,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiConstantsJobs.success,
      })
    } else {
      this.setState({jobsApiStatus: apiConstantsJobs.failure})
    }
    return null
  }

  onChangeEmployeeType = event => {
    const val = event.target.value

    this.setState(prev => {
      const intership = [...prev.intership, val]
      return {intership}
    }, this.getJobsList)
  }

  renderTypeOfEmployment = () => (
    <>
      <h1 className="type-head">Type of Employment</h1>
      <ul className="employee-type-container">
        {employmentTypesList.map(each => (
          <li className="each-type" key={each.employmentTypeId}>
            <input
              type="checkbox"
              className="type-check"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={this.onChangeEmployeeType}
            />
            <label htmlFor={each.employmentTypeId} className="label-name">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  onClickSalary = event => {
    this.setState({priceRange: event.target.value}, this.getJobsList)
  }

  renderSalaryRange = () => (
    <>
      <h1 className="type-head">Salary Range</h1>
      <ul className="employee-type-container">
        {salaryRangesList.map(each => (
          <li className="each-type" key={each.salaryRangeId}>
            <input
              type="radio"
              className="type-check"
              id={each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={this.onClickSalary}
            />
            <label htmlFor={each.salaryRangeId} className="label-name">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  renderSuccessViewJobs = () => {
    const {jobsList} = this.state

    return jobsList.map(each => <JobItem key={each.id} jobItem={each} />)
  }

  onClickRetryButton = () => {
    this.setState(
      {
        searchInput: '',
        priceRange: '',
        intership: '',
      },
      this.getJobsList,
    )
  }

  renderFailureViewJobs = () => (
    <div className="failure-view-job">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img-job"
      />
      <h1 className="failure-jobs-head">Oops! Something Went Wrong</h1>
      <p className="failure-label">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingViewJob = () => (
    <div className="loader-container lo" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="not-found">
      <img
        alt="no jobs"
        className="not-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="not-head">No Jobs Found</h1>
      <p className="not-pa">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsListView = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiConstantsJobs.success:
        return this.renderSuccessViewJobs()
      case apiConstantsJobs.failure:
        return this.renderFailureViewJobs()
      case apiConstantsJobs.inProgress:
        return this.renderLoadingViewJob()
      case apiConstantsJobs.noJobs:
        return this.renderNoJobsView()
      default:
        return ''
    }
  }

  onChangeValue = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchFilterList = () => {
    const {searchInput, priceRange, intership} = this.state
    this.setState({searchInput, priceRange, intership}, this.getJobsList)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-page">
          <div className="profile-filter-section">
            <ProfileCard />
            <hr className="line" />
            {this.renderTypeOfEmployment()}
            <hr className="line" />
            {this.renderSalaryRange()}
          </div>
          <div className="search-jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                className="searchInput"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeValue}
              />
              <button
                className="search-img"
                testid="searchButton"
                type="button"
                onClick={this.onSearchFilterList}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobsList-container">{this.renderJobsListView()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
