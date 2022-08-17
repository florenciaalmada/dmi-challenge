import axios from "axios";
import { URL } from "url";
import { DEFAULT_TEMP_TO_COMPARE } from "./constants";
import { LatLonData, WeatherConfig, WeatherService } from "./types";

export const getTemp = async (
  lat: string,
  lon: string,
  config: WeatherConfig
) => {
  const url = new URL(
    `/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${config.OPENWEATHER_API_KEY}`,
    config.OPENWEATHER_BASE_URL
  );
  const response = await axios.get(url.href);
  return response;
};

const weatherService: WeatherService = async (
  data: LatLonData,
  config: WeatherConfig
) => {
  try {
    const { lat, lon, tempToCompare } = data;
    const response = await getTemp(lat, lon, config);
    const temp = response.data?.current?.temp;

    if (!tempToCompare) {
      return DEFAULT_TEMP_TO_COMPARE > temp;
    }
    return tempToCompare > temp;
  } catch (err) {
    console.log(err);
  }
};

export default weatherService;
