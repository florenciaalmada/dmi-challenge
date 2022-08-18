import axios from "axios";
import { getTemp, weatherService } from ".";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const config = {
  PORT: "3000",
  OPENWEATHER_API_KEY: "195cf1ea08c82d2d9c1ad85d735316a1",
  OPENWEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5/",
};

describe("getTemp Function", () => {
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
  describe("when API call isn't successful", () => {
    it("should throw an Error", async () => {
      const lat = "-3";
      const lon = "-6";
      try {
        mockedAxios.get.mockRejectedValueOnce(new Error("error"));
        await getTemp(lat, lon, config);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }
    });
  });
});

describe("weatherService Function", () => {
  describe("when function is called", () => {
    it("if there's no tempToCompare parameter, should compare to default temp wich is 15", async () => {
      const temp = "5";
      const result = weatherService(temp);
      expect(result).toBe(false);
    });
    it("if there's tempToCompare parameter, should use it to compare", async () => {
      const temp = "5";
      const tempToCompare = "2";
      const result = weatherService(temp, tempToCompare);
      expect(result).toBe(true);
    });
  });
});
