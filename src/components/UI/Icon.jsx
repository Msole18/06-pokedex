import classes from './Icon.module.css';
import { useIcon } from '../../hooks/useIcon';

export function Icon({ type, className }) {
  const { icon } = useIcon({ type });

  return (
    <div className={`${classes.icon_container} ${className}`}>
      <img
        src={icon}
        alt={type}
      />
    </div>
  );
}
