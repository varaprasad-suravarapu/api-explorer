import { useContext } from "react";
import { CountryContext } from "../context/country/CountryContext";

export const useCountries = () => {
    const context = useContext(CountryContext);

    if(context === undefined) {
        throw new Error("useCountries must be used within a CountryProvider");
    }

    return context;
}