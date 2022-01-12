import { gql } from "@apollo/client";
export const GET_CATEGORIES = gql`
  query Secciones {
    categories(
      first: 100
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
