import { useParams } from "react-router-dom";
import { getFullRepositoryInfoGql } from "../API/getFullRepositoryInfo";
import { useQuery } from "@apollo/client";
import moment from "moment";
import '../styles/RepositoryList.scss';
function RepositoryCard() {
  const { id } = useParams();
  const { data } = useQuery(
    getFullRepositoryInfoGql(id || "")
  );
  return (
    <div className="center-card">
      <div className="repositories-cards">
        <div className="repository-name">{data?.node.name}</div>
        <div className="card-text">
          <span>Stars: </span>
          {data?.node.stargazerCount}
        </div>
        <div className="card-text">
          <span>Last commited: </span>
          {moment(data?.node.pushedAt).format('MMMM Do YYYY')}
        </div>
        <div className="avatar-name-wrapper">
          <div className="card-text">
            <img className="avatar" src={data?.node.owner.avatarUrl}/>
            <span className="username">{data?.node.owner.login}</span>
          </div>
        </div>
        <div className="languages-wrapper card-text">
          <span>Languages used in the repository: </span>
          <div>
            {(data?.node.languages.edges || []).map((item:any, key:any) => (
              <ul key={key}>
                <li>{item.node.name}</li>
              </ul>
            ))}
          </div>
        </div>
        <div>
          <span>Description: </span>
          {data?.node.description}
        </div>
    </div>
  </div>
)
}

export default RepositoryCard