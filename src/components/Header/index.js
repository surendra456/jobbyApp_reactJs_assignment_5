import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="link-nav-item">
        <Link to="/" className="link">
          <li className="nav-link">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="nav-link">Jobs</li>
        </Link>
      </ul>
      <button className="nav-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
