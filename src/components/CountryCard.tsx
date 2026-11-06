import type {Country} from "../types/country"

interface CountryCardProps {
  country: Country,
  handleViewDetails: (country: Country) => void
}

const CountryCard = ({country, handleViewDetails}: CountryCardProps) => {
  
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Country Flag */}
      <div className="flex h-44 items-center justify-center overflow-hidden bg-gray-100 p-4">
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
      <div className="p-5">
        <div className="flex justify-between mb-4 ">
          <h2 className="text-xl font-bold text-gray-900">
            {country.names.common}
          </h2>
          <span className="bg-blue-100 p-2 rounded text-xs font-bold text-gray-800 inline-block">
            {country.capitals.map((capital) => capital.name).join(", ") ||
              "N/A"}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Capital:</span>{" "}
            <span className="font-bold">
              {country.capitals.map((capital) => capital.name).join(", ") ||
                "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Population:</span>{" "}
            <span className="font-bold">
              {country.population.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Languages:</span>{" "}
            <span className="font-bold">
              {country.languages.map((language) => language.name).join(", ") ||
                "N/A"}
            </span>
          </div>

          {/* <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Region:</span>{" "}
                <span className="font-bold">{country.region}</span>
            </div> */}

          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">Country codes:</span>{" "}
            <span className="font-bold">
              {country.codes.alpha_2} / {country.codes.alpha_3}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">
              Official country name:
            </span>{" "}
            <span className="font-bold">{country.names.official}</span>
          </div>


        </div>
        </div>
        <div className="my-2 text-center">
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer" onClick={() => handleViewDetails(country)}>
            View Details
          </button>
        </div>
    </div>
  )
}

export default CountryCard
