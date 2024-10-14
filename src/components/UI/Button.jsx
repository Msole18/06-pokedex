import classes from './Button.module.css'

export function Button({
  children,
  className,
  onClick,
  type = 'button',
  title,
  disabled,
}) {
  return (
    <button
      className={`${classes.button} ${className}`}
      onClick={onClick}
      type={type}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
}