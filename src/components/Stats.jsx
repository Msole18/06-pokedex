import { ProgressBar } from './UI/ProgressBar';
import classes from './Stats.module.css';

export function Stats({pokemon}) {
  return (
    <div className={classes.stats}>
      <ul>
        {pokemon.stats.map((stats) => (
          <li key={stats.stat.name}>
            <ProgressBar
              key={stats.stat.name}
              name={stats.stat.name}
              value={stats.base_stat}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
