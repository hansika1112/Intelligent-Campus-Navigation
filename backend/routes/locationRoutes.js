const express = require('express')
const Location = require('../models/Location')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().sort({
      name: 1
    })

    res.json(locations)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch locations',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(
      req.params.id
    )

    if (!location) {
      return res.status(404).json({
        message: 'Location not found'
      })
    }

    res.json(location)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch location',
      error: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const location = await Location.create(req.body)

    res.status(201).json(location)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create location',
      error: error.message
    })
  }
})

module.exports = router
