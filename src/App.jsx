// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { getMovies } from './services/api';
import { mapperFilms } from './utils/mapper';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState('');
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      setIsLoading(true);

      getMovies(page)
        .then(({ data }) =>
          setMovies(prevState => [...prevState, ...mapperFilms(data.results)])
        )
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isShown, page, setIsLoading, setMovies]);

  const handlerLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const toggleStatus = id => {
    console.log(id);
    const newMovies = movies.map(movie => {
      if (movie.id === id) {
        return { ...movie, watched: !movie.watched };
      }
      return movie;
    });
    setMovies(newMovies);
  };

  const openModel = poster => {
    setPoster(poster);
  };

  const closeModal = () => {
    setPoster('');
  };

  const showFilms = () => {
    setIsShown(true);
  };

  return (
    <>
      {movies.length === 0 && (
        <Button text="Show films list" handleClick={showFilms} />
      )}
      <MoviesGallery
        movies={movies}
        handleStatus={toggleStatus}
        handleModal={openModel}
      />
      {movies.length > 1 && (
        <Button text="Load more" handleClick={handlerLoadMore} />
      )}
      {isLoading && <p>Loading...</p>}
      {poster && <Modal poster={poster} closeModal={closeModal} />}
    </>
  );
};

// export class App extends Component {
//   state = {
//     movies: [],
//     page: 1,
//     isLoading: false,
//     poster: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { page } = this.state;
//     if (prevState.page !== page) {
//       this.fetchMovies(page);
//     }
//   }

//   fetchMovies = page => {
//     this.setState({ isLoading: true });

//     getMovies(page)
//       .then(({ data }) =>
//         this.setState(prevState => ({
//           movies: [...prevState.movies, ...mapperFilms(data.results)],
//         }))
//       )
//       .catch(console.log)
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   handlerLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toggleStatus = id => {
//     console.log(id);
//     const { movies } = this.state;
//     const newMovies = movies.map(movie => {
//       if (movie.id === id) {
//         return { ...movie, watched: !movie.watched };
//       }
//       return movie;
//     });
//     this.setState({ movies: newMovies });
//   };

//   openModel = poster => {
//     this.setState({ poster });
//   };

//   closeModal = () => {
//     this.setState({ poster: '' });
//   };

//   render() {
//     const { movies, page, isLoading, poster } = this.state;
//     return (
//       <>
//         {movies.length === 0 && (
//           <Button
//             text="Show films list"
//             handleClick={() => this.fetchMovies(page)}
//           />
//         )}
//         <MoviesGallery
//           movies={movies}
//           handleStatus={this.toggleStatus}
//           handleModal={this.openModel}
//         />
//         {movies.length > 1 && (
//           <Button text="Load more" handleClick={this.handlerLoadMore} />
//         )}
//         {isLoading && <p>Loading...</p>}
//         {poster && <Modal poster={poster} closeModal={this.closeModal} />}
//       </>
//     );
//   }
// }
export default App;
