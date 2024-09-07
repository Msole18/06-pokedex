import Icon from './Icon';
import css from './PokemonTypes.module.css'


export function PokemonTypes({type}) {
  return (
    <div className={css.container}>
      <Icon type={type} />
      <p>{type}</p>
    </div>
  );
}