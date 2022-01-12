interface camposNotaBusqueda {
  titulo: string;
  seccionSlug: string;
  link: string;
  date: string;
  descripcionDestacada: string;
  imagenDestacada: string;
}
const formatDate = (date: string | number | Date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
function ResultPostCard({
  titulo,
  date,
  seccionSlug,
  link,
  descripcionDestacada,
  imagenDestacada,
}: camposNotaBusqueda) {
  return (
    <div className="border-solid border-t-3 container">
      <a
        href={`https://prensaobrera.com/${seccionSlug}/${link}`}
        target="_blank"
      >
        <div className="imagen">
          <img src={imagenDestacada} />
        </div>
      </a>
      <div className="col-span-3 text-xs">{formatDate(date)}</div>
      <h3 className="mt-1 font-sans font-semibold text-lg mb-2 leading-tight">
        <a
          target="_blank"
          href={`https://prensaobrera.com/${seccionSlug}/${link}`}
        >
          {titulo}
        </a>
      </h3>
      {descripcionDestacada ? (
        <div className="descripcionDestacada">
          <p className="text-sm">{descripcionDestacada}</p>
        </div>
      ) : null}
    </div>
  );
}
export default ResultPostCard;
