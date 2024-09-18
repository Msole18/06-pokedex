import classes from './Button.module.css'

export function Button({ children, className, onClick, title }) {
  return (
    <div
      className={`${classes.button} ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
}