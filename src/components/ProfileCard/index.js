import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {profileCard: profileView.initial, profileData: []}

  componentDidMount() {
    this.getProfileCard()
  }

  getProfileCard = async () => {
    this.setState({profileCard: profileView.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
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
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileCard: profileView.success,
        profileData: updatedData,
      })
    } else {
      this.setState({profileCard: profileView.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="button-container">
      <button className="failure-button-profile" type="button">
        Retry
      </button>
    </div>
  )

  renderOfProfileCardVIew = () => {
    const {profileCard} = this.state

    switch (profileCard) {
      case profileView.inProgress:
        return this.renderLoadingView()
      case profileView.failure:
        return this.renderFailureView()
      case profileView.success:
        return this.renderSuccessView()
      default:
        return ''
    }
  }

  render() {
    return <>{this.renderOfProfileCardVIew()}</>
  }
}

export default ProfileCard
