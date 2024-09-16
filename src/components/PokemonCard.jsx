/* eslint-disable react/prop-types */
import classes from './PokemonCard.module.css';
import cardClasses  from './UI/Card.module.css';
import { Card } from './UI/Card';
import { PokemonTypes } from './PokemonTypes';


export function PokemonCard ({pokemon}) {
  
  const imageSrc = pokemon.defaultImage
    ? pokemon.defaultImage
    : pokemon.secondaryImage;

  return (
    <Card className={cardClasses.card}>
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
          <p>{pokemon.name}</p>
        </div>
      </section>

      <section className={classes.types_container}>
        {pokemon.type.map((types) => (
          <PokemonTypes
            key={types.type.name}
            type={types.type.name}
          />
        ))}
      </section>
    </Card>
  );
}