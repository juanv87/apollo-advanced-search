import { gql } from "@apollo/client";
export const GET_POSTS = gql`
  query ultimas(
    $year: Int
    $before: Int
    $after: Int
    $offset: Int
    $textoSearch: String
    $autorName: [String]
    $tagSlugAnd: [String]
    $nombreSeccion: String
  ) {
    posts(
      where: {
        offsetPagination: { offset: $offset, size: 12 }
        search: $textoSearch
        taxQuery: {
          taxArray: {
            taxonomy: AUTOR
            field: NAME
            terms: $autorName
            operator: AND
          }
        }
        tagSlugAnd: $tagSlugAnd
        categoryName: $nombreSeccion
        orderby: { field: DATE, order: DESC }
        dateQuery: {
          year: $year
          inclusive: true
          after: { year: $after }
          before: { year: $before }
        }
      }
    ) {
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
      edges {
        node {
          id
          title
          slug
          date
          autores {
            edges {
              node {
                name
              }
            }
          }
          featuredImage {
            node {
              sourceUrl(size: MEDIUM)
            }
          }
          campos {
            descripcionDestacado
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
