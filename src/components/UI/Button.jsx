import classes from './Button.module.css'
import { Icon } from './Icon';

export function Button({ type }) {
  return (
    <div className={classes.container}>
      <div className={classes.icon_container}>
        <Icon type={type} />
      </div>
      <p>{type}</p>
    </div>
  );
}