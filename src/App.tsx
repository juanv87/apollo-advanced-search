import { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { Autocomplete, TextField } from "@mui/material";
import { GET_POSTS } from "./queries/getPosts";
import { useGetCategories } from "./hooks/useGetCategories";
import { useGetAuthors } from "./hooks/useGetAuthors";
import LoaderSearch from "./loaders/loaderSearch";
import ResultPostCard from "./cards/resultPostCard";
import { imgPlaceholder } from "./constants";
import { SearchProps } from "./interfaces/searchProps";
import { AuthorProps } from "./interfaces/authorProps";

function App() {
  const [textInputSearch, settextInputSearch] = useState("");
  const [textInputSearchAutor, settextInputSearchAutor] = useState<
    string | Object
  >({});
  const [textInputSearchTags, settextInputSearchTags] = useState("");
  const [textInputSearchSeccion, settextInputSearchSeccion] = useState("");
  const [offsetNumber, setOffsetNumber] = useState(0);
  const [nroYear, setNroYear] = useState<null | number>(null);
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: {
      textoSearch: textInputSearch,
      autorName: textInputSearchAutor,
      tagSlugAnd: textInputSearchTags,
      nombreSeccion: textInputSearchSeccion,
      offset: offsetNumber,
      year: nroYear,
    },
  });

  const handleClickSearch = (event: any) => {
    event.preventDefault();
    const inputValue = (
      document.querySelector("#inputSearch") as HTMLInputElement
    ).value;
    const inputSearchAutor: any = (
      document.querySelector("#inputSearchAutor") as HTMLInputElement
    ).value.split(",");
    const inputSearchSeccion = (
      document.querySelector("#inputSearchSeccion") as HTMLInputElement
    ).value;
    const inputSearchYear: any = (
      document.querySelector("#inputSearchYear") as HTMLInputElement
    ).value;
    const numberYear = parseInt(inputSearchYear);
    const inputSearchTags: any = (
      document.querySelector("#inputSearchTags") as HTMLInputElement
    ).value.split(",");
    settextInputSearch(inputValue);
    settextInputSearchAutor(inputSearchAutor);
    settextInputSearchTags(inputSearchTags);
    settextInputSearchSeccion(inputSearchSeccion);
    setNroYear(numberYear);
    setOffsetNumber(0);
  };
  const handleNextPage = () => {
    setOffsetNumber(offsetNumber + 12);
  };
  const handlePrevPage = () => {
    setOffsetNumber(offsetNumber - 12);
  };

  const { dataSecciones, loadingSecciones } = useGetCategories();
  const listaSecciones = dataSecciones?.categories.edges.map(
    ({ node }: any) => node.name
  );
  const { dataAutores, loadingAutores } = useGetAuthors();
  const listaAutores = dataAutores?.autores.edges.map(
    ({ node }: AuthorProps) => node.name
  );
  const currentYear = new Date().getFullYear();
  const listaYears = [];
  for (let i = 1993; i <= currentYear; i++) {
    listaYears.push(i);
  }
  return (
    <div className="App">
      <h2 className="font-bold text-3xl text-center">
        Advanced Apollo search proyect
      </h2>
      <div className="container m-auto">
        <form onSubmit={handleClickSearch}>
          <div className="flex gap-5">
            <input
              id="inputSearch"
              className="inputSearchMain w-full transition-all mb-4"
              placeholder="Ingresá tu búsqueda acá"
              type="string"
              name="textSearch"
            />
            <button
              className="transition-all rounded-full opacity-70 hover:opacity-100"
              onClick={handleClickSearch}
            >
              Buscar
            </button>
          </div>
          <div className="flex items-center gap-5">
            <Autocomplete
              disablePortal
              id="inputSearchAutor"
              options={listaAutores?.sort()}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Tipear autor/a" />
              )}
            />
            <div className="w-full">
              <input
                id="inputSearchTags"
                className="inputSearch transition-all w-full"
                placeholder="Palabra/s clave"
                type="string"
                name="tagsSearch"
              />
              <p className="info flex items-center gap-1">
                Ej: apps, precarizacion laboral, rappi.
              </p>
            </div>
            <Autocomplete
              disablePortal
              id="inputSearchSeccion"
              options={listaSecciones}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Sección"
                  placeholder="Favorites"
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="inputSearchYear"
              options={listaYears.sort(function (a, b) {
                return b - a;
              })}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Año" />}
            />
          </div>
        </form>
        {
          //textInputSearch.length > 0 ?
          loading ? (
            <LoaderSearch />
          ) : (
            <div className="relative mt-10">
              <div className="flex gap-2 text-sm text-gray-600 mb-3">
                <p>Resultados: {data?.posts.pageInfo.offsetPagination.total}</p>
              </div>
              <article className="grid gap-7 grid-cols-1 md:grid-cols-3">
                {data?.posts.edges.map(({ node }: SearchProps) => (
                  <ResultPostCard
                    key={node.id}
                    titulo={node.title}
                    link={node.slug}
                    date={node.date}
                    seccionSlug={
                      node.categories.edges[0]
                        ? node.categories.edges[0].node.slug
                        : "politicas"
                    }
                    descripcionDestacada={node.campos.descripcionDestacado}
                    imagenDestacada={
                      node.featuredImage
                        ? node.featuredImage.node.sourceUrl
                        : imgPlaceholder
                    }
                  />
                ))}
              </article>
              <div className="flex mt-14 items-center justify-center gap-5">
                {data?.posts.pageInfo.offsetPagination.hasPrevious == true ? (
                  <button
                    onClick={handlePrevPage}
                    className="flex gap-2 items-center"
                  >
                    <span className="uppercase font-bold text-sm">
                      Página anterior
                    </span>
                  </button>
                ) : null}
                {data?.posts.pageInfo.offsetPagination.hasMore == true ? (
                  <button
                    onClick={handleNextPage}
                    className="flex gap-2 items-center"
                  >
                    <span className="uppercase font-bold text-sm">
                      Página siguiente
                    </span>
                  </button>
                ) : null}
              </div>
            </div>
          )
          //:null
        }
        {error ? <p>{error.message}</p> : null}
      </div>
    </div>
  );
}

export default App;
