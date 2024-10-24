import classes from './PokemonsList.module.css';
import { MAXIMUM_POKEMONS_FOR_LOAD_MORE } from '../constants.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { PokemonsContext } from '../context/PokemonsContext';
import { NoPokemonsResults } from './NoPokemonsResults';
import { PokemonCard } from './PokemonCard';
import { Card } from './UI/Card';
import { Button } from './UI/Button';
import { Loader } from './UI/Loader';
import { SortSelection } from './UI/SortSelection';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

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
    fetchError,
    loading,
    handleLoadMore,
  } = useContext(PokemonsContext);

  const hasPokemons = sortedPokemons?.length > 0;

  // Get the ID of the last loaded Pokémon
  const lastPokemonId = sortedPokemons.length > 0 ? sortedPokemons[sortedPokemons.length - 1].id : 0;

  // Check if the last Pokémon ID is less than MAXIMUM_POKEMONS_FOR_LOAD_MORE
  const canLoadMoreButton = lastPokemonId < MAXIMUM_POKEMONS_FOR_LOAD_MORE;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort);
  };

  return (
    <>
      <div className={classes.sort_selection} >
        <SortSelection onChange={handleChange} />
      </div>
      <main className={classes.main}>
        
        {
          fetchError 
            ? (<NoPokemonsResults fetchError={fetchError} />)
            : hasPokemons < 1 && loading 
              ? (<div className={classes.loader_container}>
                <Loader/>
              </div>)
                : (hasPokemons >= 1
                    ? (<ListOfPokemons pokemons={sortedPokemons} />) 
                    : null
                  )
        }
        {canLoadMoreButton && !loading && (
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
      </main>
    </>
  )   
}
