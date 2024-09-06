import css from './PokemonTypes.module.css'

export function PokemonTypes({type}) {
  return (
    <div className={type}>
      {/* <PokemonTypeIcon type={pokemonType} /> */}
      {type}
    </div>
  );
}