const mongoose = require('mongoose')
const env = require('./env')

const connectDatabase = async () => {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is not set')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri)
}

const disconnectDatabase = async () => {
  await mongoose.disconnect()
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}
