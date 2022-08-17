import { FastifyRequest } from "fastify";
import { LatLonData } from "../services/types";

export type WeatherRequest = FastifyRequest<{
  Querystring: LatLonData;
}>;
