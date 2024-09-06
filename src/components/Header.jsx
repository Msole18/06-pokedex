import pokeLogo from '../assets/pokemon-logo.svg'
import css from './Header.module.css'

export function Header() {
  return (
    <header className={css.header}>
        <img
          className={css.logo}
          src={pokeLogo}
          alt='pokemon logo'
        />
      <form className='form'>
        <input
          type='text'
          placeholder='Pikachu, 18, Charizar...'
        />
        <button type='submit'>Search</button>
      </form>
    </header>
  );
}
