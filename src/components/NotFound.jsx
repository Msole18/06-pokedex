import pokeNotFound from '../assets/pokemon-not-found.webp'
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    
      <main className={classes.main}>
        <img className={classes.not_found_image} src={pokeNotFound} alt="pokemon not found image" />
        <div className={classes.not_found_container} >
          <h1 className={classes.not_found_title} >404</h1>
          <p className={classes.not_found_message} >Oops! The page you are looking for was not found.</p>
          <Link to="/" className={classes.not_found_link}  >
            Back to main page
          </Link>
        </div>
      </main>
  )
}
