/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyReply } from "fastify";
import weatherService from "../services";
import { WeatherRequest } from "./types";

const WeatherController = (fastify: FastifyInstance) => {
  const getWeather = async (
    request: WeatherRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> => {
    try {
      const config = fastify.config;
      const response = await weatherService(request.query, config);
      return reply.send(response);
    } catch (err: any) {
      return reply.code(err.data.cod).send({
        status: err.data.cod,
        title: err.data.message,
      });
    }
  };
  return { getWeather };
};

export default WeatherController;
