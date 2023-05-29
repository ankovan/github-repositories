import { gql } from '@apollo/client';
export const searchRepositoriesGql = (query: "", len = 0, cursor:string|null = null) => (
  gql`
  query searchRepositories {
    search(query: "${query}", first: ${len}, ${cursor ? `after: "${cursor}"`: ``}, type: REPOSITORY) {
      nodes {
        ... on Repository {
          id
          name
          stargazerCount
          pushedAt
          url
        }
      }
      edges {
        cursor
      }
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`
)