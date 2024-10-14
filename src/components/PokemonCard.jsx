import classes from './PokemonCard.module.css';
import { Card } from './UI/Card';
import { PokemonTypes } from './PokemonTypes';

export function PokemonCard({ pokemon, className }) {
  const imageSrc = pokemon.defaultImage
    ? pokemon.defaultImage
    : pokemon.secondaryImage;

  return (
    <Card className={`${classes.card} ${className}`}>
      <section className={classes.pokemons_container}>
        <div className={classes.pokemon_id_container}>
          <p>{`#${pokemon.id}`}</p>
        </div>

        <div className={classes.pokemon_image_container}>
          <img
            className={classes.pokemon_image}
            src={imageSrc}
            alt={`a picture of ${pokemon.name}`}
          />
        </div>

        <div className={classes.pokemon_name_container}>
          <p className={classes.pokemon_name}>{pokemon.name}</p>
        </div>
      </section>

      <section>
        <ul className={classes.types_container}>
          {pokemon.type.map((types) => (
            <li key={types.type.name}>
              <PokemonTypes type={types.type.name} />
            </li>
          ))}
        </ul>
      </section>
    </Card>
  );
}
