import { FastifyInstance } from "fastify";
import application from "./application";

const start = async () => {
  const fastify: FastifyInstance = await application();
  await fastify.ready();

  const PORT = +fastify.config?.PORT || 3000;

  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
