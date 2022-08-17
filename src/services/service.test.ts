import axios from "axios";
import { getTemp } from ".";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const config = {
  PORT: "3000",
  OPENWEATHER_API_KEY: "195cf1ea08c82d2d9c1ad85d735316a1",
  OPENWEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

describe("Get Temperature", () => {
  describe("when API call is successful", () => {
    it("should return temperature value", async () => {
      const temp = "16";
      mockedAxios.get.mockResolvedValue(temp);
      const lat = "-33.13067";
      const lon = "-64.34992";

      const result = await getTemp(lat, lon, config);

      expect(result).toEqual(temp);
    });
  });
});
