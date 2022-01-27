import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  renderUserNameInput = () => {
    const {errorMsg, showSubmitError} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userName" className="l-username">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          className="text-box"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
        <label htmlFor="password" className="l-username">
          PASSWORD
        </label>
        <input
          type="password"
          className="text-box"
          id="password"
          placeholder="Password"
          onChange={this.onChangePassword}
        />
        <button className="button-login" type="submit">
          Login
        </button>
        {showSubmitError && <p className="error">*{errorMsg}</p>}
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderUserNameInput()}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
