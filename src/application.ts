import fastify, { FastifyInstance } from "fastify";
import routes from "./routes/index";
import fastifyEnvConfig from "./plugins/config/index";

function index(): FastifyInstance {
  const Fastify = fastify({ logger: true });
  Fastify.register(routes);
  Fastify.register(fastifyEnvConfig);
  return Fastify;
}

export default index;
