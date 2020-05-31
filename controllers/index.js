const db = require("../db")
const Library = require("../models/libraries")
require("dotenv").config()

db.on("error", console.error.bind(console, "MongoDB Connection Error:"))

// Get all events
async function getLibraries(req, res) {
  try {
    const libraries = await Library.find()

    res.json(libraries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}




module.exports = {
  getLibraries
}