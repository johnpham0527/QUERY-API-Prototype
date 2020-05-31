const db = require("../db")
const Library = require("../models/libraries")
const Program = require("../models/programs")
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

// when asked for a library's programs
// based on params.libraryName
// we parse the library name (case insensitive and replace dashes or underscores with spaces)
// then when we find the library we can use populate on library.programs 
// https://mongoosejs.com/docs/populate.html

// Get all programs for a library
async function getLibraryPrograms(req, res) {
  try {
    const libName = req.params.libraryName.split('-').join(' ').split('_').join(' ')

    // use regex to do case insensitive find 
    const libraries = await Library.findOne({ name: { '$regex': libName, '$options': 'i' } })

    // we would do this with .populate() but I wasn't able to populate 
    // object ids in an array so we will have to do it the hard way 
    const programs = []
    for (let i = 0; i < libraries.programs.length; i++) {
      const prog = await Program.find({ "_id": libraries.programs[i] })
      programs.push(prog)
    }

    res.json(programs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getLibraries, getLibraryPrograms
}