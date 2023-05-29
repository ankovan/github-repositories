import { gql } from '@apollo/client';
export const getCurrentUserRepositoriesPageGql = (len = 0, cursor:string|null = null) => (
  gql`
    query GetCurrentUserRepositories {
      viewer {
        name
        repositories(first: ${len}, ${cursor ? `after: "${cursor}"`: ``}, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage

            startCursor
            endCursor
          }
          nodes {
            id
            name
            stargazerCount
            pushedAt
            url
          }
          edges {
            cursor
          }
        }
      }
    }
  `
)
