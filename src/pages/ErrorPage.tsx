import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h3>Oops! There's no such page.</h3>
        <p>
            Go
            <Link to="/"> home</Link>
        </p>
    </div>
  )
}

export default ErrorPage