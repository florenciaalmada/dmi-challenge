export type LatLonData = {
  lat: string;
  lon: string;
  tempToCompare?: string;
};

export type WeatherConfig = {
  PORT: string;
  OPENWEATHER_API_KEY: string;
  OPENWEATHER_BASE_URL: string;
};

export type WeatherService = (
  data: LatLonData,
  config: WeatherConfig
) => Promise<boolean | undefined>;
