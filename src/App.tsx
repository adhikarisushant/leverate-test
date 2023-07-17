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

  console.log("all countries", typeof countries, countries);

  // age calculate
  const calculateAge = (dob: string): number => {
    const interval = intervalToDuration({
      start: new Date(dob),
      end: new Date(),
    })

    return interval.years ? interval.years : 0
  }


  // Function to modify arrayA
// function modifyArrayA(arrA, arrB) {
//   // Create a mapping of country codes to country objects
//   var countryMap = {};
//   for (var i = 0; i < arrB.length; i++) {
//     var country = arrB[i];
//     countryMap[country.alpha2Code] = country;
//   }
  
//   // Modify arrayA objects
//   for (var j = 0; j < arrA.length; j++) {
//     var obj = arrA[j];
//     var countryCode = obj.alpha2Code;
//     var countryObj = countryMap[countryCode];
    
//     if (countryObj) {
//       obj.country_name = countryObj.country_name;
//       obj.image = countryObj.flag;
//     }
//   }
  
//   return arrA;
// }

// // Call the function and log the modified arrayA
// var modifiedArrayA = modifyArrayA(people?.searchResults, countries?.searchResults);
// console.log("modifiedArrayA", modifiedArrayA);

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
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

        <div style={{display: 'flex', flexDirection: 'column'}}>
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
          {people?.searchResults.map((item) =>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} key={item.id}>
              <p>{item.first_name} {item.last_name}</p>
              <p>{calculateAge(item.date_of_birth)} years</p>
              {/* <img className="flag" height={50} src="Flag src" alt="Flag alt" /> */}
              <p>{item.country}</p>
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
