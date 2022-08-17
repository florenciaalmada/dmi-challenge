import axios from "axios";
import { DEFAULT_TEMP_TO_COMPARE } from "./constants";
import { LatLonData, WeatherService } from "./types";
const getTemp = async (lat: string, lon: string) => {
  const path = `${process.env.OPENWEATHER_BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
  const response = await axios.get(path);
  const temp = response.data?.current?.temp;
  return temp;
};

const weatherService: WeatherService = async (data: LatLonData) => {
  try {
    const { lat, lon, tempToCompare } = data;
    const temp = await getTemp(lat, lon);
    if (!tempToCompare) {
      return DEFAULT_TEMP_TO_COMPARE > temp;
    }
    return tempToCompare > temp;
  } catch (err) {
    console.log(err);
  }
};

export default weatherService;
