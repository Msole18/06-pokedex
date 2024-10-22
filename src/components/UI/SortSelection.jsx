import classes from './SortSelection.module.css';

export function SortSelection({ onChange }) {
  return (
    <section className={classes.selection}>
      <label htmlFor='dropdown'>Sort Pokemon by:</label>
      <select
        className={classes.select}
        id='dropdown'
        name='pokemon'
        onChange={onChange}
        defaultValue='increaseId'
      >
        <option value='increaseId'>Number: Low to High</option>
        <option value='decreaseId'>Number: High to Low</option>
        <option value='increaseName'>Name: A-Z</option>
        <option value='decreaseName'>Name: Z-A</option>
      </select>
    </section>
  );
}
