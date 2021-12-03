import Country from './Country';

function CountryList({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.name} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
