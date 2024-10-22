export function NoPokemonsResults({ errorFetch }) {
  console.log(errorFetch)
  return <p>{errorFetch ? errorFetch : 'No pokemons found for this search'}</p>;
}