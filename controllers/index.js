const db = require("../db")
const Library = require("../models/libraries")
const Program = require("../models/programs")
const Presenter = require("../models/presenters")
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

// Get all presenters
async function getPresenters(req, res) {
  try {
    const presenters = await Presenter.find()

    res.json(presenters)
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

    // we can limit the number of results 
    const limit = req.query.limit

    try {
      if (limit) {
        programs = programs.slice(0, parseInt(limit))
      }
    } catch (er) {
      console.log(er)
    }

    res.json(programs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all programs for a library
// currently copy pasted from getLibraryPrograms
// so theres a chance to efficiently DRY up redundant code 
async function getLibraryProgramsId(req, res) {
  try {
    const libId = req.params.libraryId

    // use regex to do case insensitive find 
    const libraries = await Library.findById(libId)

    // we would do this with .populate() but I wasn't able to populate 
    // object ids in an array so we will have to do it the hard way 
    const programs = []
    for (let i = 0; i < libraries.programs.length; i++) {
      const prog = await Program.find({ "_id": libraries.programs[i] })
      programs.push(prog)
    }

    // we can limit the number of results 
    const limit = req.query.limit

    try {
      if (limit) {
        programs = programs.slice(0, parseInt(limit))
      }
    } catch (er) {
      console.log(er)
    }

    res.json(programs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// post a program 
// need to have an object with all the right schema values in the post body
async function postProgram(req, res) {
  try {
    const newPost = req.body
    // because json cannot transmit a javascript date 
    // we will input an array [Y, M, D, H, M, S]
    newPost.startTime = new Date(...newPost.startTime)

    // we will also grab the correct libraryName with the library id
    const library = await Library.findById(newPost.library)
    newPost.libraryName = library.name

    const program = await new Program(newPost)
    await program.save()

    // we also want to link this in the schema of the library that hosts it
    library.programs.push(program['_id'])
    await library.save()

    res.json(program)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// post a program 
// can spread operator all the object keys that are not nested
async function putProgram(req, res) {
  try {
    const id = req.params.id
    const newProgram = req.body

    // because json cannot transmit a javascript date 
    // we will input an array [Y, M, D, H, M, S]
    newProgram.startTime = new Date(...newProgram.startTime)

    // Currently cannot change which library 
    // the program is linked to. Need to delete and create new program.
    if (newProgram.library) delete newProgram.library
    if (newProgram.libraryName) delete newProgram.libraryName

    // Currently overwriting a key that holds an object removes all the children (so the attendees data)
    // So the quickest way is to grab that object and use spread operator to fill it in 
    const oldProgram = await Program.findById(id)
    newProgram.attendees = {
      ...oldProgram.attendees,
      ...newProgram.attendees
    }

    await Program.findByIdAndUpdate(id, newProgram, { new: true }, (error, program) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!program) {
        return res.status(404).json({ message: "Program not found" })
      }
      res.status(200).json(program)
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getLibraries, getLibraryPrograms, getLibraryProgramsId,
  postProgram, putProgram, getPresenters
}