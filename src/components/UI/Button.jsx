import classes from './Button.module.css'
import { Icon } from './Icon';

export function Button({ name, icon, onClick }) {
  return (
    <div
      className={classes.container}
      onClick={onClick}
    >
      <div className={classes.icon_container}>
        <Icon type={icon} />
      </div>
      <p>{name}</p>
    </div>
  );
}