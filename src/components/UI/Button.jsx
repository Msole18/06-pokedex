import classes from './Button.module.css'

export function Button({ children, className, onClick, type = 'button', title }) {
  return (
    <button
      className={`${classes.button} ${className}`}
      onClick={onClick}
      type={type}
      title={title}
    >
      {children}
    </button>
  );
}