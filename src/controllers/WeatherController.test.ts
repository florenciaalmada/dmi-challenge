/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";

import WeatherController from "./WeatherController";

const fastify = {
  config: {
    PORT: "3000",
    OPENWEATHER_API_KEY: "195cf1ea08c82d2d9c1ad85d735316a1",
    OPENWEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5/",
  },
} as FastifyInstance;

describe("Weather Controller", () => {
  const weatherController = WeatherController(fastify);
  let request: any;
  let reply: any;

  beforeEach(() => {
    request = {
      headers: {},
      body: {},
      params: {},
      query: { lat: "-33.1231585", lon: "-64.3493441" },
    };

    reply = {
      code: jest.fn((code) => {
        return {
          send: (data: any) => {
            return { statusCode: code, body: data };
          },
        };
      }),
      send: jest.fn((data) => {
        return { statusCode: 200, body: data };
      }),
    };
  });

  describe("if request is succesfull", () => {
    let result: any;
    beforeEach(async () => {
      result = await weatherController.getWeather(request, reply);
    });
    it("should return a boolean", async () => {
      expect(typeof result.body).toBe("boolean");
    });
  });

  describe("if lat or lon are invalid numbers", () => {
    let result: any;
    beforeEach(async () => {
      request = {
        headers: {},
        body: {},
        params: {},
        query: { lat: "1", lon: "23523490502435245" },
      };
      result = await weatherController.getWeather(request, reply);
    });
    it("should throw an error with status 400", async () => {
      expect(result.body.status).toEqual("400");
    });
    it("should throw an error with message 'wrong longitude'", async () => {
      expect(result.body.title).toEqual("wrong longitude");
    });
  });
  describe("if lat or lon are not sent", () => {
    let result: any;
    beforeEach(async () => {
      request = {
        headers: {},
        body: {},
        params: {},
        query: { test: "test" },
      };
      result = await weatherController.getWeather(request, reply);
    });
    it("should throw an error with status 400", async () => {
      console.log(result);
      console.log(result);
      expect(result.body.status).toEqual("400");
    });
  });
});
