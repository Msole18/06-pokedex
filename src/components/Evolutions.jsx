import React, { useEffect, useState } from 'react';
import classes from './Evolutions.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesDown } from '@fortawesome/free-solid-svg-icons';

const EvolutionCards = ({ pokemon }) => {

  const imageSrc = pokemon.defaultImage
    ? pokemon.defaultImage
    : pokemon.secondaryImage;

  return (
    <div className={classes.evolution_item}>
      <Link
        to={`/pokemon/${pokemon.evolutionID}`}
        className={classes.link}
      >
        <div className={classes.pokemon_image_container}>
          <img
            className={classes.pokemon_image}
            src={imageSrc}
            alt={`a picture of ${pokemon.name}`}
            title={`${pokemon.name}`}
          />
        </div>
      </Link>
      <Link
        to={`/pokemon/${pokemon.evolutionID}`}
        className={classes.link}
      >
        <h4>{`#${pokemon.evolutionID}  ${pokemon.name}`}</h4>
      </Link>
    </div>
  );
};

const NoEvolutions = ({ error }) => {
  return <h2>{error ? error : 'This pokemon has no evolution chain'}</h2>;
};

export function Evolutions({ pokemons }) {
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

   // Escucha los cambios de tamaño de la ventana y ajusta el estado
   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth <= 768);
     };

     window.addEventListener('resize', handleResize);
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);

  const hasEvolution = pokemons.evolutions?.length <= 1;
  return (
    <div className={classes.evolution_container}>
      {hasEvolution ? (
        <NoEvolutions />
      ) : (
        <ul className={classes.evolution_chain}>
          {pokemons.evolutions.map((pokemon, index) => (
            <React.Fragment key={pokemon.evolutionID}>
              <li>
                <EvolutionCards pokemon={pokemon} />
              </li>
              {index < pokemons.evolutions.length - 1 && (
                <li className={classes.arrow_container}>
                  <FontAwesomeIcon
                    className={classes.arrow}
                    icon={isMobile ? faAnglesDown : faAnglesRight}
                    size='2xl'
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
