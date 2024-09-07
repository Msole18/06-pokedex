import css from './Pokemons.module.css';
import cssCard from './Card.module.css';
import { Card } from './Card';
import { PokemonTypes } from './PokemonTypes';

function ListOfPokemons({ pokemons }) {
  return (
    <ul className={css.pokemons_list}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <Card className={cssCard.card}>
            <section className={css.pokemons_container}>
              <div className={css.pokemon_id_container}>
                <p>{`#${pokemon.id}`}</p>
              </div>

              <div className={css.pokemon_image_container}>
                <img
                  className={css.pokemon_image}
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={`a picture of ${pokemon.name}`}
                />
              </div>

              <div className={css.pokemon_name_container}>
                <p>{pokemon.name}</p>
              </div>
            </section>

            <section className={css.types_container}>
              {pokemon.types.map((types) => (
                <PokemonTypes
                  key={types.type.name}
                  type={types.type.name}
                />
              ))}
            </section>
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
