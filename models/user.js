const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {type: Date, default: Date.now}
}, { versionKey: false })

module.exports = model('User', userSchema)