import { FastifyInstance } from "fastify";
import WeatherController from "../controllers/WeatherController";
import weatherSchema from "../schemas";

export default async (fastify: FastifyInstance): Promise<void> => {
  const weatherController = WeatherController(fastify);

  fastify.route({
    method: "GET",
    url: "/weather",
    schema: weatherSchema,
    handler: weatherController.getWeather,
  });
};
