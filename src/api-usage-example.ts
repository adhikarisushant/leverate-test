import { getCountries, getPeople} from './DataApi';

const searchCountries = async (search?: string) => {
    const result = await getCountries({ search });
    console.log(result)
}

const searchPeople = async (search?: string) => {
    const result = await getPeople({ search });
    console.log(result)
}

searchCountries() // Print all countries
searchCountries('ISR') // Print selected countries
searchPeople() // Print all people
searchPeople('David') // Print selected people