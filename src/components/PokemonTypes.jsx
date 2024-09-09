import Icon from './Icon';
import css from './PokemonTypes.module.css';

const colorType = {
  bug: '#91A119',
  dark: '#624D4E',
  dragon: '#5060E1',
  electric: '#FAC000',
  fairy: '#EF70EF',
  fighting: '#FF8000',
  fire: '#E62829',
  flying: '#81B9EF',
  ghost: '#704170',
  grass: '#3FA129',
  ground: '#915121',
  ice: '#3DCEF3',
  normal: '#9FA19F',
  poison: '#9141CB',
  phychic: '#EF4179',
  rock: '#AFA981',
  steel: '#60A1B8',
  water: '#2980EF',
};

export function PokemonTypes({ type }) {
  return (
    <div
      style={{ backgroundColor: colorType[type] }}
      className={css.container}
    >
      <Icon type={type} />
      <p>{type}</p>
    </div>
  );
}
