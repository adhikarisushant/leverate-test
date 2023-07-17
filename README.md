# React Interview Task

Write a app that use the data api and shows a list of people filtered by the search input with the data below.

- People result will be filtered by name or country.
- Filter must be trigger while user inputing data and not with submitting button.
- Request to server must be performance optimize and efficent.

## Assumptions:

- Countries doesn't change often.
- We doesn't want to pay more then o(1) on country searching.

## Search result should contains:

- Full name
- Age
- Country Full Name

_Hint - there is linkage between data structures_

## Api Usage

```typescript
import { getCountries, getPeople } from "./DataApi";

const searchCountries = async (search?: string) => {
  const result = await getCountries({ search });
  console.log(result);
};

const searchPeople = async (search?: string) => {
  const result = await getPeople({ search });
  console.log(result);
};

searchCountries(); // Print all countries
searchCountries("ISR"); // Print selected countries
searchPeople(); // Print all people
searchPeople("David"); // Print selected people
```
