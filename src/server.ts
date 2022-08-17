import application from "./application";

const fastify = application();

const PORT: any = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({port: PORT});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
