import { useEffect, useState } from 'react';
import CountryList from './comp/CountryList';
import { useFetch } from './hooks/useFetch';

function App() {
  const [borderCt, setBorderCt] = useState([]);

  // fetching data from custom hook
  const {
    data: countries,
    isFeching,
    error,
  } = useFetch('https://travelbriefing.org/countries.json');

  // finding matched countries
  useEffect(() => {
    if (countries) {
      let matualCount = [];
      const findIt = (...para) => {
        para.forEach((par) => {
          countries.forEach((el) => {
            if (el.neighbors.includes(par.name)) {
              if (
                !matualCount.includes([el.name, par.name].join(' and ')) &&
                !matualCount.includes([par.name, el.name].join(' and '))
              ) {
                matualCount.push([par.name, el.name].join(' and '));
              }
            }
          });
        });
      };

      findIt(...countries);
      setBorderCt(matualCount);
    }
  }, [countries]);
  return (
    <div className="app">
      <h1 className="app__title">County Match</h1>
      <div className="app__country">
        {isFeching && <h2>Loading ...</h2>}
        {error && <h2>{error}</h2>}
        {countries && <CountryList countries={countries} />}
      </div>
      <div className="app__matual">
        <h2 className="app__matual-title">Matual Country</h2>
        {borderCt.length > 0 ? (
          <div className="app__matual-wrapper">
            {borderCt.map((el) => (
              <h2 className="app__matual-country" key={el}>
                {el}.
              </h2>
            ))}
          </div>
        ) : (
          <h2 className="app__matual-nomatch">No Matual Country.</h2>
        )}
      </div>
    </div>
  );
}

export default App;
