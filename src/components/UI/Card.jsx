import classes from './Card.module.css';

export function Card({children, className}) {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}