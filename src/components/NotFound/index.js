import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-img"
      />
      <h1 className="not-head">Page Not Found</h1>
      <p className="not-pa">
        were sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
