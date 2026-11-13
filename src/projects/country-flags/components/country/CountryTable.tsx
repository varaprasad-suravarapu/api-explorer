
import type { Country } from "../../types/country";

interface CountryTableProps {
    countries: Country[];
    handleViewDetails: (country: Country) => void;
}

const CountryTable = ({ countries, handleViewDetails }: CountryTableProps) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">

                {/* Table Header */}
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
                    <tr>
                        <th className="px-5 py-4 font-semibold">Flag</th>
                        <th className="px-5 py-4 font-semibold">Country</th>
                        <th className="px-5 py-4 font-semibold">Capital</th>
                        <th className="px-5 py-4 font-semibold">Region</th>
                        <th className="px-5 py-4 font-semibold">Population</th>
                        <th className="px-5 py-4 font-semibold">Languages</th>
                        <th className="px-5 py-4 font-semibold">Codes</th>
                        <th className="px-5 py-4 text-center font-semibold">Action</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                    {countries.map((country) => (
                        <tr
                            key={country.codes.alpha_3}
                            className="transition-colors hover:bg-blue-50/50"
                        >
                            <td className="px-5 py-3">
                                <img
                                    src={
                                        country.flag.url_png ||
                                        country.flag.url_svg ||
                                        "images/flag-placeholder.png"
                                    }
                                    alt={`${country.names.common} flag`}
                                    className="h-8 w-12 rounded object-contain"
                                    loading="lazy"
                                />
                            </td>

                            <td className="px-5 py-3">
                                <div className="font-semibold text-gray-900">
                                    {country.names.common}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {country.names.official}
                                </div>
                            </td>

                            <td className="px-5 py-3 font-medium text-gray-700">
                                {country.capitals.map((capital) => capital.name).join(", ") || "N/A"}
                            </td>

                            <td className="px-5 py-3">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                    {country.region}
                                </span>
                            </td>

                            <td className="px-5 py-3 font-medium tabular-nums text-gray-700">
                                {country.population.toLocaleString()}
                            </td>

                            <td className="max-w-48 px-5 py-3 text-gray-600">
                                {country.languages.map((language) => language.name).join(", ") || "N/A"}
                            </td>

                            <td className="px-5 py-3 text-gray-600">
                                {country.codes.alpha_2} / {country.codes.alpha_3}
                            </td>

                            <td className="px-5 py-3 text-center">
                                <button
                                    type="button"
                                    onClick={() => handleViewDetails(country)}
                                    className="cursor-pointer whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}

                    {countries.length === 0 && (
                        <tr>
                            <td colSpan={8} className="px-5 py-10 text-center text-gray-500">
                                No countries found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CountryTable;
