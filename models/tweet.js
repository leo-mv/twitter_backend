const User = require('../models/user')
const {Schema, model} = require('mongoose')

const tweetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

module.exports = model('Tweet', tweetSchema)