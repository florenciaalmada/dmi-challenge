import NodeCache from "node-cache";
import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { cacheTTL, CACHE_MESSAGES, HTTP_METHODS } from "./constants";

const cache = new NodeCache();

export default fastifyPlugin(
  (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ) => {
    cache.on("expired", () => {
      fastify.log.info(CACHE_MESSAGES.EXPIRED_CACHE);
    });

    fastify.addHook("onRequest", async (request, reply) => {
      if (request.method === HTTP_METHODS.GET) {
        const response = cache.get(request.url);
        if (response) {
          reply.code(200).send(response);
        }
      }
    });

    fastify.addHook("onSend", (request, reply, payload, done) => {
      if (request.method === HTTP_METHODS.GET) {
        const response = cache.get(request.url);
        if (!response) {
          cache.set(request.url, payload, cacheTTL);
        }
      }
      done();
    });
    next();
  }
);
