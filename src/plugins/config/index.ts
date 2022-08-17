import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

export default fastifyPlugin(
  (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
    next: (error?: FastifyError) => void
  ) => {
    const schema = {
      type: "object",
      required: ["PORT", "OPENWEATHER_BASE_URL", "OPENWEATHER_API_KEY"],
      properties: {
        PORT: {
          type: "string",
          default: 3000,
        },
        OPENWEATHER_API_KEY: {
          type: "string",
        },
        OPENWEATHER_BASE_URL: {
          type: "string",
        },
      },
    };

    const options = {
      confKey: "config", // optional, default: 'config'
      schema: schema,
      dotenv: true, // optional, default: process.env
      data: process.env,
    };

    fastify.register(fastifyEnv, options);

    next();
  }
);
