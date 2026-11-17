const express = require('express')

const router = express.Router()

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000'

router.post('/', async (req, res) => {
  try {
    const response = await fetch(
      `${ML_SERVICE_URL}/predict-crowd`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        signal: AbortSignal.timeout(10000)
      }
    )

    const result = await response.json()

    return res.status(response.status).json(result)
  } catch (error) {
    console.error('Crowd prediction service error:', error.message)

    if (error.name === 'TimeoutError') {
      return res.status(504).json({
        message: 'ML prediction service timed out'
      })
    }

    return res.status(503).json({
      message: 'ML prediction service is unavailable',
      error: error.message
    })
  }
})

module.exports = router
