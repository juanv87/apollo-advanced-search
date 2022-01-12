export interface SearchProps {
  value: string;
  node: {
    id: number;
    title: string;
    slug: string;
    date: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    campos: {
      volanta: string;
      descripcionDestacado: string;
    };
    categories: {
      edges: [
        {
          node: {
            name: string;
            slug: string;
          };
        }
      ];
    };
  };
}
