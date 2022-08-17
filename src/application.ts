import fastify, { FastifyInstance } from "fastify";
import routes from "./routes/index";
import config from "./plugins/config/index";
import cache from "./plugins/cache/index";

async function index(): Promise<FastifyInstance> {
  const Fastify = fastify({ logger: true });
  Fastify.register(config);
  Fastify.register(routes);
  Fastify.register(cache);
  return Fastify;
}

export default index;
