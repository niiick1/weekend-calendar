let mongoose = require('mongoose')

let eventSchema = mongoose.Schema({
  name: String,
  date: Date
})

let Event = mongoose.model('Event', eventSchema)

module.exports = Event