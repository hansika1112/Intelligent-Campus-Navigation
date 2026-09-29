const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      default: ''
    },

    accessibility: {
      type: Boolean,
      default: false
    },

    wheelchairAccess: {
      type: Boolean,
      default: false
    },

    emergency: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Location', locationSchema)
