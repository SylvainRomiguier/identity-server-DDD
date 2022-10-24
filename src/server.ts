import fastify from "fastify";

const server = fastify({ logger: true });

server.route({
  method: "GET",
  url: "/",
  handler: async (req, res) => {
    res.code(200).send("OK all works well !");
  },
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
