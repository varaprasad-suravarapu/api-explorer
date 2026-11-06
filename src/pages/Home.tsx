import {useEffect, useState} from "react"
import CountryCard from "../components/CountryCard"
import {useCountries} from "../hooks/useCountries"
import type {Country} from "../types/country"
import Loader from "../components/Loader"
import Header from "../components/Header"
import SearchInput from "../components/SearchInput"
import RegionFilter from "../components/RegionFilter"
import CountryList from "../components/CountryList"
import CountryTable from "../components/CountryTable"
import ViewSelector, {type ViewMode} from "../components/ViewSelector"
import CountryDetails from "../components/CountryDetails"

const Home = () => {
  const {countryData, loading, error} = useCountries()
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [regionTerm, setRegionTerm] = useState<string>("All")
  const [toggleView, setToggleView] = useState<ViewMode>("grid")

  const handleViewDetails = (country: Country) => {
    // setShowPopup(true)
    setSelectedCountry(country)
    console.log(`View details for ${country.population}`)
  }

  const handleClose = () => {
    // setShowPopup(false)
    setSelectedCountry(null)
  }

  useEffect(() => {
    if (!selectedCountry) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedCountry])

  if (loading) {
    return <Loader message="Fetching country information.." />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (countryData.length === 0) {
    return <div>No countries found.</div>
  }

  const regions = [...new Set(countryData.map((country) => country.region))]

  const toggleFilter = () => {
    const filteredData = countryData.filter((country) => {
      const matchesRegion =
        regionTerm === "All" || country.region === regionTerm

      const matchesSearch = country.names.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return matchesRegion && matchesSearch
    })

    return filteredData
  }

  //   const regionFilterData = () => {
  //     const regionfilter = countryData.filter((country) =>
  //         country.region
  //             .toLowerCase()
  //             .includes(regionTerm.toLowerCase()
  //         ))
  //         return regionfilter
  //   }

  //   const searchFilteredData = () => {
  //     const filteredData = countryData.filter((country) =>
  //       country.names.common
  //         .toLocaleLowerCase()
  //         .includes(searchTerm.toLowerCase()),
  //     )
  //     return filteredData
  //   }

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(
            to bottom,
            #4C1D95 0%,
            #701A75 16%,
            #BE123C 32%,
            #EA580C 48%,
            #CA8A04 64%,
            #0F766E 82%,
            #1D4ED8 100%
        )`,
      }}
    >
      {/* Visible dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1.2px, transparent 1.2px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Page Content */}
      <div className="relative z-10">
        <Header />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-7xl p-8 mx-auto h-auto">
          <div className="flex flex-col gap-3 sm:flex-row ">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <RegionFilter
              value={regionTerm}
              onChange={setRegionTerm}
              filters={regions}
            />
          </div>

          <ViewSelector value={toggleView} onChange={setToggleView} />
        </div>

        {toggleView === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 sm:px-6 pt-0 mx-0 md:mx-8">
            {toggleFilter().map((country) => (
              <CountryCard
                key={country.codes.alpha_3}
                country={country}
                handleViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {toggleView === "list" && (
          <div className="flex flex-col gap-4 max-w-7xl mx-auto px-8 sm:px-6 pt-0 ">
            {toggleFilter().map((country) => (
              <CountryList
                key={country.codes.alpha_3}
                country={country}
                handleViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {toggleView === "table" && (
          <div className="flex flex-col gap-4 max-w-7xl mx-auto px-8 sm:px-6 pt-0">
            <CountryTable
              countries={toggleFilter()}
              handleViewDetails={handleViewDetails}
            />
          </div>
        )}

        {/* Country Detaild View */}
        {selectedCountry && (
          <CountryDetails
            selectedCountry={selectedCountry}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default Home
