import axios from "axios";
import { FastifyInstance } from "fastify";
import { WeatherRequest } from "../controllers/types";
import WeatherController from "../controllers/WeatherController";
import weatherSchema from "../schemas";

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/weather",
    schema: weatherSchema,
    handler: (request: WeatherRequest, reply)=>{
     WeatherController(request, reply)
    }
  });
};
