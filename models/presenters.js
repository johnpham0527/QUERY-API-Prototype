const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Presenter = new Schema({
  // schema fields here 
  name: { type: String, required: true }

}, {
  timestamps: true
})

module.exports = mongoose.model("presenters", Presenter)