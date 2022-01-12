import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/getAuthors";

export function useGetAuthors() {
  const { data, loading, error } = useQuery(GET_AUTHORS);
  return {
    dataAutores: data,
    loadingAutores: loading,
  };
}
