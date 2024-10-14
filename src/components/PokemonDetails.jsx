import classes from './PokemonDetails.module.css';
import { PokemonCard } from '../components/PokemonCard';
import { Card } from './UI/Card';
import { Button } from './UI/Button';
import { ProgressBar } from './UI/ProgressBar';
import Evolutions from './Evolutions';


export function PokemonDetails({ pokemon }) {

  
  // const SortEvolutionChain = (chain) => {
  //   console.log('entro al SortEvolutionChain: ', chain);
  //   if (!chain) return null;

  //   return {
  //     species: {
  //       name: chain.species.name,
  //       url: chain.species.url,
  //     },
  //     evolves_to: chain.evolves_to.map((evolution) =>
  //       SortEvolutionChain(evolution)
  //     ),
  //   };
  // };
  // const evolutionChain = SortEvolutionChain(pokemon.evolutions);
  // console.log('evolutionChain: ', evolutionChain);

  return (
    <main>
      <h1>{`#${pokemon.id}  ${pokemon.name}`}</h1>

      <section className={classes.pokemon_section}>
        {pokemon.id > 1 ? (
          <Button className={classes.button}>{`#${pokemon.id - 1}  ${
            pokemon.name
          }`}</Button>
        ) : null}

        <PokemonCard
          className={classes.pokemon_card}
          pokemon={pokemon}
        />
        <Button className={classes.button}>{`#${pokemon.id + 1}  ${
          pokemon.name
        }`}</Button>
      </section>

      <section className={classes.info_container}>
        <Card className={classes.card}>
          <section className={classes.cards_section}>
            <h2 className={classes.cards_name_container}>Details</h2>
            <span>{`Height: ${(pokemon.height * 0.1).toFixed(1)} m`}</span>
            <span>{`Weight: ${(pokemon.weight * 0.1).toFixed(1)} Kg`}</span>
            {/* <span>{`Evo: ${(pokemon.evolutions.name)}`}</span> */}
          </section>
        </Card>

        <Card className={classes.card}>
          <section className={classes.cards_section}>
            <h2 className={classes.cards_name_container}>Abilities</h2>
            <ul className={classes.abilities}>
              {pokemon.abilities.map((abilities) => (
                <li key={abilities.ability.name}>
                  <span>{`${abilities.ability.name}`}</span>
                </li>
              ))}
            </ul>
          </section>
        </Card>

        <Card className={classes.card}>
          <section className={classes.cards_section}>
            <h2 className={classes.cards_name_container}>Stats</h2>
            <ul className={classes.stats}>
              {pokemon.stats.map((stats) => (
                <li key={stats.stat.name}>
                  <ProgressBar
                    key={stats.stat.name}
                    name={stats.stat.name}
                    value={stats.base_stat}
                  />
                </li>
              ))}
            </ul>
          </section>
        </Card>
      </section>

      <Card className={`${classes.card} ${classes.details}`}>
        <section className={classes.cards_section}>
          <h2 className={classes.cards_name_container}>{`Evolution Chain`}</h2>
          <Evolutions />
        </section>
      </Card>
    </main>
  );
}
