import axios from "axios"
import type {CountriesApiResponse} from "../types/country"
import type {Country} from "../types/country"

const BASE_URL = "https://api.restcountries.com/countries/v5"

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<CountriesApiResponse>(BASE_URL, {
      headers: {
        Authorization: "Bearer rc_live_ad7331a2410447afbb4830e2c07ae62b",
      },
    })
    return response.data.data.objects
  } catch (error) {
    console.error("Error fetching countries:", error)
    // if (axios.isAxiosError(error)) {
    //   console.log("Status:", error.response?.status)
    //   console.log("API Error:", error.response?.data)
    // }
    throw error
  }
}
