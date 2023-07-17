export interface GetCounriesRequest {
    search?: string;
  }
  
  export interface GetCounriesResponse {
    searchResults: Country[];
    searchResultCount: number;
    totalResultCounter: number;
  }
  
  export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    currencies: Currency[];
    languages: Language[];
    flag: string;
  }
  
  interface Language {
    code: string;
    name: string;
    nativeName: string;
  }
  
  interface Currency {
    code?: string | null;
    name?: string | null;
    symbol?: string | null;
  }
  