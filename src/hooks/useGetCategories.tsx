import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/getCategories";

export function useGetCategories() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  return {
    dataSecciones: data,
    loadingSecciones: loading,
  };
}
