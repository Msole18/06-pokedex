import classes from './DetailsCard.module.css';
import { Card } from './UI/Card';

export function DetailsCard({children, title, className }) {
  return (
    <Card className={`${classes.card} ${className}`}>
      <section className={`${classes.cards_section}`}>
        <h2 className={classes.cards_name_container}>{title}</h2>
        {children}
      </section>
    </Card>
  );
}
