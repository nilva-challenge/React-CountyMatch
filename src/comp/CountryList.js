// import circle from '../assets/circle.svg';
function CountryList({ countries }) {
  return (
    <>
      {countries.map((country) => (
        <>
          {/* <img src={circle} alt="circle" /> */}
          <h1 key={country.name} className="countrylist__name">
            {country.name}
          </h1>
        </>
      ))}
    </>
  );
}

export default CountryList;
