const { Router } = require('express')
const { healthRouter } = require('../health/health.routes')

const router = Router()

router.use('/health', healthRouter)

module.exports = router
