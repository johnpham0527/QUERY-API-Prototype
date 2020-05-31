const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Library = new Schema({
  // schema fields here 
  name: { type: String, required: true },
  address: { type: String, required: true },
  programs: {
    type: [Schema.Types.ObjectId], required: true, refPath: "programs"
  }

}, {
  timestamps: true
})

module.exports = mongoose.model("libraries", Library)