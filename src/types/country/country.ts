export interface CountryNames {
    common: string;
    official: string;
} 

export interface CountryFlag {
    emoji: string;
    url_svg: string;
    url_png: string;
} 

export interface CountryCodes {
    alpha_2 : string;
    alpha_3 : string;
    ccn3: string;
    fifa: string;
    cioc: string;
}

export interface CapitalCoordinates {
    lat: number;
    lng: number;
}

export interface Capital {
    name: string;
    primary: boolean;
    coordinates: CapitalCoordinates;
}

export interface Language {
    name: string;
    bcp47: string;
}

export interface Country {
    names: CountryNames;
    flag: CountryFlag;
    codes: CountryCodes;
    capitals: Capital[];
    languages: Language[];
    region: string;
    population: number;
}

export interface CountriesApiResponse {
    data: {
        objects: Country[];
    }
}