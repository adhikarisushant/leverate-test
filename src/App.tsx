import { GetCounriesResponse } from "DataApi/country.interface";
import { GetPeopleResponse } from "DataApi/people.interface";
import React, { useState, useEffect } from "react";
import { getCountries, getPeople } from "./DataApi";
import { intervalToDuration } from "date-fns"

const App: React.FunctionComponent = () => {

  const [people, setPeople] = useState<GetPeopleResponse>();
  const [countries, setCountries] = useState<GetCounriesResponse>();

  const searchPeople = async (search?: string) => {
    const result = await getPeople({ search });
    setPeople(result);
  };

  const searchCountries = async (search?: string) => {
    const result = await getCountries({ search });
    setCountries(result);
  };

  useEffect(() => {
    searchPeople();
    searchCountries();
  }, []);


  // age calculate
  const calculateAge = (dob: string): number => {
    const interval = intervalToDuration({
      start: new Date(dob),
      end: new Date(),
    })

    return interval.years ? interval.years : 0
  }


  // Create a lookup object for countries
  const countriesLookup = {};
  countries?.searchResults.forEach(country => {
    countriesLookup[country.alpha2Code] = {
      country_name: country.name,
      flag: country.flag
    };
  });

  // Modify the people array to include country information
  const modifiedPeople = people?.searchResults.map(person => ({
    ...person,
    ...countriesLookup[person.country]
  }));

  const hasData = Boolean(people) && Boolean(countries);

  const modifyArr = hasData && modifiedPeople;

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="name">Name</label>
          <input
            style={{ minHeight: '50px', minWidth: '340px' }}
            type="text"
            id="name"
            name="name"
            placeholder="Search By Name..."
            onChange={(e) => searchPeople(e.target.value.toLowerCase())}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="country">Country</label>
          <select
            style={{ minHeight: '50px', minWidth: '340px' }}
            id="country"
            name="country"
            onChange={(e) => searchPeople(e.target.value)}
          >
            <option value="">All</option>
            {countries?.searchResults.map((country) =>
              <option key={country.alpha3Code} value={country.alpha3Code}>{country.name}</option>
            )}

          </select>
        </div>


      </div>


      <p>List Component</p>

      <div className="listWrapper">
        <div>
          {modifyArr && modifyArr.map((item) =>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} key={item.id}>
              <p>{item.first_name} {item.last_name}</p>
              <p>{calculateAge(item.date_of_birth)} years</p>
              <p>{item.country_name}</p>
            </div>
          )}


        </div>
      </div>
      <p>Found results: {people?.searchResultCount}</p>
      <p>Total results: {people?.totalResultCounter}</p>
    </div>
  );
};

export default App;
