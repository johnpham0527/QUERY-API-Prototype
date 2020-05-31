const db = require("../db")
const Library = require("../models/libraries")
const Presenter = require("../models/presenters")
const Program = require("../models/programs")

db.on("error", console.error.bind(console, "MongoDB Connection Error:"))

const libraries = async () => {
  try {
    await Library.deleteMany()

    const libraries = [{
      name: "Queens Public Library at Forest Hills",
      address: "108-19 71st Ave, Forest Hills, NY 11375",
      programs: []
    }]

    await Library.insertMany(libraries)
    console.log("Seeded initial libraries!")

  } catch (er) {
    console.log(er)
  }
}

const run = async () => {
  await libraries()
  db.close()
}

run()