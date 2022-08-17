export type LatLonData = {
  lat: string;
  lon: string;
  tempToCompare?: string;
};

export type WeatherService = (data: LatLonData) => Promise<boolean | undefined>;
