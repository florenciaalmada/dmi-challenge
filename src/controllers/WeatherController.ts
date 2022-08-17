import { FastifyInstance, FastifyReply } from "fastify";
import weatherService from "../services";
import { WeatherRequest } from "./types";

const WeatherController = async (
  request: WeatherRequest,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  try {
    const response = await weatherService(request.query);
    return reply.send(response);
  } catch (err: any) {
    return reply.code(err.data.cod).send({
      status: err.data.cod,
      title: err.data.message,
    });
  }
};
export default WeatherController;

