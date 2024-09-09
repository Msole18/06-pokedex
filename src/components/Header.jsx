import pokeLogo from '../assets/pokemon-logo.svg'
import css from './Header.module.css'

export function Header() {

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }
  return (
    <header className={css.header}>
      <img
        className={css.logo}
        src={pokeLogo}
        alt='pokemon logo'
      />
      <form
        onSubmit={handleSubmit}
        className='form'
      >
        <input
          type='text'
          placeholder='Pikachu, 18, Charizar...'
        />
        <button
          type='submit'
        >
          Search
        </button>
      </form>
    </header>
  );
}
