import classes from './NoPokemonsResults.module.css'; 
import { Card } from './UI/Card';

export function NoPokemonsResults({ errorFetch }) {
  const message = errorFetch ? errorFetch : 'No pokemons found for this search';

  return (
    <Card className={`${classes.card}`}>
      <section className={`${classes.cards_section}`}>
        <h2 className={classes.message}>{message}</h2>
      </section>
    </Card>
  );
}