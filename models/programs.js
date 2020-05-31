const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Program = new Schema({
  // schema fields here 
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  library: { type: Schema.Types.ObjectId, required: true },
  libraryName: { type: String, required: true },
  category: { type: String, required: true },
  attendees: {
    type: {
      childrenAttendees: Number,
      teenAttendees: Number,
      adultAttendees: Number,
      seniorAttendees: Number
    }, required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("programs", Program)