/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyReply } from "fastify";
import { getTemp, weatherService } from "../services";
import { WeatherRequest } from "./types";

const WeatherController = (fastify: FastifyInstance) => {
  const getWeather = async (
    request: WeatherRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    try {
      const config = fastify.config;
      const { lat, lon, tempToCompare } = request.query;
      const responseTempData = await getTemp(config, lat, lon);
      const temp = responseTempData.data.current.temp;
      const response = weatherService(temp, tempToCompare);
      return reply.send(response);
    } catch (err: any) {
      return reply.code(err.response.data.cod).send({
        status: err.response.data.cod,
        title: err.response.data.message,
      });
    }
  };
  return { getWeather };
};

export default WeatherController;
