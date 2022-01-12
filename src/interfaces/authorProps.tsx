export interface AuthorProps {
  node: {
    name: string;
    slug: string;
  };
  edges: [
    {
      node: {
        name: string;
        slug: string;
      };
    }
  ];
}
