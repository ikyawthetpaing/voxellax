import data from "@/constants/countries.json";

export type Country = {
  name: string;
  iso2: string;
  currency?: string;
  flag?: string;
  unicodeFlag: string;
  dialCode?: string;
  cities?: string[];
};

type Currency = {
  currency: string;
  countryCode: string;
};

const countries: Country[] = data.data;

function getCountryCities(countryCode: string): string[] {
  for (let { iso2, cities } of countries) {
    if (iso2 === countryCode) {
      if (cities) {
        return cities;
      }
    }
  }
  return [];
}

function getCountryFlag(countryCode: string): string | undefined {
  for (let { flag, iso2 } of countries) {
    if (iso2 === countryCode) {
      return flag;
    }
  }
  return undefined;
}

function getCountryName(countryCode: string): string | undefined {
  for (let { name, iso2 } of countries) {
    if (iso2 === countryCode) {
      return name;
    }
  }
  return undefined;
}

function getCurrencies(): Currency[] {
  const currencies: Currency[] = [];
  countries.map(({ currency, iso2 }) => {
    if (currency) {
      currencies.push({ currency, countryCode: iso2 });
    }
  });
  return currencies;
}

export {
  countries,
  getCountryCities,
  getCountryFlag,
  getCountryName,
  getCurrencies,
};
