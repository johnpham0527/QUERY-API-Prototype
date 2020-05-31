const db = require("../db")
const mongoose = require("mongoose")
const Library = require("../models/libraries")
const Presenter = require("../models/presenters")
const Program = require("../models/programs")

db.on("error", console.error.bind(console, "MongoDB Connection Error:"))

// made an id to do ObjectId in programs
// so that we can link our first seeded program 
// this is for testing purposes only
// routes should be made to link (esp editing routes)
const LIB1ID = new mongoose.Types.ObjectId
const PRES1ID = new mongoose.Types.ObjectId
const PROG1ID = new mongoose.Types.ObjectId

// create libraries using the schema and adds them 
const libraries = async () => {
  try {
    await Library.deleteMany()

    const libraries = [{
      _id: LIB1ID,
      name: "Queens Public Library at Forest Hills",
      address: "108-19 71st Ave, Forest Hills, NY 11375",
      programs: [PROG1ID]
    }]

    await Library.insertMany(libraries)
    console.log("Seeded initial libraries!")

  } catch (er) {
    console.log(er)
  }
}

// create presenters using the schema and adds them 
const presenters = async () => {
  try {
    await Presenter.deleteMany()

    const presenters = [{
      _id: PRES1ID,
      name: "John Pham"
    }]

    await Presenter.insertMany(presenters)
    console.log("Seeded initial presenters!")

  } catch (er) {
    console.log(er)
  }
}

// create programs using the schema and adds them 
const programs = async () => {
  try {
    await Program.deleteMany()

    const programs = [{
      _id: PROG1ID,
      // ways to define date 
      // new Date('December 17, 1995 03:24:00')
      // new Date('1995-12-17T03:24:00')
      // new Date(1995, 11, 17, 3, 24, 0) (months go from 0 to 11 )
      startTime: new Date(2019, 11, 20, 4, 0, 0),
      duration: 2,
      // normally the name needs to be grabbed via library id 
      // this ID is not valid and will not populate 
      library: LIB1ID,
      libraryName: "Queens Public Library at Forest Hills",
      category: "Book Drive",
      presenter: PRES1ID,
      attendees: {
        childrenAttendees: 5,
        teenAttendees: 21,
        adultAttendees: 12,
        seniorAttendees: 6
      }
    }]

    await Program.insertMany(programs)
    console.log("Seeded initial programs!")

  } catch (er) {
    console.log(er)
  }
}

const run = async () => {
  await libraries()
  await presenters()
  await programs()
  db.close()
}

run()