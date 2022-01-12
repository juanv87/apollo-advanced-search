import { gql } from "@apollo/client";
export const GET_AUTHORS = gql`
  query Autores {
    autores(
      first: 2000
      where: { padCounts: true, orderby: COUNT, order: DESC }
    ) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;
