import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-details">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary
            information,company reviews.Find the job that fits your abilities
            and potential
          </p>
          <Link className="link" to="/jobs">
            <button className="home-button" type="button" onClick={onClickJobs}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
