import { gql } from '@apollo/client';
export const ALL_REPOSITORIES_CURSORS = gql`
query ALL_REPOSITORIES_CURSORS {
  viewer {
    repositories(first: 100) {
      edges {
        cursor
      }
    }
  }
}
`