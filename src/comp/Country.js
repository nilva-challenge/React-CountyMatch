import { useFetch } from '../hooks/useFetch';

function Country({ country }) {
  return (
    <div>
      <h2>{country.name}</h2>
    </div>
  );
}

export default Country;
