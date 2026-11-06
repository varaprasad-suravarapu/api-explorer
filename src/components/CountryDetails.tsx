import { X } from "lucide-react";
import type { Country } from "../types/country"

interface CountryDetailViewProps {
    selectedCountry: Country;
    handleClose: () => void
}

const CountryDetails = ({selectedCountry, handleClose}:CountryDetailViewProps) => {
  return (
    <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="country-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close country details"
              className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            {/* Country Header */}
            <div className="mb-6 flex flex-col items-center gap-4 text-center">
              <img
                src={
                  selectedCountry.flag.url_png || selectedCountry.flag.url_svg || "/images/flag-placeholder.png"
                }
                alt={`${selectedCountry.names.common} flag`}
                className="h-28 w-44 object-contain"
              />

              <div>
                <h2
                  id="country-modal-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  {selectedCountry.names.common}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedCountry.names.official}
                </p>
              </div>
            </div>

            {/* Country Information */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Capital</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.capitals
                    .map((capital) => capital.name)
                    .join(", ") || "N/A"}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Population</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.population.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Region</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.region}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Languages</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.languages
                    .map((language) => language.name)
                    .join(", ") || "N/A"}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Alpha-2 Code</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.codes.alpha_2 || "N/A"}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Alpha-3 Code</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedCountry.codes.alpha_3 || "N/A"}
                </p>
              </div>
            </div>

            {/* Capital Coordinates */}
            {selectedCountry.capitals.length > 0 && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Capital Coordinates
                </h3>

                <p className="text-sm text-gray-600">
                  Latitude: {selectedCountry.capitals[0].coordinates.lat}
                </p>

                <p className="text-sm text-gray-600">
                  Longitude: {selectedCountry.capitals[0].coordinates.lng}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  )
}

export default CountryDetails