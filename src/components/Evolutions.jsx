import classes from './Evolutions.module.css';

const Evolutions = () => {
  return (
    <div className={classes.evolution_chain}>
      {/* Bulbasaur */}
      <div className={classes.evolution_item}>
        <div className={classes.pokemon_image}>
          <img
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
            alt='Bulbasaur'
          />
        </div>
      </div>

      <div className={classes.arrow}>➤</div>

      {/* Ivysaur */}
      <div className={classes.evolution_item}>
        <div className={classes.pokemon_image}>
          <img
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'
            alt='Ivysaur'
          />
        </div>
      </div>

      <div className={classes.arrow}>➤</div>

      {/* Venusaur */}
      <div className={classes.evolution_item}>
        <div className={classes.pokemon_image}>
          <img
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
            alt='Venusaur'
          />
        </div>
      </div>
    </div>
  );
};

export default Evolutions;
