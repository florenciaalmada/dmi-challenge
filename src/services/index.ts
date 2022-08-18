import axios from "axios";
import { URL } from "url";
import { DEFAULT_TEMP_TO_COMPARE } from "./constants";
import { WeatherConfig, WeatherService } from "./types";

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

export const weatherService: WeatherService = (
  temp: string,
  tempToCompare?: string
) => {
  if (!tempToCompare) {
    return Number(temp) > DEFAULT_TEMP_TO_COMPARE;
  }
  return Number(temp) > Number(tempToCompare);
};
