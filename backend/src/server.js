const http = require('http')
const env = require('./config/env')
const app = require('./app/app')
const { connectDatabase, disconnectDatabase } = require('./config/db')

const server = http.createServer(app)

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`)

  server.close(async () => {
    try {
      await disconnectDatabase()
    } catch (error) {
      console.error('Database disconnect failed', error)
    } finally {
      process.exit(0)
    }
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection', error)
  shutdown('UNHANDLED_REJECTION')
})
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception', error)
  shutdown('UNCAUGHT_EXCEPTION')
})

const startServer = async () => {
  try {
    await connectDatabase()
    server.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`)
    })
  } catch (error) {
    console.error('Startup failed', error)
    process.exit(1)
  }
}

startServer()
