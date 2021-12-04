function CountryList({ countries }) {
  return (
    <>
      {countries.map((country) => (
        <h1 key={country.name} className="countrylist__name">
          {country.name}
        </h1>
      ))}
    </>
  );
}

export default CountryList;
