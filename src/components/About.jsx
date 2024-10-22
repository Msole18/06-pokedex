import classes from './About.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandFist,
  faRulerVertical,
  faTree,
  faWeightHanging,
} from '@fortawesome/free-solid-svg-icons';

export function About ({pokemon}) {
  return (
    <>
      <div className={classes.about_container}>
        <div className={classes.about}>
          <div className={classes.features}>
            <span className={classes.info}>
              <h3>{`Height`}</h3>
              <FontAwesomeIcon
                className={classes.icon}
                icon={faRulerVertical}
                size='xl'
              />
              {`${(pokemon.height * 0.1).toFixed(1)} m`}
            </span>
          </div>

          <div className={classes.features}>
            <span className={classes.info}>
              <h3>{`Weight`}</h3>
              <FontAwesomeIcon
                className={classes.icon}
                icon={faWeightHanging}
                size='xl'
              />
              {`${(pokemon.weight * 0.1).toFixed(1)} Kg`}
            </span>
          </div>
          {/* </div> */}

          {/* <div className={classes.about}> */}
          <div className={classes.features}>
            <span className={classes.info}>
              <h3>{`Habitat`}</h3>
              <FontAwesomeIcon
                className={classes.icon}
                icon={faTree}
                size='xl'
              />
              {`${pokemon.habitat}`}
            </span>
          </div>
        </div>
        
        <div className={classes.features}>
          <span className={classes.info}>
            <h3>{`Abilities:`}</h3>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faHandFist}
              size='xl'
            />
            <ul className={classes.abilities}>
              {pokemon.abilities.map((abilities) => (
                <li key={abilities.ability.name}>
                  <span>{`${abilities.ability.name}`}</span>
                </li>
              ))}
            </ul>
          </span>
        </div>
        <div className={classes.description}>
          <span className={classes.info}>
            <h3>{`Description`}</h3>
            <p className={classes.text_description}>{`${pokemon.flavorText}`}</p>
          </span>
        </div>
      </div>
    </>
  );
}
