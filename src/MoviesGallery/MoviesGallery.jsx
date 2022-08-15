import { FilmCard } from '../FilmCard/FilmCard';

export const MoviesGallery = ({ movies, handleStatus, handleModal }) => {
  return movies.map(({ id, ...restProps }) => (
    <FilmCard
      key={id}
      id={id}
      movie={restProps}
      handleStatus={handleStatus}
      handleModal={handleModal}
    />
  ));
};
