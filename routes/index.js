const { Router } = require("express")
const router = Router()
const controllers = require("../controllers")

// home
router.get("/", (req, res) => {
  const queryTest = req.query.test
  res.send("This is root!" + (queryTest ? ` Your query was ${queryTest}` : ''))
})

// get all libraries 
router.get("/libraries", (req, res) => controllers.getLibraries(req, res))

// get all programs based on library name 
// can do case insensitive and spaces replaced by dashes or underscores 
router.get("/libraries/:libraryName", (req, res) => controllers.getLibraryPrograms(req, res))

module.exports = router