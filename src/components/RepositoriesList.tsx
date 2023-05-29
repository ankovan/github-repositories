import { Link } from 'react-router-dom';
import '../styles/RepositoryList.scss'; 
import moment from 'moment';
function RepositoriesList({repositories}:any) {
  return (
    <div className="repositories-list">
      {(repositories || []).map((item:any, key:any) => (
      <div className="repositories-cards" key={key}>
        <div className='card-content'>
          <Link to={`/repository/${item.id}`} className='card-text repository-name'>
            {item.name}
          </Link>
          <div className='card-text'>
            <span>Stars: </span>
            {item.stargazerCount}
          </div>
          <div className='card-text'>
            <span>Last commit: </span>
            {moment(item.pushedAt).format('MMMM Do YYYY')}
          </div>
          <div className='card-text'>
            <a href={item.url} target="_blank">{item.url}</a>
          </div>
        </div>
      </div>))}
    </div>
  )
}

export default RepositoriesList