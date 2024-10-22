/* eslint-disable react-hooks/exhaustive-deps */
import classes from './PokemonDetails.module.css';
import { Loader } from './UI/Loader';
import { PokemonCard } from './PokemonCard';
import { NoPokemonsResults } from './NoPokemonsResults';
import { Card } from './UI/Card';
import { Button } from './UI/Button';
import { DetailsCard } from './DetailsCard';
import { About } from './About';
import { Stats } from './Stats';
import { Evolutions } from './Evolutions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { PokemonsContext } from '../context/PokemonsContext';



export function PokemonDetails({ pokemonId }) {
  
  const {
    setSearch,
    getSearchedPokemons,
    getEvolutionChain,
    sortedPokemons,
    loadingEvolutions,
    errorFetch
  } = useContext(PokemonsContext);

  

  const pokemon = sortedPokemons.find(
    (poke) => poke.id.toString() === pokemonId
  );

  useEffect(() => {
    // setSearch('');

    if (pokemonId) {
      getSearchedPokemons({ search: pokemonId });
    }

    if (pokemon) {
      const evolutionChain = pokemon?.speciesUrl;
      if (evolutionChain) {
        getEvolutionChain({ evolutionChain });
      }
    }
  }, [pokemonId, pokemon, getSearchedPokemons, getEvolutionChain]);

  return (
    <>
      {loadingEvolutions ? (
        <Loader className={classes.loader} />
      ) : pokemon ? (
        <main className={classes.main}>
            <h1>{`#${pokemon.id}  ${pokemon.name}`}</h1>

            <section className={classes.pokemon_section}>
              <div className={classes.column_grid}>
                {pokemon.id > 1 ? (
                  <Link
                    className={classes.link}
                    to={`/pokemon/${pokemon.id - 1}`}
                  >
                    <Card className={classes.button_card}>
                      <Button className={`${classes.button}`}>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faAngleLeft}
                          size='2xl'
                        />
                      </Button>
                    </Card>
                  </Link>
                ) : null}
              </div>

              <div className={`${classes.column_grid} ${classes.center}`}>
                <PokemonCard
                  className={classes.pokemon_card}
                  pokemon={pokemon}
                />
              </div>

              <div className={classes.column_grid}>
                {pokemon.id < 1000 ? (
                  <Link
                    className={classes.link}
                    to={`/pokemon/${pokemon.id + 1}`}
                  >
                    <Card className={classes.button_card}>
                      <Button className={`${classes.button}`}>
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faAngleRight}
                          size='2xl'
                        />
                      </Button>
                    </Card>
                  </Link>
                ) : null}
              </div>
            </section>

            <section className={classes.info_container}>
              <div className={classes.info_column}>
                <DetailsCard
                  className={classes.about_card}
                  title={`About`}
                >
                  <About pokemon={pokemon} />
                </DetailsCard>
              </div>

              <div className={classes.info_column}>
                <DetailsCard
                  className={`${classes.stats_card}`}
                  title={`Stats`}
                >
                  <Stats pokemon={pokemon} />
                </DetailsCard>
              </div>
            </section>
            <DetailsCard title={`Evolution Chain`}>
              {loadingEvolutions ? <Loader /> : <Evolutions pokemons={pokemon} />}
            </DetailsCard>
        </main>
      ) : (
        <Loader className={classes.loader} />
      )}
    </>
  );
}


// { loading && <Loader className={classes.loader} /> }
// {
//   !loading && pokemon ? (
//     <main className={classes.main}>
      // <h1>{`#${pokemon.id}  ${pokemon.name}`}</h1>

      // <section className={classes.pokemon_section}>
      //   <div className={classes.column_grid}>
      //     {pokemon.id > 1 ? (
      //       <Link
      //         className={classes.link}
      //         to={`/pokemon/${pokemon.id - 1}`}
      //       >
      //         <Card className={classes.button_card}>
      //           <Button className={`${classes.button}`}>
      //             <FontAwesomeIcon
      //               className={classes.icon}
      //               icon={faAngleLeft}
      //               size='2xl'
      //             />
      //           </Button>
      //         </Card>
      //       </Link>
      //     ) : null}
      //   </div>

      //   <div className={`${classes.column_grid} ${classes.center}`}>
      //     <PokemonCard
      //       className={classes.pokemon_card}
      //       pokemon={pokemon}
      //     />
      //   </div>

      //   <div className={classes.column_grid}>
      //     {pokemon.id < 1000 ? (
      //       <Link
      //         className={classes.link}
      //         to={`/pokemon/${pokemon.id + 1}`}
      //       >
      //         <Card className={classes.button_card}>
      //           <Button className={`${classes.button}`}>
      //             <FontAwesomeIcon
      //               className={classes.icon}
      //               icon={faAngleRight}
      //               size='2xl'
      //             />
      //           </Button>
      //         </Card>
      //       </Link>
      //     ) : null}
      //   </div>
      // </section>

      // <section className={classes.info_container}>
      //   <div className={classes.info_column}>
      //     <DetailsCard
      //       className={classes.about_card}
      //       title={`About`}
      //     >
      //       <About pokemon={pokemon} />
      //     </DetailsCard>
      //   </div>

      //   <div className={classes.info_column}>
      //     <DetailsCard
      //       className={`${classes.stats_card}`}
      //       title={`Stats`}
      //     >
      //       <Stats pokemon={pokemon} />
      //     </DetailsCard>
      //   </div>
      // </section>

//       <DetailsCard title={`Evolution Chain`}>

//         <Evolutions pokemons={pokemon} />
//       </DetailsCard>
//     </main>
//   ) : (
//   <Loader className={classes.loader} />
// )
// }