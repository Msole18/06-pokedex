import css from './Card.module.css'

export function Card(props) {
  return <div className={css.card} >{props.children}</div>
}