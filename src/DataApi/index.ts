import {
  Country,
  GetCounriesRequest,
  GetCounriesResponse,
} from "./country.interface";
import { GetPeopleRequest, GetPeopleResponse } from "./people.interface";
import countriesData from "./country.data.json";
import peopleData from "./people.data.json";

const searchCountryParameters = [
  "name",
  "alpha2Code",
  "alpha3Code",
  "capital",
  "nativeName",
  "region",
];

const getCountries: (
  req: GetCounriesRequest
) => Promise<GetCounriesResponse> = async ({ search }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!search)
        return resolve({
          searchResults: countriesData,
          searchResultCount: countriesData.length,
          totalResultCounter: countriesData.length,
        });
      const nameAsLowerCase = search.toLowerCase();

      const filteredData = countriesData.filter((row: any) => {
        return searchCountryParameters.some((parameter) =>
          row[parameter].toLowerCase().includes(nameAsLowerCase)
        );
      });
      return resolve({
        searchResults: filteredData,
        searchResultCount: filteredData.length,
        totalResultCounter: countriesData.length,
      });
    }, (Math.random() * 1 + 1) * 1000);
  });
};

const getPeople: (
  req: GetPeopleRequest
) => Promise<GetPeopleResponse> = async ({ search }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!search)
        return resolve({
          searchResults: peopleData,
          searchResultCount: peopleData.length,
          totalResultCounter: peopleData.length,
        });
      const nameAsLowerCase = search.toLowerCase();
      const filteredData = peopleData.filter((row) => {
        const foundInFullName =
          `${row.first_name.toLowerCase()} ${row.last_name.toLowerCase()}`.includes(
            nameAsLowerCase
          );
        return foundInFullName;
      });
      return resolve({
        searchResults: filteredData,
        searchResultCount: filteredData.length,
        totalResultCounter: peopleData.length,
      });
    }, (Math.random() * 1 + 1) * 1000);
  });
};

export { getCountries, getPeople };
