import classes from './Footer.module.css'; // Asegúrate de tener este archivo CSS para estilos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareGithub, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
export function Footer() {
  // const { filters } = useFilters()

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.socialLinks}>
          <a
            href='https://www.linkedin.com/in/miguelsole/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size='2xl'
            />
          </a>
          <a
            href='https://github.com/Msole18'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faSquareGithub}
              size='2xl'
            />
          </a>
          <a
            href='https://x.com/Miguelsole'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              icon={faSquareXTwitter}
              size='2xl'
            />
          </a>
        </div>
        <p>&copy; 2024 My Pokédex App.</p>
      </div>
    </footer>
  );
}

