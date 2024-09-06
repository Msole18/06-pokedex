import css from './Pokemons.module.css';
import { Card } from './Card';
import {PokemonTypes} from './PokemonTypes'

function ListOfPokemons({ pokemons }) {
  return (
    <ul className={css.pokemons}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <Card>
            <div>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
              <div>
                <span>{`#${pokemon.id}`}</span>
              </div>
              <h2>{pokemon.name}</h2>
            </div>

            <div className={css.types}>
              {pokemon.types.map((types) => (
                <PokemonTypes
                  key={types.type.name}
                  type={types.type.name}
                />
              ))}
            </div>
          </Card>
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

  return hasPokemons ? (
    <ListOfPokemons pokemons={pokemons} />
  ) : (
    <NoPokemonsResults />
  );
}
