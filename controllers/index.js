const db = require("../db")
const Library = require("../models/libraries")
require("dotenv").config()

db.on("error", console.error.bind(console, "MongoDB Connection Error:"))

// Get all events
async function getLibraries(req, res) {
  try {
    const libraries = await Library.find()

    // we want to only return the name and id 
    libNames = libraries.map(lib => {
      return {
        _id: lib['_id'],
        name: lib.name
      }
    })

    res.json(libNames)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}




module.exports = {
  getLibraries
}