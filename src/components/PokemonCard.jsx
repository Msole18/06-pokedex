import css from './PokemonCard.module.css';
import cssCard  from './UI/Card.module.css';
import { Card } from './UI/Card';
import { PokemonTypes } from './PokemonTypes';


export function PokemonCard (pokemon) {
  const imageSrc = pokemon.pokemon.defaultImage
    ? pokemon.pokemon.defaultImage
    : pokemon.pokemon.secondaryImage;

  return (
    <Card className={cssCard.card}>
      <section className={css.pokemons_container}>
        <div className={css.pokemon_id_container}>
          <p>{`#${pokemon.pokemon.id}`}</p>
        </div>

        <div className={css.pokemon_image_container}>
          <img
            className={css.pokemon_image}
            src={imageSrc}
            alt={`a picture of ${pokemon.pokemon.name}`}
          />
        </div>

        <div className={css.pokemon_name_container}>
          <p>{pokemon.pokemon.name}</p>
        </div>
      </section>

      <section className={css.types_container}>
        {pokemon.pokemon.type.map((types) => (
          <PokemonTypes
            key={types.type.name}
            type={types.type.name}
          />
        ))}
      </section>
    </Card>
  );
}