import { FastifyInstance, FastifyReply } from "fastify";
import weatherService from "../services";
import { WeatherRequest } from "./types";

const WeatherController = async (
  request: WeatherRequest,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const response = await weatherService(request.query);
    return reply.send(response);
  } catch (err: any) {
    return reply.code(err.response.data.cod).send({
      status: err.response.data.cod,
      title: err.response.data.message,
    });
  }
};
export default WeatherController;
