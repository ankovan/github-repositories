import { gql } from '@apollo/client';
export const getFullRepositoryInfoGql = (id: string) => (
  gql`
  query getFullRepositoryInfo {
    node(id: "${id}") {
      ... on Repository {
        id
        nameWithOwner
        name
        stargazerCount
        pushedAt
        description
        languages(first: 100) {
          edges {
            node {
              id
              name
            }
          }
        }
        owner {
          avatarUrl
          login
        }
      }
    }
  }
`
)