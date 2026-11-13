
import { createContext, useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import type { Country } from "../types/country.ts";
import { getCountries } from "../services/countryServices.ts";

interface CountryContextType {
    countryData: Country[];
    loading: boolean;
    error: string | null;
}

export const CountryContext = createContext<CountryContextType | undefined>(
    undefined
);

export const CountryProvider = ({ children }: PropsWithChildren) => {
    const [countryData, setCountryData] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await getCountries();
                setCountryData(response);
            } catch (error) {
                console.error("Error fetching country data:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch countries"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, []);

    return (
        <CountryContext.Provider value={{ countryData, loading, error }}>
            {children}
        </CountryContext.Provider>
    );
};
