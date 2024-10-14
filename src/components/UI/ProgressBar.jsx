import classes from './ProgressBar.module.css';

export function ProgressBar({ name, value }) {
  return (
    <div className={classes.label_container}>
      <div className={classes.name_label}>
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <div className={classes.progress_bar}>
        <div
          className={classes.progress_bar_fill}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
