import classes from './PokemonsList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { PokemonCard } from './PokemonCard';
import { NoPokemonsResults } from './NoPokemonsResults';
import { Button } from './UI/Button';
import { Loader } from './UI/Loader';
import { SortSelection } from './UI/SortSelection';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './UI/Card';

function ListOfPokemons({ pokemons }) {
  return (
    <ul className={classes.pokemons_list}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} >
          <Link
            to={`/pokemon/${pokemon.id}`}
            className={classes.link}
          >
            <PokemonCard pokemon={pokemon} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PokemonsLists() {
  const {
    sortedPokemons,
    setSortSelection,
    errorFetch,
    loading,
    handleLoadMore,
    MINIMUM_POKEMONS_FOR_LOAD_MORE,

  } = useContext(PokemonsContext);

  const hasPokemons = sortedPokemons?.length > 0;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort);
  };

  return (
    <>
      <div className={classes.sort_selection} >
        <SortSelection onChange={handleChange} />
      </div>
      <main className={classes.main} >
        
        {/* Mostrar cargador mientras se carga */}
        {loading && <Loader className={classes.loader} />}

        {/* Mostrar mensaje de error si hay un error en la carga */}
        {!loading && errorFetch && <h2>{errorFetch}</h2>}

        {/* Mostrar mensaje si no hay pokémons después de cargar y no hay error */}
        {!loading && !hasPokemons && errorFetch && <NoPokemonsResults errorFetch={ errorFetch }/>}

        {/* Mostrar la lista de pokémons si hay pokémons */}
        {!loading && hasPokemons && (
          <>
            <ListOfPokemons pokemons={sortedPokemons} />
            {sortedPokemons.length >= MINIMUM_POKEMONS_FOR_LOAD_MORE && (
              <Card className={classes.button_card}>
                <Button
                  onClick={handleLoadMore}
                  title={'Load More Pokemons'}
                  className={classes.button}
                >
                  Load more
                  <FontAwesomeIcon icon={faAnglesDown} />
                </Button>
              </Card>
            )}
          </>
        )}

      </main>
    </>
  )   
}

// {
//   hasPokemons < 1 && loading
//   ? <Loader className={classes.loader} />
//   : (
//     hasPokemons ? (
//       <>
//         <ListOfPokemons pokemons={sortedPokemons} />
//       </>
//     ) : null
//   )
// }
// {
//   sortedPokemons?.length >= MINIMUM_POKEMONS_FOR_LOAD_MORE && !loading ? (
//     <Card className={classes.button_card}>
//       <Button
//         onClick={handleLoadMore}
//         title={'Load More Pokemons'}
//         className={classes.button}
//       >
//         Load more
//         <FontAwesomeIcon icon={faAnglesDown} />
//       </Button>
//     </Card>
//   ) : null
// }