import css from './Pokemons.module.css';
import{ PokemonCard } from './PokemonCard'

function ListOfPokemons({ pokemons }) {
  return (
    <ul className={css.pokemons_list}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          {console.log('Pokemon: ',pokemon)}
          <PokemonCard pokemon={ pokemon } />
        </li>
      ))}
    </ul>
  );
}

function NoPokemonsResults() {
  return <p>No pokemons found for this search</p>;
}

export function Pokemons({ pokemons }) {
  const hasPokemons = pokemons?.length > 0;
  console.log('pokemons: ', pokemons);
  return (
    <main>
      {hasPokemons ? (
        <ListOfPokemons pokemons={pokemons} />
      ) : (
        <NoPokemonsResults />
      )}
    </main>
  );
}
