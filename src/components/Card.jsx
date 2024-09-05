import classes from './Card.module.css'

export function Card (props) {
  return (
    // eslint-disable-next-line react/prop-types
    <div className={classes.card} >{props.children}</div>
  )
}