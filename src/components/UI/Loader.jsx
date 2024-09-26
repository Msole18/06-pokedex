import classes from './Loader.module.css'

export function Loader({ className }) {
  return <div className={`${classes.custom_loader} ${className}`}></div>;
}

