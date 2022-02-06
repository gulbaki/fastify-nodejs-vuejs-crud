// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const routes = require('./routes')
const mongoose = require('mongoose')



fastify.register(require('fastify-cors'), { 
  origin: "*",
  methods: ["POST", "PUT", "DELETE", "GET"]
})


// Require external modules


// Connect to DB
mongoose.connect('mongodb+srv://root:root@cluster0.so5im.mongodb.net/cms')
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

routes.forEach((route, index) => {
  fastify.route(route)
})



// Run the server!
const start = async () => {
  try {
    await fastify.listen ( process.env.PORT || 3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()