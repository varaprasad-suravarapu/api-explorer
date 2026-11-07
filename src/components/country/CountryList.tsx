
import type { Country } from "../../types/country/country";

interface CountryListProps {
    country: Country;
    handleViewDetails: (country: Country) => void;
}

const CountryList = ({ country, handleViewDetails }: CountryListProps) => {
    return (
        <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center">

            {/* Country Flag */}
            <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-lg bg-gray-50 p-3 sm:h-24 sm:w-36">
                <img
                    src={
                        country.flag.url_png ||
                        country.flag.url_svg ||
                        "images/flag-placeholder.png"
                    }
                    alt={`${country.names.common} flag`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </div>

            {/* Country Information */}
            <div className="min-w-0 flex-1">
                <div className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900">
                        {country.names.common}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {country.names.official}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <span className="text-gray-500">Capital: </span>
                        <span className="font-semibold text-gray-800">
                            {country.capitals.map((capital) => capital.name).join(", ") || "N/A"}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500">Region: </span>
                        <span className="font-semibold text-gray-800">
                            {country.region}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500">Population: </span>
                        <span className="font-semibold text-gray-800">
                            {country.population.toLocaleString()}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500">Languages: </span>
                        <span className="font-semibold text-gray-800">
                            {country.languages.map((language) => language.name).join(", ") || "N/A"}
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-500">Country codes: </span>
                        <span className="font-semibold text-gray-800">
                            {country.codes.alpha_2} / {country.codes.alpha_3}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="shrink-0 sm:self-center">
                <button
                    type="button"
                    onClick={() => handleViewDetails(country)}
                    className="w-full cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-700 sm:w-auto"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CountryList;
