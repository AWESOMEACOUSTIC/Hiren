const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('../routes')

const app = express()

app.disable('x-powered-by')
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', routes)
// require all the routes here
const authRouter = require('../routes/auth.routes')

// use the authRouter for all routes starting with /api/auth
app.use("/api/auth", authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = status >= 500 ? 'Internal server error' : err.message

  if (status >= 500) {
    console.error(err)
  }

  res.status(status).json({ message })
})

module.exports = app
